'use client'
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { getAllCourses } from '@/lib/api';

// Cập nhật interface Course để khớp với dữ liệu thực tế
interface Course {
  _id: string;
  title: string;
  category: string;
  rating?: number;
  duration?: string;
  progress?: number;
  saved?: boolean;
  thumbnailUrl?: string;
  isPublished?: boolean;
  pointsEarned?: number;
  description?: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchCourses = async (pageNum = 1) => {
    try {
      setLoading(true);
      const data = await getAllCourses(pageNum, 9);
      if (data.success) {
        setCourses(pageNum === 1 ? data.data.courses : [...courses, ...data.data.courses]);
        setHasNextPage(data.data.pagination?.hasNextPage || false);
        setPage(pageNum);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải khoá học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(1);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <Sidebar activePage="courses" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Courses</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell size={20} />
            </Button>
            <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search courses..."
              className="pl-10 bg-white border-none"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white"
          >
            <Filter size={18} />
            Filter
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {loading ? (
              <div>Đang tải khoá học...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
                {hasNextPage && (
                  <div className="flex justify-center mt-6">
                    <Button onClick={() => fetchCourses(page + 1)} disabled={loading}>
                      {loading ? 'Đang tải...' : 'Load More'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="ongoing" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.progress && c.progress > 0 && c.progress < 100)
                .map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.progress === 100)
                .map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.saved)
                .map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="bg-white border-none shadow-sm overflow-hidden">
      <div className="h-40 bg-[#d9d9d9] relative">
        <Image
          src={course.thumbnailUrl || `/placeholder.svg?height=160&width=320`}
          alt={course.title}
          width={320}
          height={160}
          className="w-full h-full object-cover"
        />
        {course.saved && (
          <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
            <BookmarkIcon className="h-4 w-4 text-[#10b981]" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#ebfdf4] px-2 py-1 rounded text-xs text-[#10b981] font-medium">
            {course.category}
          </div>
          <div className="text-[#6b7280] text-xs flex items-center">
            <Star className="h-3 w-3 text-[#f59e0b] mr-1" />
            {course.rating ?? course.pointsEarned ?? 0}
          </div>
        </div>
        <Link href={`/courses/${course._id}`}>
          <h3 className="font-semibold mb-2 hover:text-[#10b981] transition-colors">
            {course.title}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-[#6b7280] mb-3">
          <Clock size={16} className="mr-1" />
          <span>{course.duration || ''}</span>
        </div>
        <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
          <div
            className="bg-[#10b981] h-2 rounded-full"
            style={{ width: `${course.progress ?? 0}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-[#6b7280]">Progress</span>
          <span className="font-medium">{course.progress ?? 0}%</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Sửa component Bell để hỗ trợ prop size
function Bell(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 24, ...svgProps } = props;
  return (
    <svg
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
