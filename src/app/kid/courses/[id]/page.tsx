import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Play, Star, CheckCircle, Lock } from "lucide-react"

export default function KidCourseDetailPage({ params }) {
  const courseId = params.id
  const course = courses.find((c) => c.id.toString() === courseId) || courses[0]

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/kid/courses" className="text-[#6b7280] hover:text-[#10b981] flex items-center">
          <ChevronLeft size={20} className="mr-1" />
          Back to Courses
        </Link>
      </div>

      {/* Course Header */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="h-48 bg-[#d9d9d9] relative">
          <Image
            src={`/placeholder.svg?height=192&width=768`}
            alt={course.title}
            width={768}
            height={192}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Button className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4">
              <Play className="h-8 w-8 text-white fill-white" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b] mr-1" />
              <span className="font-medium">{course.stars} stars earned</span>
            </div>
            <div className="flex items-center text-[#6b7280]">
              <span>{course.lessons} fun lessons</span>
            </div>
          </div>

          <div className="w-full bg-[#e5e7eb] h-3 rounded-full mb-2">
            <div className="bg-[#10b981] h-3 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-[#6b7280]">Your progress</span>
            <span className="font-medium">{course.progress}% complete</span>
          </div>

          <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-lg py-6">Continue Learning</Button>
        </div>
      </div>

      {/* Course Lessons */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Course Lessons</h2>

        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <Card
              key={index}
              className={`border-none ${
                lesson.completed ? "bg-[#ebfdf4]" : lesson.current ? "bg-[#f0e5fc]" : "bg-gray-50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lesson.completed
                          ? "bg-[#10b981] text-white"
                          : lesson.current
                            ? "bg-[#10b981] text-white"
                            : "bg-white text-[#6b7280] border"
                      }`}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : lesson.locked ? (
                        <Lock className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{lesson.title}</h3>
                      <div className="flex items-center text-sm">
                        {lesson.completed ? (
                          <span className="text-[#10b981]">Completed</span>
                        ) : lesson.current ? (
                          <span className="text-[#10b981]">In Progress</span>
                        ) : lesson.locked ? (
                          <span className="text-[#6b7280]">Locked</span>
                        ) : (
                          <span className="text-[#6b7280]">Not started</span>
                        )}

                        {lesson.stars > 0 && (
                          <div className="flex items-center ml-3">
                            <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                            <span>{lesson.stars} stars</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {!lesson.locked && (
                    <Button
                      className={
                        lesson.completed
                          ? "bg-white text-[#10b981] border border-[#10b981] hover:bg-[#ebfdf4]"
                          : "bg-[#10b981] hover:bg-[#059669]"
                      }
                    >
                      {lesson.completed ? "Play Again" : lesson.current ? "Continue" : "Start"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Rewards */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Course Rewards</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {rewards.map((reward, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  reward.unlocked ? "bg-[#ebfdf4] text-[#10b981]" : "bg-gray-100 text-gray-400"
                }`}
              >
                {reward.unlocked ? <Star className="h-8 w-8 fill-[#10b981]" /> : <Lock className="h-6 w-6" />}
              </div>
              <p className={`text-sm text-center ${reward.unlocked ? "font-medium" : "text-[#6b7280]"}`}>
                {reward.name}
              </p>
              {reward.unlocked && <p className="text-xs text-[#10b981]">{reward.stars} stars</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const courses = [
  {
    id: 1,
    title: "Mathematics for Kids",
    lessons: 12,
    stars: 45,
    progress: 65,
  },
  {
    id: 2,
    title: "English Vocabulary",
    lessons: 18,
    stars: 32,
    progress: 30,
  },
  {
    id: 3,
    title: "Science Experiments",
    lessons: 15,
    stars: 50,
    progress: 100,
  },
]

const lessons = [
  {
    title: "Introduction to Numbers",
    completed: true,
    current: false,
    locked: false,
    stars: 5,
  },
  {
    title: "Counting from 1 to 10",
    completed: true,
    current: false,
    locked: false,
    stars: 5,
  },
  {
    title: "Addition Basics",
    completed: true,
    current: false,
    locked: false,
    stars: 10,
  },
  {
    title: "Subtraction Basics",
    completed: false,
    current: true,
    locked: false,
    stars: 0,
  },
  {
    title: "Shapes and Patterns",
    completed: false,
    current: false,
    locked: true,
    stars: 0,
  },
  {
    title: "Multiplication Introduction",
    completed: false,
    current: false,
    locked: true,
    stars: 0,
  },
]

const rewards = [
  {
    name: "Number Master",
    unlocked: true,
    stars: 5,
  },
  {
    name: "Addition Hero",
    unlocked: true,
    stars: 10,
  },
  {
    name: "Subtraction Star",
    unlocked: false,
    stars: 0,
  },
  {
    name: "Math Wizard",
    unlocked: false,
    stars: 0,
  },
  {
    name: "Math Champion",
    unlocked: false,
    stars: 0,
  },
]

