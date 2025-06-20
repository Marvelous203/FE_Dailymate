'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star } from "lucide-react"

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

interface InteractiveLessonProps {
  title: string
  content: string
  questions: Question[]
  onComplete: (score: number) => void
}

export function InteractiveLesson({ title, content, questions, onComplete }: InteractiveLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | boolean | null>(null)

  const handleAnswer = (answer: string | number | boolean) => {
    setSelectedAnswer(answer)
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Tính điểm và hiển thị kết quả
      const score = calculateScore()
      setShowResults(true)
      onComplete(score)
    }
  }

  const calculateScore = () => {
    const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length
    return Math.round((correct / questions.length) * 100)
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <Card className="border-none shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Hoàn thành bài học!</h2>
            <p className="text-xl">Điểm số của bạn: {score}%</p>
          </div>
          
          <div className="space-y-4">
            {questions.map((q, index) => {
              const isCorrect = answers[q.id] === q.correctAnswer
              return (
                <div key={q.id} className="text-left p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className={`h-5 w-5 ${isCorrect ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-medium">Câu {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600">{q.explanation}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Nội dung bài học */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600">{content}</p>
        </CardContent>
      </Card>

      {/* Câu hỏi tương tác */}
      <Card className="border-none shadow-xl">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Câu {currentQuestion + 1} / {questions.length}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#83d98c] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-6">{question.question}</h3>
          </div>

          {question.type === 'multiple-choice' && (
            <div className="space-y-3 mb-6">
              {question.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left justify-start p-4 h-auto"
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="flex gap-4 mb-6">
              <Button
                variant={selectedAnswer === true ? "default" : "outline"}
                onClick={() => handleAnswer(true)}
                className="flex-1 p-4"
              >
                Đúng
              </Button>
              <Button
                variant={selectedAnswer === false ? "default" : "outline"}
                onClick={() => handleAnswer(false)}
                className="flex-1 p-4"
              >
                Sai
              </Button>
            </div>
          )}

          <Button 
            onClick={nextQuestion}
            disabled={selectedAnswer === null}
            className="w-full bg-[#83d98c] hover:bg-[#6bc275]"
          >
            {currentQuestion < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}