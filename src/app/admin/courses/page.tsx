import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, BookOpen, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">
          Courses Management
        </h1>
        <Button className="bg-[#ef4444] hover:bg-[#dc2626]">
          <Plus className="mr-2 h-4 w-4" /> Create Course
        </Button>
      </div>

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
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        {/* Other tabs would have similar content but filtered by status */}
        <TabsContent value="published" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.status === "Published")
              .map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Course Statistics */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Course Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Courses"
            value="124"
            change="+5 this month"
            icon={<BookOpen className="h-5 w-5 text-[#ef4444]" />}
            bgColor="bg-red-50"
          />
          <StatCard
            title="Active Students"
            value="2,845"
            change="+12% from last month"
            icon={<Star className="h-5 w-5 text-[#f59e0b]" />}
            bgColor="bg-amber-50"
          />
          <StatCard
            title="Average Rating"
            value="4.8/5"
            change="+0.2 from last month"
            icon={<Star className="h-5 w-5 text-[#10b981]" />}
            bgColor="bg-green-50"
          />
          <StatCard
            title="Total Hours"
            value="1,240"
            change="+85 this month"
            icon={<Clock className="h-5 w-5 text-[#8b5cf6]" />}
            bgColor="bg-purple-50"
          />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: any }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <div className="h-40 bg-[#d9d9d9] relative">
        <Image
          src={`/placeholder.svg?height=160&width=320`}
          alt={course.title}
          width={320}
          height={160}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(
            course.status
          )}`}
        >
          {course.status}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#f0e5fc] px-2 py-1 rounded text-xs text-[#8b5cf6] font-medium">
            {course.category}
          </div>
          <div className="text-[#6b7280] text-xs flex items-center">
            <Star className="h-3 w-3 text-[#f59e0b] mr-1" />
            {course.rating}
          </div>
        </div>
        <Link href={`/admin/courses/${course.id}`}>
          <h3 className="font-semibold mb-2 hover:text-[#ef4444] transition-colors">
            {course.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-[#6b7280]">
            <Clock size={16} className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-[#6b7280]">
            <BookOpen size={16} className="mr-1" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  bgColor,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#6b7280]">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-[#10b981] mt-1">{change}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-amber-100 text-amber-800";
    case "Archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const courses = [
  {
    id: 1,
    title: "Mathematics for Kids",
    category: "Mathematics",
    rating: 4.8,
    duration: "4 hours",
    lessons: 12,
    status: "Published",
  },
  {
    id: 2,
    title: "English Vocabulary",
    category: "Language",
    rating: 4.5,
    duration: "6 hours",
    lessons: 18,
    status: "Published",
  },
  {
    id: 3,
    title: "Science Experiments",
    category: "Science",
    rating: 4.9,
    duration: "5 hours",
    lessons: 15,
    status: "Published",
  },
  {
    id: 4,
    title: "Art & Craft",
    category: "Art",
    rating: 4.7,
    duration: "3 hours",
    lessons: 10,
    status: "Draft",
  },
  {
    id: 5,
    title: "Music Basics",
    category: "Music",
    rating: 4.6,
    duration: "4 hours",
    lessons: 12,
    status: "Draft",
  },
  {
    id: 6,
    title: "Geography Adventures",
    category: "Geography",
    rating: 4.4,
    duration: "5 hours",
    lessons: 20,
    status: "Archived",
  },
];
