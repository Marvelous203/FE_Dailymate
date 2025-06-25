"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Star,
  ArrowLeft,
  CheckCircle,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import {
  getCourseById,
  getLessonsByCourse,
  checkAndAwardCourseCompletion,
  updateCourseProgress,
} from "@/lib/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
}

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  duration?: number;
  order?: number;
}

interface Test {
  _id: string;
  title: string;
  lessonId?: string;
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string; kidId: string }>;
}) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, any>>({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<{
    points: number;
    courseName: string;
  } | null>(null);

  // Load lesson progress from localStorage
  const loadLessonProgress = async (lessonsData: Lesson[]) => {
    const progressData: Record<string, any> = {};
    let completedLessons = 0;

    lessonsData.forEach((lesson) => {
      const storageKey = `lesson_progress_${resolvedParams.kidId}_${lesson._id}`;
      const savedProgress = localStorage.getItem(storageKey);

      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          progressData[lesson._id] = progress;

          // Check if lesson is completed
          // A lesson is completed if currentProgress reaches 100%
          if (progress.currentProgress >= 100) {
            completedLessons++;
          }
        } catch (error) {
          console.error(
            "Error parsing progress for lesson:",
            lesson._id,
            error
          );
        }
      }
    });

    setLessonProgress(progressData);

    // Calculate overall progress percentage
    const progressPercentage =
      lessonsData.length > 0
        ? Math.round((completedLessons / lessonsData.length) * 100)
        : 0;
    setOverallProgress(progressPercentage);

    // Check if course is completed and award points
    if (progressPercentage === 100 && !courseCompleted) {
      setCourseCompleted(true);

      // Update overall progress in localStorage for API sync using utility function
      const { kidLocalStorage } = await import("@/utils/kidProgress");
      kidLocalStorage.setCourseOverallProgress(
        resolvedParams.kidId,
        resolvedParams.courseId,
        100
      );

      try {
        // First, update API progress status to completed
        await updateCourseProgress(
          resolvedParams.kidId,
          resolvedParams.courseId,
          {
            status: true, // Mark course as completed
            lessonCompleted: lessonsData.map((lesson) => ({
              lessonId: lesson._id,
            })),
          }
        );

        // Then check and award points
        const awardResult = await checkAndAwardCourseCompletion(
          resolvedParams.kidId,
          resolvedParams.courseId
        );

        if (awardResult && awardResult.success) {
          setPointsAwarded({
            points: awardResult.pointsAwarded,
            courseName: awardResult.courseName,
          });

          // Show congratulations message
          console.log(
            `🎉 Congratulations! Course completed and ${awardResult.pointsAwarded} points awarded!`
          );
        }
      } catch (error) {
        console.error("Error awarding course completion points:", error);
      }
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          "🔄 Starting to fetch course data for:",
          resolvedParams.courseId
        );

        // Fetch course first (mandatory)
        let courseResponse;
        try {
          courseResponse = await getCourseById(resolvedParams.courseId);
          console.log("✅ Course data fetched successfully");
        } catch (courseError) {
          console.error("❌ Failed to fetch course:", courseError);
          if (
            courseError instanceof Error &&
            courseError.message.includes("ECONNRESET")
          ) {
            setError(
              "Kết nối bị gián đoạn khi tải khóa học. Vui lòng thử lại."
            );
          } else {
            setError("Không thể tải thông tin khóa học. Vui lòng thử lại.");
          }
          return;
        }

        setCourse(
          courseResponse.course || courseResponse.data || courseResponse
        );

        // Fetch lessons (optional - can continue without lessons)
        let lessonsData = [];
        try {
          const lessonsResponse = await getLessonsByCourse(
            resolvedParams.courseId
          );
          console.log("✅ Lessons data fetched successfully");

          lessonsData = Array.isArray(lessonsResponse)
            ? lessonsResponse
            : lessonsResponse?.lessons || lessonsResponse?.data?.lessons || [];
        } catch (lessonsError) {
          console.warn(
            "⚠️ Failed to fetch lessons, continuing without them:",
            lessonsError
          );
          // Show a non-blocking warning but continue
          if (
            lessonsError instanceof Error &&
            lessonsError.message.includes("ECONNRESET")
          ) {
            console.warn(
              "📡 Lessons fetch failed due to connection reset, but course will load"
            );
          }
          lessonsData = [];
        }

        setLessons(lessonsData);

        // Initialize tests as empty array for now
        setTests([]);

        // Load lesson progress from localStorage (non-blocking)
        try {
          if (lessonsData.length > 0) {
            await loadLessonProgress(lessonsData);
            console.log("✅ Lesson progress loaded successfully");
          }
        } catch (progressError) {
          console.warn("⚠️ Failed to load lesson progress:", progressError);
          // Continue without progress data
        }

        console.log("🎉 Course page data loading completed");
      } catch (error) {
        console.error("❌ Unexpected error in fetchCourseData:", error);

        // Provide user-friendly error messages
        if (error instanceof Error) {
          if (error.message.includes("ECONNRESET")) {
            setError(
              "Kết nối bị gián đoạn. Vui lòng kiểm tra mạng và thử lại."
            );
          } else if (error.message.includes("timeout")) {
            setError("Tải dữ liệu quá lâu. Vui lòng thử lại.");
          } else if (
            error.message.includes("network") ||
            error.message.includes("fetch")
          ) {
            setError(
              "Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại."
            );
          } else {
            setError(`Lỗi: ${error.message}`);
          }
        } else {
          setError("Có lỗi không xác định. Vui lòng thử lại.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.courseId) {
      fetchCourseData();
    }
  }, [resolvedParams.courseId]);

  // Refresh progress when page becomes visible (user returns from lesson)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && lessons.length > 0) {
        await loadLessonProgress(lessons);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [lessons, courseCompleted]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
          <div className="flex items-center gap-6">
            <div className="h-40 w-40 bg-gray-300 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="mb-6">
            {error?.includes("ECONNRESET") || error?.includes("gián đoạn") ? (
              <div className="text-6xl mb-4">📡</div>
            ) : error?.includes("timeout") || error?.includes("lâu") ? (
              <div className="text-6xl mb-4">⏰</div>
            ) : error?.includes("network") || error?.includes("mạng") ? (
              <div className="text-6xl mb-4">🌐</div>
            ) : (
              <div className="text-6xl mb-4">⚠️</div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Có lỗi xảy ra
          </h3>
          <p className="text-red-500 mb-6">
            {error || "Không tìm thấy khóa học"}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#83d98c] hover:bg-[#6bc275]"
            >
              🔄 Thử lại
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              ← Quay lại
            </Button>
          </div>
          {error?.includes("ECONNRESET") && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
              💡 <strong>Mẹo:</strong> Lỗi này thường do mạng không ổn định. Hãy
              kiểm tra kết nối internet và thử lại sau vài giây.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" className="p-2">
          <Link
            href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/`}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-6 w-6" />
            <span>Back to Courses</span>
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="h-40 w-40 bg-[#d9d9d9] rounded-lg overflow-hidden">
            <Image
              src={
                course.thumbnailUrl ||
                "https://res.cloudinary.com/dfkb8qo66/image/upload/v1742822285/1000000018_aifdis.jpg"
              }
              alt="ảnh con thỏ"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-4">
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                <span>{lessons.length} Lessons</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>
                  {Array.isArray(lessons)
                    ? lessons.reduce(
                        (total, lesson) => total + (lesson.duration || 0),
                        0
                      )
                    : 0}{" "}
                  Minutes
                </span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                <span>{tests.length} Tests Available</span>
              </div>
            </div>
            <p className="text-[#4b5563] mb-4">{course.description}</p>
            <div className="w-full bg-[#e5e7eb] h-2 rounded-full mb-2">
              <div
                className="bg-[#83d98c] h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6b7280]">Overall Progress</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Congratulations Message */}
      {pointsAwarded && (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">🎉 Chúc mừng!</h3>
              <p className="text-lg">
                Bé đã hoàn thành khóa học{" "}
                <strong>{pointsAwarded.courseName}</strong> và nhận được{" "}
                <strong>{pointsAwarded.points} điểm</strong>!
              </p>
              <p className="text-white/90 mt-1">
                Tiếp tục học tập để kiếm thêm nhiều điểm và lên level cao hơn
                nhé! 🌟
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">+{pointsAwarded.points}</div>
              <div className="text-sm text-white/90">điểm</div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Course Lessons</h2>
        <div className="space-y-4">
          {lessons.length > 0 ? (
            lessons
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((lesson, index) => {
                const progress = lessonProgress[lesson._id];
                const isCompleted = progress?.currentProgress >= 100;
                const hasStarted =
                  progress &&
                  progress.currentProgress > 0 &&
                  progress.currentProgress < 100;

                return (
                  <Card key={lesson._id} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isCompleted
                                ? "bg-green-500"
                                : hasStarted
                                ? "bg-blue-500"
                                : "bg-[#e5e7eb]"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <span
                                className={`text-lg font-bold ${
                                  hasStarted ? "text-white" : "text-[#6b7280]"
                                }`}
                              >
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{lesson.title}</h3>
                              {isCompleted && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Completed
                                </span>
                              )}
                              {hasStarted && !isCompleted && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  In Progress
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#6b7280]">
                              {lesson.duration || 15} minutes
                            </p>
                            {progress && (
                              <div className="mt-1">
                                <div className="w-32 bg-gray-200 h-1 rounded-full">
                                  <div
                                    className={`h-1 rounded-full transition-all ${
                                      isCompleted
                                        ? "bg-green-500"
                                        : "bg-blue-500"
                                    }`}
                                    style={{
                                      width: `${
                                        progress.currentProgress || 0
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {progress.currentProgress || 0}% completed
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          className={`${
                            isCompleted
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : hasStarted
                              ? "bg-blue-500 hover:bg-blue-600 text-white"
                              : "bg-[#e5e7eb] text-[#6b7280] hover:bg-gray-300"
                          }`}
                        >
                          <Link
                            href={`/environment-kid/kid-learning-zone/${resolvedParams.kidId}/courses/${resolvedParams.courseId}/lessons/${lesson._id}`}
                            className="flex items-center gap-2"
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Review
                              </>
                            ) : hasStarted ? (
                              <>
                                <Play className="w-4 h-4" />
                                Continue
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                Start
                              </>
                            )}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          ) : (
            <p className="text-center text-[#6b7280] py-8">
              Chưa có bài học nào trong khóa học này.
            </p>
          )}
        </div>
      </div>

      {tests.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Course Tests</h2>
          <div className="space-y-4">
            {tests.map((test, index) => (
              <Card key={test._id} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#f59e0b] flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          T{index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{test.title}</h3>
                        <p className="text-sm text-[#6b7280]">Test</p>
                      </div>
                    </div>
                    <Button className="bg-[#f59e0b] hover:bg-[#d97706] text-white">
                      <Link
                        href={`/environment-kid/kid-learning-zone/courses/${resolvedParams.courseId}/tests/${test._id}`}
                      >
                        Take Test
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
