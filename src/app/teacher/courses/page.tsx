import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, BookOpen, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TeacherCoursesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">My Courses</h1>
        <Button className="bg-[#702dff] hover:bg-[#5811f2]">
          <Plus className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search courses..." className="pl-10 bg-white border-none" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f0e5fc] rounded-full flex items-center justify-center">
                  <BookOpen className="text-[#702dff]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Total Courses</p>
                  <h3 className="text-2xl font-bold">12</h3>
                  <p className="text-xs text-[#10b981]">+2 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ebfdf4] rounded-full flex items-center justify-center">
                  <User className="text-[#10b981]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Total Students</p>
                  <h3 className="text-2xl font-bold">248</h3>
                  <p className="text-xs text-[#10b981]">+18 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#e0f2fe] rounded-full flex items-center justify-center">
                  <StarIcon className="text-[#0ea5e9]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Average Rating</p>
                  <h3 className="text-2xl font-bold">4.8</h3>
                  <p className="text-xs text-[#10b981]">+0.2 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }) {
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
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(course.status)}`}
        >
          {course.status}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#f0e5fc] px-2 py-1 rounded text-xs text-[#702dff] font-medium">{course.category}</div>
          <div className="text-[#6b7280] text-xs flex items-center">
            <StarIcon className="h-3 w-3 text-[#f59e0b] mr-1" />
            {course.rating}
          </div>
        </div>
        <Link href={`/teacher/courses/${course.id}`}>
          <h3 className="font-semibold mb-2 hover:text-[#702dff] transition-colors">{course.title}</h3>
        </Link>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-[#6b7280]">
            <Clock size={16} className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-[#6b7280]">
            <User size={16} className="mr-1" />
            <span>{course.students} students</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button size="sm" variant="outline" className="flex-1">
            Edit
          </Button>
          <Button size="sm" variant="outline" className="flex-1 ml-2">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusBadgeColor(status) {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800"
    case "Draft":
      return "bg-amber-100 text-amber-800"
    case "Archived":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function User(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function StarIcon(props) {
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
  )
}

const courses = [
  {
    id: 1,
    title: "Mathematics for Kids",
    category: "Mathematics",
    rating: 4.8,
    duration: "4 hours",
    lessons: 12,
    students: 124,
    status: "Published",
  },
  {
    id: 2,
    title: "English Vocabulary",
    category: "Language",
    rating: 4.5,
    duration: "6 hours",
    lessons: 18,
    students: 98,
    status: "Published",
  },
  {
    id: 3,
    title: "Science Experiments",
    category: "Science",
    rating: 4.9,
    duration: "5 hours",
    lessons: 15,
    students: 156,
    status: "Published",
  },
  {
    id: 4,
    title: "Art & Craft",
    category: "Art",
    rating: 4.7,
    duration: "3 hours",
    lessons: 10,
    students: 42,
    status: "Draft",
  },
  {
    id: 5,
    title: "Music Basics",
    category: "Music",
    rating: 4.6,
    duration: "4 hours",
    lessons: 12,
    students: 0,
    status: "Draft",
  },
  {
    id: 6,
    title: "Geography Adventures",
    category: "Geography",
    rating: 4.4,
    duration: "5 hours",
    lessons: 20,
    students: 85,
    status: "Archived",
  },
]

