import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" className="p-2">
          <Link href={`/environment-kid/kid-learning-zone/courses/${params.courseId}`}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Lesson 3: Finding Solutions</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <div className="h-[400px] bg-[#d9d9d9]">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Lesson content"
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Interactive Content</h2>
              <p className="text-[#4b5563]">
                Learn how to find creative solutions to problems through this interactive lesson.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline">Previous Lesson</Button>
            <Button className="bg-[#83d98c] hover:bg-[#6bc275]">Next Lesson</Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Lesson Progress</h3>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className={`h-5 w-5 ${step.completed ? 'text-[#83d98c]' : 'text-[#e5e7eb]'}`} />
                    <span className={step.completed ? 'text-[#1e1e1e]' : 'text-[#6b7280]'}>{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-[#83d98c] text-white">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Rewards</h3>
              <p>Complete this lesson to earn:</p>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Star"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>5 Stars</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const steps = [
  { title: "Watch Introduction", completed: true },
  { title: "Complete Activity 1", completed: true },
  { title: "Complete Activity 2", completed: false },
  { title: "Take Quiz", completed: false },
]