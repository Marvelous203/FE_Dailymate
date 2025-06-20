"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'drag-drop' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export function QuizComponent({ 
  questions, 
  onComplete 
}: { 
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore);
  };

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup 
            value={answers[question.id]} 
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'true-false':
        return (
          <RadioGroup 
            value={answers[question.id]} 
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${question.id}-true`} />
              <Label htmlFor={`${question.id}-true`}>Đúng</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${question.id}-false`} />
              <Label htmlFor={`${question.id}-false`}>Sai</Label>
            </div>
          </RadioGroup>
        );
      
      case 'fill-blank':
        return (
          <Input 
            placeholder="Nhập câu trả lời..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="max-w-md"
          />
        );
      
      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <Card className="border-none shadow-xl">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Kết quả Quiz</h3>
          <div className={`text-4xl font-bold mb-4 ${
            score >= 80 ? 'text-green-500' : 'text-red-500'
          }`}>
            {score}%
          </div>
          <p className="text-lg mb-6">
            {score >= 80 
              ? "Xuất sắc! Bạn đã vượt qua bài kiểm tra!" 
              : "Hãy ôn lại bài học và thử lại nhé!"
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Câu hỏi {currentQuestion + 1} / {questions.length}
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-[#83d98c] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-6">
          {questions[currentQuestion].question}
        </h3>

        <div className="mb-8">
          {renderQuestion(questions[currentQuestion])}
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Câu trước
          </Button>
          
          {currentQuestion < questions.length - 1 ? (
            <Button 
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!answers[questions[currentQuestion].id]}
              className="bg-gradient-to-r from-[#83d98c] to-[#6bc275]"
            >
              Câu tiếp
            </Button>
          ) : (
            <Button 
              onClick={calculateScore}
              disabled={Object.keys(answers).length < questions.length}
              className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e]"
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}