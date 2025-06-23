"use client";

import { useState, useEffect, use, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTestById } from "@/lib/api";

interface Question {
  questionText: string;
  questionType: "multiple-choice" | "true-false";
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

interface TestData {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  attempts: number;
  totalPoints: number;
}

export default function TestPage({
  params,
}: {
  params: Promise<{
    kidId: string;
    courseId: string;
    lessonId: string;
    testId: string;
  }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [testPassed, setTestPassed] = useState(false);
  const [passingScore, setPassingScore] = useState(70); // Default passing score

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const response = await getTestById(resolvedParams.testId);
        setTestData(response.data);

        // Set timer from API data
        if (response.data.timeLimit) {
          setTimeLeft(response.data.timeLimit * 60);
        }

        // Set passing score from API data
        if (response.data.passingScore) {
          setPassingScore(response.data.passingScore);
        }

        // Tính tổng điểm có thể đạt được
        const total =
          response.data.totalPoints ||
          response.data.questions.reduce(
            (sum: number, q: Question) => sum + q.points,
            0
          );
        setTotalPoints(total);
      } catch (error) {
        console.error("Error fetching test:", error);
        setError("Không thể tải bài test");
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
      setTimeLeft((prev) => {
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

  // Function to save test completion and redirect
  const saveTestCompletion = useCallback(
    (passed: boolean, finalScore: number) => {
      if (passed) {
        // Save to session storage for lesson page to pick up
        sessionStorage.setItem(
          "lastCompletedTest",
          JSON.stringify({
            testId: resolvedParams.testId,
            lessonId: resolvedParams.lessonId,
            timestamp: new Date().toISOString(),
            score: finalScore,
            totalPoints: totalPoints,
            passed: true,
          })
        );

        // Don't redirect automatically, let user click back button
        console.log(
          "Test completed and saved to sessionStorage, user can now navigate back"
        );
      }
    },
    [resolvedParams, router, totalPoints]
  );

  // Fix useCallback with proper dependencies
  const handleSubmitTest = useCallback(() => {
    if (!testData) return;

    let totalScore = 0;
    testData.questions.forEach((question, index) => {
      const selectedOption = question.options[answers[index]];
      if (selectedOption === question.correctAnswer) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);

    // Check if test is passed
    const scorePercentage =
      totalPoints > 0 ? (totalScore / totalPoints) * 100 : 0;
    const passed = scorePercentage >= passingScore;
    setTestPassed(passed);

    setShowResults(true);

    // Save completion if passed
    saveTestCompletion(passed, totalScore);
  }, [testData, answers, totalPoints, passingScore, saveTestCompletion]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ... phần còn lại của component không thay đổi

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
            <Link
              href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}`}
            >
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
            <Link
              href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}`}
            >
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
        <Link
          href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${resolvedParams.lessonId}`}
        >
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại bài học
          </Button>
        </Link>

        {timeLeft !== null && !showResults && (
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
              {testData?.title}
            </h1>
            <p className="text-gray-600">{testData?.description}</p>
          </div>

          {/* Test Interface */}
          <div className="space-y-6">
            {showResults ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Kết quả bài test</h2>

                  {/* Pass/Fail Status */}
                  <div
                    className={`text-lg font-semibold mb-4 px-4 py-2 rounded-full inline-block ${
                      testPassed
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    {testPassed
                      ? "🎉 Chúc mừng! Bạn đã đạt"
                      : "😔 Chưa đạt yêu cầu"}
                  </div>

                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {score}/{totalPoints} điểm
                  </div>
                  <p className="text-gray-600 mb-2">
                    {score && totalPoints
                      ? `Tỷ lệ đúng: ${Math.round(
                          (score / totalPoints) * 100
                        )}%`
                      : ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    Cần đạt {passingScore}% để hoàn thành bài học
                  </p>

                  {testPassed && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 font-medium">
                        ✅ Bài test đã được lưu vào tiến độ học tập của bạn!
                      </p>
                      <p className="text-green-600 text-sm mt-1">
                        Đang chuyển hướng về bài học sau 3 giây...
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {testData?.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">
                        Câu {index + 1}: {question.questionText}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded ${
                              option === question.correctAnswer
                                ? "bg-green-100 border-green-500"
                                : answers[index] === optIndex
                                ? "bg-red-100 border-red-500"
                                : "bg-gray-50"
                            } border`}
                          >
                            {option}
                            {option === question.correctAnswer && (
                              <span className="ml-2 text-green-600">
                                ✓ Đáp án đúng
                              </span>
                            )}
                            {answers[index] === optIndex &&
                              option !== question.correctAnswer && (
                                <span className="ml-2 text-red-600">
                                  ✗ Đáp án của bạn
                                </span>
                              )}
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Giải thích:</span>{" "}
                        {question.explanation}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <Link
                    href={`/environment-kid/kid-learning-zone/${
                      resolvedParams.kidId
                    }/courses/${resolvedParams.courseId}/lessons/${
                      resolvedParams.lessonId
                    }${
                      testPassed
                        ? `?completedTest=${resolvedParams.testId}`
                        : ""
                    }`}
                  >
                    <Button
                      className={
                        testPassed
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }
                    >
                      {testPassed
                        ? "🎉 Về bài học (Đã hoàn thành)"
                        : "📚 Quay lại bài học"}
                    </Button>
                  </Link>

                  {!testPassed && (
                    <Button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setAnswers([]);
                        setShowResults(false);
                        setScore(null);
                        setTestPassed(false);
                        if (testData?.timeLimit) {
                          setTimeLeft(testData.timeLimit * 60);
                        }
                      }}
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      🔄 Làm lại bài test
                    </Button>
                  )}
                </div>
              </div>
            ) : currentQuestion < (testData?.questions?.length || 0) ? (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">
                    Câu {currentQuestion + 1}:{" "}
                    {testData?.questions[currentQuestion].questionText}
                  </h3>
                  <div className="space-y-3">
                    {testData?.questions[currentQuestion].options.map(
                      (option: string, index: number) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            answers[currentQuestion] === index
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => {
                            const newAnswers = [...answers];
                            newAnswers[currentQuestion] = index;
                            setAnswers(newAnswers);
                          }}
                        >
                          {option}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentQuestion((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentQuestion === 0}
                  >
                    Câu trước
                  </Button>
                  <Button
                    onClick={() => {
                      if (
                        currentQuestion ===
                        (testData?.questions?.length || 0) - 1
                      ) {
                        handleSubmitTest();
                      } else {
                        setCurrentQuestion((prev) => prev + 1);
                      }
                    }}
                    className="bg-[#83d98c] hover:bg-[#6bc975] text-white"
                  >
                    {currentQuestion === (testData?.questions?.length || 0) - 1
                      ? "Nộp bài"
                      : "Câu tiếp"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Bài test có {testData?.questions?.length || 0} câu hỏi
                </p>
                <Button
                  onClick={() => setCurrentQuestion(0)}
                  className="bg-[#83d98c] hover:bg-[#6bc975] text-white px-8 py-3"
                >
                  Bắt đầu làm bài
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
