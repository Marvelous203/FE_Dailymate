'use client'

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock,  } from "lucide-react"
import Link from "next/link"
import { getTestById } from "@/lib/api"

interface TestData {
  _id: string;
  title: string;
  description: string;
  questions: any[];
  duration?: number;
  difficulty?: string;
}

export default function TestPage({ params }: { 
  params: Promise<{ courseId: string; lessonId: string; testId: string }> 
}) {
  const resolvedParams = use(params);
  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const response = await getTestById(resolvedParams.testId);
        setTestData(response.data);
        if (response.data.duration) {
          setTimeLeft(response.data.duration * 60); // Convert minutes to seconds
        }
      } catch (error: any) {
        console.error('Error fetching test:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [resolvedParams.testId]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          // Auto submit when time runs out
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmitTest = () => {
    // Handle test submission logic here
    console.log('Test submitted with answers:', answers);
    // You can add API call to submit test results
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#83d98c] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Link href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại bài học
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">Không tìm thấy bài test</p>
            <Link href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại bài học
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại bài học
          </Button>
        </Link>
        
        {timeLeft !== null && (
          <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-orange-600 font-medium">
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* Test Content */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {testData.title}
            </h1>
            <p className="text-gray-600">{testData.description}</p>
          </div>

          {/* Test Interface */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Bài test có {testData.questions?.length || 0} câu hỏi
              </p>
              <Button 
                onClick={() => {
                  // Start test logic here
                  console.log('Starting test...');
                }}
                className="bg-[#83d98c] hover:bg-[#6bc975] text-white px-8 py-3"
              >
                Bắt đầu làm bài
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}