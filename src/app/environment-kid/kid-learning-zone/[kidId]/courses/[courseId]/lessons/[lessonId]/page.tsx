'use client'

import { useState, use, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Play, BookOpen, Trophy, Star, Clock, Users, Target } from "lucide-react"
import Link from "next/link"
import { InteractiveVideo } from "@/components/interactive-video/InteractiveVideo"
import { getLessonById, getTestsByLesson } from "@/lib/api"

interface LessonData {
  _id: string;
  courseId: {
    _id: string;
    title: string;
    category: string;
    ageGroup: string;
  };
  title: string;
  description: string;
  content: {
    sections: {
      title: string;
      text: string;
    }[];
  };
  videoUrl: string;
  audioUrl: string;
  imageUrl: string;
  duration: number;
  order: number;
  isPublished: boolean;
}

interface TestData {
  _id: string;
  title: string;
  description: string;
  questions: any[];
  duration?: number;
  difficulty?: string;
}

export default function LessonPage({ params }: { params: Promise<{ kidId: string; courseId: string; lessonId: string }> }) {
  const resolvedParams = use(params);
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [videoCompleted, setVideoCompleted] = useState(false)
  const [interactiveCompleted, setInteractiveCompleted] = useState(false)
  const [lessonData, setLessonData] = useState<LessonData | null>(null)
  const [testsData, setTestsData] = useState<TestData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);

        // Fetch lesson data
        const lessonResult = await getLessonById(resolvedParams.lessonId);

        if (lessonResult.success && lessonResult.data) {
          setLessonData(lessonResult.data);
        } else {
          setError('Không thể tải dữ liệu bài học');
          return;
        }

        // Fetch tests for this lesson
        try {
          const testsResult = await getTestsByLesson(resolvedParams.lessonId);
          if (testsResult.success && testsResult.data) {
            const tests = Array.isArray(testsResult.data.tests)
              ? testsResult.data.tests
              : Array.isArray(testsResult.data)
                ? testsResult.data
                : [];
            setTestsData(tests);
          }
        } catch (testError) {
          console.warn('Không tìm thấy bài kiểm tra cho bài học này:', testError);
          setTestsData([]);
        }

      } catch (err) {
        console.error('Lỗi khi tải bài học:', err);
        setError('Lỗi khi tải bài học');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [resolvedParams.lessonId]);

  // Update progress based on completed activities
  useEffect(() => {
    let progress = 0;
    if (videoCompleted) progress += 40;
    if (interactiveCompleted) progress += 40;
    if (testsData.length > 0 && lessonCompleted) progress += 20;
    setCurrentProgress(progress);
  }, [videoCompleted, interactiveCompleted, lessonCompleted, testsData.length]);

  // Interactive video data
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
    console.log(`Điểm video: ${score}%`)
    setVideoCompleted(true)
  }

  const handleLessonComplete = (score: number) => {
    console.log(`Điểm bài học: ${score}%`)
    setInteractiveCompleted(true)
    setLessonCompleted(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded w-64 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="h-80 bg-gray-300 rounded-2xl animate-pulse"></div>
              <div className="h-48 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-300 rounded-2xl animate-pulse"></div>
              <div className="h-48 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
            <p className="text-red-500 mb-6">{error || 'Không tìm thấy bài học'}</p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Thử lại
              </Button>
              <Link href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}`}>
                <Button variant="outline" className="w-full border-2 border-gray-300 hover:border-blue-400 py-3 rounded-xl">
                  Quay lại khóa học
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <Link href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}`}>
            <Button
              variant="ghost"
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {lessonData.title}
              </h1>
              <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full">
                Bài {lessonData.order}
              </Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{lessonData.duration} phút</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{lessonData.courseId.ageGroup}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{lessonData.courseId.category}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Tiến độ học tập</span>
                <span className="text-sm font-bold text-blue-600">{currentProgress}%</span>
              </div>
              <Progress value={currentProgress} className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${currentProgress}%` }}
                />
              </Progress>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Video Section */}
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative">
                  <InteractiveVideo
                    videoSrc={lessonData.videoUrl?.trim().replace(/`/g, '') || "https://www.youtube.com/watch?v=LIN8GpWQ5rM"}
                    interactions={videoInteractions}
                    onComplete={handleVideoComplete}
                  />
                  {videoCompleted && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Hoàn thành
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Nội dung bài học</h3>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{lessonData.description}</p>

                  {lessonData.content?.sections && (
                    <div className="space-y-6">
                      {lessonData.content.sections.map((section, index) => (
                        <div key={index} className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                          <div className="pl-8">
                            <h4 className="text-xl font-bold text-gray-800 mb-3">{section.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{section.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tests Section */}
            {testsData.length > 0 && (
              <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Bài kiểm tra</h3>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {testsData.length} bài test
                    </Badge>
                  </div>

                  <div className="grid gap-4">
                    {testsData.map((test, index) => (
                      <div key={test._id} className="group">
                        <div className="flex items-center justify-between p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-blue-50">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                                {test.title}
                              </h4>
                              <p className="text-gray-600 text-sm mb-1">{test.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>ID: {test._id}</span>
                                {test.duration && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {test.duration} phút
                                  </span>
                                )}
                                {test.difficulty && (
                                  <Badge variant="outline" className="text-xs">
                                    {test.difficulty}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <Link href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}/tests/${test._id}`}>
                            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                              <Play className="w-4 h-4 mr-2" />
                              Làm bài test
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6">
              <Button
                variant="outline"
                className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Bài trước
              </Button>
              <Button
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${currentProgress >= 80
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                disabled={currentProgress < 80}
              >
                Bài tiếp theo
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Thông tin bài học</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mã bài học:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {lessonData._id.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Khóa học:</span>
                    <span className="font-medium text-blue-600">{lessonData.courseId.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Danh mục:</span>
                    <Badge variant="outline">{lessonData.courseId.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Độ tuổi:</span>
                    <Badge variant="outline">{lessonData.courseId.ageGroup}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Thứ tự:</span>
                    <span className="font-bold text-purple-600">#{lessonData.order}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Checklist */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Tiến độ học tập</h3>
                <div className="space-y-4">
                  {[
                    { title: "Xem video bài học", completed: videoCompleted, icon: Play },
                    { title: "Hoàn thành hoạt động", completed: interactiveCompleted, icon: BookOpen },
                    { title: "Làm bài kiểm tra", completed: testsData.length > 0 && lessonCompleted, icon: Trophy },
                  ].map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${step.completed
                          ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                          }`}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <IconComponent className="w-4 h-4" />
                          )}
                        </div>
                        <span className={`font-medium transition-colors ${step.completed ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card className="border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-8 h-8" />
                  <h3 className="font-bold text-lg">Phần thưởng</h3>
                </div>
                <p className="mb-4 opacity-90">Hoàn thành bài học để nhận:</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-lg">5 Sao vàng</span>
                </div>
                <div className="mt-4 text-sm opacity-75">
                  Tiến độ: {currentProgress}/100%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}