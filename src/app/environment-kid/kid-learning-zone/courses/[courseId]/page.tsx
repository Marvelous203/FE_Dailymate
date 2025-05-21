import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="h-40 w-40 bg-[#d9d9d9] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Course thumbnail"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">Problem Solving for Kids</h1>
            <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-4">
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                <span>12 Lessons</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>6 Hours</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                <span>45 Stars Available</span>
              </div>
            </div>
            <p className="text-[#4b5563] mb-4">
              Learn essential problem-solving skills through fun and interactive lessons.
            </p>
            <div className="w-full bg-[#e5e7eb] h-2 rounded-full mb-2">
              <div className="bg-[#83d98c] h-2 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6b7280]">Overall Progress</span>
              <span className="font-medium">65%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Course Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${lesson.completed ? 'bg-[#83d98c]' : 'bg-[#e5e7eb]'} flex items-center justify-center`}>
                      <span className={`text-lg font-bold ${lesson.completed ? 'text-white' : 'text-[#6b7280]'}`}>{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-[#6b7280]">{lesson.duration} minutes</p>
                    </div>
                  </div>
                  <Button className={`${lesson.completed ? 'bg-[#83d98c]' : 'bg-[#e5e7eb] text-[#6b7280]'}`}>
                    <Link href={`/environment-kid/kid-learning-zone/courses/${params.courseId}/lessons/${lesson.id}`}>
                      {lesson.completed ? 'Review' : 'Start'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const lessons = [
  { id: 1, title: "Introduction to Problem Solving", duration: 15, completed: true },
  { id: 2, title: "Understanding Problems", duration: 20, completed: true },
  { id: 3, title: "Finding Solutions", duration: 25, completed: false },
  { id: 4, title: "Testing Solutions", duration: 20, completed: false },
]