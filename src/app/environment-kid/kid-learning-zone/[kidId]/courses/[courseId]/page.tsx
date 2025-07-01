"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Clock,
  Star,
  ArrowLeft,
  CheckCircle,
  Play,
  MessageCircle,
  ThumbsUp,
  Send,
  Heart,
  User,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import {
  getCourseById,
  getLessonsByCourse,
  checkAndAwardCourseCompletion,
  updateCourseProgress,
  getCourseReviews,
  createCourseReview,
} from "@/lib/api";
import {
  updateCourseReview,
  deleteCourseReview,
} from "@/utils/apis";
import { toast } from "sonner";

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

interface Review {
  _id: string;
  courseId: {
    _id: string;
    title: string;
    category: string;
  };
  kidId?: {
    _id: string;
    fullName: string;
  };
  parentId?: {
    _id: string;
    fullName: string;
  };
  star: number;
  content: string;
  createdAt: string;
  updatedAt: string;
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [newReview, setNewReview] = useState({ star: 5, content: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editReviewData, setEditReviewData] = useState({ star: 5, content: "" });
  const [isUpdatingReview, setIsUpdatingReview] = useState(false);
  const [isDeletingReview, setIsDeletingReview] = useState<string | null>(null);

  // Load lesson progress from localStorage
  const loadLessonProgress = async (lessonsData: Lesson[]) => {
    const progressData: Record<string, any> = {};
    let completedLessons = 0;

    // Import utility functions
    const { kidLocalStorage: kidProgressUtils } = await import(
      "@/utils/kidProgress"
    );

    lessonsData.forEach((lesson) => {
      // Try to get lesson progress using the new utility function first
      let progress = kidProgressUtils.getLessonProgress(
        resolvedParams.kidId,
        lesson._id
      );

      // If not found, try the old format for backward compatibility
      if (!progress) {
        const oldStorageKey = `lesson_progress_${resolvedParams.kidId}_${lesson._id}`;
        const savedProgress = localStorage.getItem(oldStorageKey);

        if (savedProgress) {
          try {
            progress = JSON.parse(savedProgress);

            // Migrate to new format if progress is valid
            if (progress && typeof progress === "object") {
              console.log(
                `🔄 Migrating lesson progress for lesson ${lesson._id} to new format`
              );
              kidProgressUtils.setLessonProgress(
                resolvedParams.kidId,
                lesson._id,
                progress
              );

              // Remove old key
              localStorage.removeItem(oldStorageKey);
            }
          } catch (error) {
            console.error(
              "Error parsing old progress for lesson:",
              lesson._id,
              error
            );
          }
        }
      }

      if (progress) {
        progressData[lesson._id] = progress;

        // Check if lesson is completed
        // A lesson is completed if currentProgress reaches 100%
        if (progress.currentProgress >= 100) {
          completedLessons++;
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

    // ✅ ALWAYS update overall progress in localStorage using utility function
    kidProgressUtils.setCourseOverallProgress(
      resolvedParams.kidId,
      resolvedParams.courseId,
      progressPercentage
    );

    console.log(
      `💾 Overall progress updated: ${progressPercentage}% for course ${resolvedParams.courseId}`
    );

    // Check if course is completed and award points
    if (progressPercentage === 100 && !courseCompleted) {
      setCourseCompleted(true);

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

  // Fetch reviews for the course
  const fetchReviews = async () => {
    if (!resolvedParams.courseId) return;

    try {
      setReviewsLoading(true);
      const reviewsResponse = await getCourseReviews(
        resolvedParams.courseId,
        1,
        10
      );

      if (reviewsResponse?.success && reviewsResponse.data?.reviews) {
        setReviews(reviewsResponse.data.reviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);

      // For demo purposes, use sample reviews if API fails
      if (error instanceof Error && error.message.includes("404")) {
        console.warn("Reviews API not available, using sample data for demo");
        setReviews(sampleReviews);
      } else {
        console.warn("Reviews API error, showing empty state");
        setReviews([]);
      }
    } finally {
      setReviewsLoading(false);
    }
  };

  // Sample reviews for demo
  const sampleReviews: Review[] = [
    {
      _id: "sample1",
      courseId: {
        _id: resolvedParams.courseId,
        title: course?.title || "",
        category: "Kids",
      },
      kidId: {
        _id: "kid1",
        fullName: "Bé Minh",
      },
      star: 5,
      content:
        "Mình rất thích khóa học này! Các bài học rất vui và dễ hiểu. Cảm ơn cô giáo! 😍",
      createdAt: "2024-01-15T10:30:00.000Z",
      updatedAt: "2024-01-15T10:30:00.000Z",
    },
    {
      _id: "sample2",
      courseId: {
        _id: resolvedParams.courseId,
        title: course?.title || "",
        category: "Kids",
      },
      parentId: {
        _id: "parent2",
        fullName: "Chị Lan",
      },
      star: 4,
      content:
        "Con em học được nhiều điều bổ ích từ khóa học này. Rất cảm ơn! 👍",
      createdAt: "2024-01-10T14:20:00.000Z",
      updatedAt: "2024-01-10T14:20:00.000Z",
    },
  ];

  // Handle submit new review
  const handleSubmitReview = async () => {
    if (!newReview.content.trim() || newReview.star < 1 || newReview.star > 5) {
      toast("Hãy viết nội dung và chọn số sao từ 1 đến 5 nhé! 😊");
      return;
    }

    try {
      setIsSubmittingReview(true);

      // Get kid data from localStorage
      const kidData = localStorage.getItem("kidData");
      if (!kidData) {
        toast("Hãy đăng nhập để có thể đánh giá khóa học nhé! 🔑");
        return;
      }

      const parsedKidData = JSON.parse(kidData);
      const kidId = parsedKidData.data?.id || parsedKidData.data?._id;

      if (!kidId) {
        toast("Không tìm thấy thông tin bé");
        return;
      }

      const reviewData = {
        courseId: resolvedParams.courseId,
        kidId: kidId,
        star: newReview.star,
        content: newReview.content.trim(),
      };

      console.log("Sending kid review data:", reviewData);

      const response = await createCourseReview(reviewData);

      if (response?.success) {
        // Reset form
        setNewReview({ star: 5, content: "" });

        // Refresh reviews
        await fetchReviews();

        toast(
          "Cảm ơn bé đã chia sẻ! Đánh giá của bé đã được gửi thành công! 🎉"
        );
      }
    } catch (error) {
      console.error("Error submitting kid review:", error);

      if (error instanceof Error) {
        if (error.message.includes("404")) {
          toast(
            "Chức năng đánh giá đang được phát triển. Cảm ơn bé đã quan tâm! 🚧"
          );
        } else if (
          error.message.includes("401") ||
          error.message.includes("403")
        ) {
          toast("Bé cần đăng nhập để có thể đánh giá khóa học nhé! 🔐");
        } else if (error.message.includes("400")) {
          toast("Thông tin không hợp lệ. Hãy kiểm tra lại nhé! ❓");
        } else {
          toast(`Có lỗi xảy ra: ${error.message} 😅`);
        }
      } else {
        toast("Có lỗi xảy ra khi gửi đánh giá. Thử lại sau nhé! 🔄");
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Handle edit review
  const handleEditReview = (review: Review) => {
    setEditingReview(review._id);
    setEditReviewData({ star: review.star, content: review.content });
  };

  // Handle update review
  const handleUpdateReview = async () => {
    if (!editingReview || !editReviewData.content.trim() || editReviewData.star < 1 || editReviewData.star > 5) {
      toast("Hãy viết nội dung và chọn số sao từ 1 đến 5 nhé! 😊");
      return;
    }

    try {
      setIsUpdatingReview(true);

      const response = await updateCourseReview(editingReview, {
        star: editReviewData.star,
        content: editReviewData.content.trim(),
      });

      if (response?.success) {
        // Reset edit state
        setEditingReview(null);
        setEditReviewData({ star: 5, content: "" });

        // Refresh reviews
        await fetchReviews();

        toast("Đánh giá của bé đã được cập nhật thành công! ✨");
      }
    } catch (error) {
      console.error("Error updating review:", error);

      if (error instanceof Error) {
        if (error.message.includes("404")) {
          toast("Chức năng chỉnh sửa đang được phát triển. Cảm ơn bé đã quan tâm! 🚧");
        } else if (error.message.includes("401") || error.message.includes("403")) {
          toast("Bé chỉ có thể chỉnh sửa đánh giá của chính mình nhé! 🔐");
        } else if (error.message.includes("400")) {
          toast("Thông tin không hợp lệ. Hãy kiểm tra lại nhé! ❓");
        } else {
          toast(`Có lỗi xảy ra: ${error.message} 😅`);
        }
      } else {
        toast("Có lỗi xảy ra khi cập nhật đánh giá. Thử lại sau nhé! 🔄");
      }
    } finally {
      setIsUpdatingReview(false);
    }
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Bé có chắc chắn muốn xóa đánh giá này không? 🗑️")) {
      return;
    }

    try {
      setIsDeletingReview(reviewId);

      const response = await deleteCourseReview(reviewId);

      if (response?.success) {
        // Refresh reviews
        await fetchReviews();

        toast("Đánh giá của bé đã được xóa thành công! 🗑️");
      }
    } catch (error) {
      console.error("Error deleting review:", error);

      if (error instanceof Error) {
        if (error.message.includes("404")) {
          toast("Chức năng xóa đang được phát triển. Cảm ơn bé đã quan tâm! 🚧");
        } else if (error.message.includes("401") || error.message.includes("403")) {
          toast("Bé chỉ có thể xóa đánh giá của chính mình nhé! 🔐");
        } else if (error.message.includes("400")) {
          toast("Không thể xóa đánh giá này. Hãy thử lại nhé! ❓");
        } else {
          toast(`Có lỗi xảy ra: ${error.message} 😅`);
        }
      } else {
        toast("Có lỗi xảy ra khi xóa đánh giá. Thử lại sau nhé! 🔄");
      }
    } finally {
      setIsDeletingReview(null);
    }
  };

  // Check if review belongs to current kid
  const isOwnReview = (review: Review) => {
    const kidData = localStorage.getItem("kidData");
    if (!kidData) return false;

    try {
      const parsedKidData = JSON.parse(kidData);
      const currentKidId = parsedKidData.data?.id || parsedKidData.data?._id;
      return review.kidId?._id === currentKidId;
    } catch {
      return false;
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
              "Kết nối bị gián đoạn khi tải khóa học. Vui lòng thử lại sau."
            );
          } else {
            setError("Không thể tải thông tin khóa học. Vui lòng thử lại.");
          }
          return;
        }

        // Handle course data
        let courseData = null;
        if (courseResponse?.success && courseResponse.data) {
          courseData = courseResponse.data;
        } else if (courseResponse?.data?.course) {
          courseData = courseResponse.data.course;
        } else if (courseResponse?.course) {
          courseData = courseResponse.course;
        } else if (courseResponse?._id) {
          courseData = courseResponse;
        }

        if (!courseData) {
          setError("Không tìm thấy thông tin khóa học");
          return;
        }

        setCourse(courseData);

        // Fetch lessons and tests
        try {
          const [lessonsResponse] = await Promise.all([
            getLessonsByCourse(resolvedParams.courseId),
          ]);

          // Handle lessons
          let lessonsData = [];
          if (lessonsResponse?.data?.lessons) {
            lessonsData = lessonsResponse.data.lessons;
          } else if (lessonsResponse?.lessons) {
            lessonsData = lessonsResponse.lessons;
          } else if (Array.isArray(lessonsResponse)) {
            lessonsData = lessonsResponse;
          }

          setLessons(lessonsData);

          // Load progress
          if (lessonsData.length > 0) {
            await loadLessonProgress(lessonsData);
          }

          console.log(
            `✅ Fetched ${lessonsData.length} lessons for course ${resolvedParams.courseId}`
          );
        } catch (dataError) {
          console.warn("⚠️ Error fetching course content:", dataError);
          setLessons([]);
          setTests([]);
        }
      } catch (err) {
        console.error("❌ Unexpected error:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu khóa học");
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.courseId) {
      fetchCourseData();
    }
  }, [resolvedParams.courseId, resolvedParams.kidId]);

  // Refresh progress when page becomes visible
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

  // Fetch reviews when course loads
  useEffect(() => {
    if (resolvedParams.courseId) {
      fetchReviews();
    }
  }, [resolvedParams.courseId]);

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
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${isCompleted
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
                                className={`text-lg font-bold ${hasStarted ? "text-white" : "text-[#6b7280]"
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
                                    className={`h-1 rounded-full transition-all ${isCompleted
                                      ? "bg-green-500"
                                      : "bg-blue-500"
                                      }`}
                                    style={{
                                      width: `${progress.currentProgress || 0
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
                          className={`${isCompleted
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

      {/* Reviews Section - Kid Friendly */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          ⭐ Đánh giá khóa học
        </h2>

        {/* Create Review Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-700">
            💭 Chia sẻ cảm nghĩ của bé
          </h3>

          <div className="mb-4 p-4 bg-white/70 border border-pink-200 rounded-lg">
            <p className="text-sm text-purple-700 flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-500" />
              <strong>Bé có thích khóa học này không?</strong> Hãy cho các bé
              khác biết nhé! 😊
            </p>
          </div>

          {/* Kid-friendly Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-purple-700">
              🌟 Bé cho bao nhiêu sao?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, star })}
                  className="p-2 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`h-8 w-8 ${star <= newReview.star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">
              {newReview.star === 5 && "Tuyệt vời! 🎉"}
              {newReview.star === 4 && "Rất tốt! 😊"}
              {newReview.star === 3 && "Ổn nha! 😐"}
              {newReview.star === 2 && "Có thể tốt hơn 😕"}
              {newReview.star === 1 && "Cần cải thiện 😞"}
            </p>
          </div>

          {/* Kid-friendly Review Content */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-purple-700">
              ✍️ Bé muốn chia sẻ gì về khóa học này?
            </label>
            <Textarea
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
              placeholder="Mình thích khóa học này vì... 😊"
              className="resize-none text-base border-2 border-purple-200 focus:border-purple-400 rounded-xl"
              rows={4}
            />
          </div>

          {/* Submit Button - Kid Friendly */}
          <Button
            onClick={handleSubmitReview}
            disabled={!newReview.content.trim() || isSubmittingReview}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl py-3 text-lg font-bold flex items-center justify-center gap-2"
          >
            {isSubmittingReview ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Đang gửi...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Gửi đánh giá 🎈
              </>
            )}
          </Button>
        </div>

        {/* Reviews List - Kid Friendly */}
        <div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-purple-700">
            👥 Các bé khác nói gì về khóa học này ({reviews.length})
          </h3>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 flex items-center gap-2">
              <Edit className="h-4 w-4" />
              <strong>Mẹo:</strong> Bé có thể nhấn nút "Sửa" hoặc "Xóa" để chỉnh sửa đánh giá của chính mình nhé! ✨
            </p>
          </div>

          {reviewsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-purple-600 font-medium">
                Đang tải đánh giá...
              </span>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={review._id}
                  className="border-2 border-pink-100 rounded-xl p-4 bg-gradient-to-r from-blue-50 to-purple-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-purple-700">
                            {review.parentId?.fullName ||
                              review.kidId?.fullName ||
                              "Bé ẩn danh"}
                            {review.kidId && " 👶 (Kid)"}
                            {review.parentId && " 👩 (Parent)"}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= review.star
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-purple-600 font-medium">
                              {new Date(review.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                              {review.updatedAt !== review.createdAt && (
                                <span className="ml-2 text-xs text-gray-500">
                                  (đã chỉnh sửa)
                                </span>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons for own reviews */}
                        {isOwnReview(review) && (
                          <div className="flex gap-2">
                            {editingReview === review._id ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={handleUpdateReview}
                                  disabled={isUpdatingReview}
                                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1"
                                >
                                  {isUpdatingReview ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                  ) : (
                                    <>
                                      <Save className="h-3 w-3 mr-1" />
                                      Lưu
                                    </>
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingReview(null);
                                    setEditReviewData({ star: 5, content: "" });
                                  }}
                                  className="text-xs px-2 py-1"
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Hủy
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleEditReview(review)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Sửa
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteReview(review._id)}
                                  disabled={isDeletingReview === review._id}
                                  className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
                                >
                                  {isDeletingReview === review._id ? (
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                                  ) : (
                                    <>
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Xóa
                                    </>
                                  )}
                                </Button>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Review content - show edit form if editing */}
                      {editingReview === review._id ? (
                        <div className="space-y-3">
                          {/* Edit Star Rating */}
                          <div>
                            <label className="block text-sm font-bold mb-2 text-purple-700">
                              🌟 Bé cho bao nhiêu sao?
                            </label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEditReviewData({ ...editReviewData, star })}
                                  className="p-1 hover:scale-125 transition-transform"
                                >
                                  <Star
                                    className={`h-6 w-6 ${star <= editReviewData.star
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                      }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Edit Review Content */}
                          <div>
                            <label className="block text-sm font-bold mb-2 text-purple-700">
                              ✍️ Bé muốn chia sẻ gì về khóa học này?
                            </label>
                            <Textarea
                              value={editReviewData.content}
                              onChange={(e) =>
                                setEditReviewData({ ...editReviewData, content: e.target.value })
                              }
                              placeholder="Mình thích khóa học này vì... 😊"
                              className="resize-none text-base border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 leading-relaxed font-medium">
                          {review.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">😊</div>
              <h4 className="text-lg font-bold text-purple-600 mb-2">
                Chưa có đánh giá nào
              </h4>
              <p className="text-purple-500">
                Hãy là bé đầu tiên chia sẻ cảm nghĩ về khóa học này nhé! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
