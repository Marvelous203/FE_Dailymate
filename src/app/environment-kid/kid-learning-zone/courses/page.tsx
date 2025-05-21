import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Star } from "lucide-react"

export default function CoursesPage() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {availableCourses.map((course, index) => (
          <Card key={index} className="border-none shadow-sm overflow-hidden">
            <div className="h-48 bg-[#d9d9d9] relative">
              <Image
                src={`/placeholder.svg?height=192&width=384`}
                alt={course.title}
                width={384}
                height={192}
                className="w-full h-full object-cover"
              />
              {course.isNew && (
                <div className="absolute top-2 right-2 bg-[#83d98c] text-white px-2 py-1 rounded-full text-sm">
                  New
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-[#6b7280] text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center text-[#6b7280]">
                  <BookOpen size={16} className="mr-1" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                  <span>{course.stars} stars available</span>
                </div>
              </div>
              <Button className="w-full bg-[#83d98c] hover:bg-[#6bc275]">
                <Link href={`/environment-kid/kid-learning-zone/courses/${course.id}`}>Start Learning</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const availableCourses = [
  {
    id: 1,
    title: "Problem Solving for Kids",
    description: "Learn essential problem-solving skills through fun activities.",
    lessons: 12,
    stars: 45,
    isNew: false,
  },
  {
    id: 2,
    title: "Emotional Intelligence",
    description: "Understand and manage emotions better.",
    lessons: 18,
    stars: 32,
    isNew: true,
  },
  {
    id: 3,
    title: "Communication Skills",
    description: "Develop effective communication abilities.",
    lessons: 15,
    stars: 50,
    isNew: false,
  },
  {
    id: 4,
    title: "Creative Thinking",
    description: "Boost creativity through engaging exercises.",
    lessons: 14,
    stars: 40,
    isNew: true,
  },
  {
    id: 5,
    title: "Time Management",
    description: "Learn to manage time effectively.",
    lessons: 10,
    stars: 35,
    isNew: false,
  },
  {
    id: 6,
    title: "Team Collaboration",
    description: "Practice working together with others.",
    lessons: 16,
    stars: 45,
    isNew: false,
  },
]