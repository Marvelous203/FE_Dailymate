'use client'

import { useState,use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { InteractiveVideo } from "@/components/interactive-video/InteractiveVideo"
import { InteractiveLesson } from "@/components/interactive-lesson/InteractiveLesson"

export default function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const resolvedParams = use(params);
  const [lessonCompleted, setLessonCompleted] = useState(false)
  
  // Dữ liệu video tương tác
  const videoInteractions = [
    {
      timestamp: 30,
      type: 'question' as const,
      content: {
        question: "Khi gặp vấn đề khó khăn, điều đầu tiên bạn nên làm là gì?",
        options: [
          "Bỏ cuộc ngay lập tức",
          "Tìm hiểu và phân tích vấn đề",
          "Hỏi người khác làm giúp",
          "Làm ngẫu nhiên"
        ],
        correctAnswer: 1,
        feedback: "Đúng rồi! Phân tích vấn đề là bước đầu tiên quan trọng để tìm ra giải pháp hiệu quả."
      }
    },
    {
      timestamp: 90,
      type: 'question' as const,
      content: {
        question: "Brainstorming là gì?",
        options: [
          "Một loại trò chơi",
          "Phương pháp tạo ra nhiều ý tưởng",
          "Một bài tập thể dục",
          "Cách học thuộc lòng"
        ],
        correctAnswer: 1,
        feedback: "Chính xác! Brainstorming giúp chúng ta tạo ra nhiều ý tưởng sáng tạo để giải quyết vấn đề."
      }
    }
  ]

  const handleVideoComplete = (score: number) => {
    console.log(`Điểm số: ${score}%`)
    setLessonCompleted(true)
    // Cập nhật tiến độ học tập
  }
  
  // Add this function to handle lesson completion
  const handleLessonComplete = (score: number) => {
    console.log(`Điểm bài học: ${score}%`)
    setLessonCompleted(true)
    // Cập nhật tiến độ học tập
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" className="p-2">
          <Link href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}`}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Bài 3: Tìm Kiếm Giải Pháp</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Thay thế phần video placeholder bằng InteractiveVideo */}
          <InteractiveVideo
            // videoSrc="/videos/problem-solving-lesson.mp4"
              videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            interactions={videoInteractions}
            onComplete={handleVideoComplete}
          />
          
          {/* Add the InteractiveLesson component here */}
          <InteractiveLesson
            title="Kỹ năng giải quyết vấn đề"
            content="Học cách tiếp cận và giải quyết các vấn đề trong cuộc sống hàng ngày."
            questions={lessonQuestions}
            onComplete={handleLessonComplete}
          />

          <div className="flex justify-between">
            <Button variant="outline">Bài Trước</Button>
            <Button 
              className="bg-[#83d98c] hover:bg-[#6bc275]"
              disabled={!lessonCompleted}
            >
              Bài Tiếp Theo
            </Button>
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
                {/* <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Star"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                /> */}
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

const lessonQuestions = [
  {
    id: "q1",
    type: "multiple-choice" as const,
    question: "Khi gặp vấn đề, bước đầu tiên nên làm gì?",
    options: [
      "Hoảng sợ và bỏ cuộc",
      "Bình tĩnh và phân tích vấn đề",
      "Hỏi ngay người khác",
      "Làm ngẫu nhiên"
    ],
    correctAnswer: 1,
    explanation: "Bình tĩnh và phân tích vấn đề giúp chúng ta hiểu rõ tình huống và tìm ra giải pháp phù hợp."
  }
]

// Remove the InteractiveLesson component from here