'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getAllCourses } from "@/lib/api"
import { useParams } from "next/navigation"

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  ageGroup: string;
  thumbnailUrl: string;
  pointsEarned: number;
  isPremium: boolean;
  instructor: {
    _id: string;
    fullName: string;
    specializations: string[];
  } | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Thêm function helper để rút gọn text
const truncateText = (text: string, maxLines: number = 3): string => {
  if (!text) return '';
  
  // Ước tính số ký tự cho mỗi dòng (khoảng 50-60 ký tự/dòng)
  const maxCharsPerLine = 55;
  const maxChars = maxLines * maxCharsPerLine;
  
  if (text.length <= maxChars) {
    return text;
  }
  
  // Cắt text và thêm "..."
  const truncated = text.substring(0, maxChars - 3).trim();
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // Cắt tại từ cuối cùng để tránh cắt giữa từ
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
};

export default function CoursesPage() {
  const params = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const kidId = params.kidId;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllCourses(1, 20);

        // Handle the specific API response structure
        if (response && response.success && response.data && Array.isArray(response.data.courses)) {
          // Filter only published courses for kids
          const publishedCourses = response.data.courses.filter((course: Course) => course.isPublished);
          setCourses(publishedCourses);
        } else {
          console.warn('Unexpected API response structure:', response);
          setCourses([]);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải khóa học');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">All Courses</h1>
            <p className="text-[#6b7280]">Explore our learning materials</p>
          </div>
          <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
            <Link href={`/environment-kid/kid-learning-zone/${kidId}/`}>Back to Dashboard</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="border-none shadow-sm overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">All Courses</h1>
            <p className="text-[#6b7280]">Explore our learning materials</p>
          </div>
          <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
            <Link href={`/environment-kid/kid-learning-zone/${kidId}/`}>Back to Dashboard</Link>
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#83d98c] hover:bg-[#6bc275]">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">All Courses</h1>
          <p className="text-[#6b7280]">Explore our learning materials</p>
        </div>
        <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
          <Link href="/environment-kid/kid-learning-zone">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
        {courses.length > 0 ? (
          courses.map((course) => {
            const isNew = new Date(course.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

            return (
              <Card key={course._id} className="border-none shadow-sm overflow-hidden h-full">
                <div className="h-48 bg-[#d9d9d9] relative">
                  <Image
                    src={course.thumbnailUrl?.trim().replace(/`/g, '') || `/placeholder.svg?height=192&width=384`}
                    alt={course.title}
                    width={384}
                    height={192}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/placeholder.svg?height=192&width=384`;
                    }}
                  />
                  {isNew && (
                    <div className="absolute top-2 right-2 bg-[#83d98c] text-white px-2 py-1 rounded-full text-sm">
                      New
                    </div>
                  )}
                  {course.isPremium && (
                    <div className="absolute top-2 left-2 bg-[#f59e0b] text-white px-2 py-1 rounded-full text-sm">
                      Premium
                    </div>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  
                  {/* FIX: Rút gọn mô tả và cố định chiều cao */}
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-sm mb-2 leading-relaxed line-clamp-3">
                      {truncateText(course.description, 3)}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-[#83d98c] text-xs mb-4 font-medium">{course.category} • {course.ageGroup}</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center text-[#6b7280]">
                        <BookOpen size={16} className="mr-1" />
                        <span>Lessons</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                        <span>{course.pointsEarned} points</span>
                      </div>
                    </div>
                    {course.instructor && (
                      <p className="text-xs text-[#6b7280] mb-4">Instructor: {course.instructor.fullName}</p>
                    )}
                    <Button className="w-full bg-[#83d98c] hover:bg-[#6bc275]">
                      <Link href={`/environment-kid/kid-learning-zone/${kidId}/courses/${course._id}`}>
                        Start Learning
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-[#6b7280]">Không có khóa học nào được tìm thấy.</p>
          </div>
        )}
      </div>
    </div>
  );
}