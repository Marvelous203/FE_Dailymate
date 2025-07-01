"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Clock,
  Star,
  Trophy,
  User,
  Calendar,
  Award,
  Target,
  Zap,
} from "lucide-react";
import { RewardDisplay } from "@/components/rewards/RewardDisplay";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getAllCourses,
  getAllCourseProgressByKidId,
  getLessonsByCourse,
  getKidById,
} from "@/lib/api";
import { kidLocalStorage } from "@/utils/kidProgress";

interface KidData {
  data: {
    id: string;
    fullName: string;
    avatar?: string;
    level?: number;
    dateOfBirth?: string;
    gender?: string;
    points?: number;
    streak?: {
      current: number;
    };
    achievements?: any[];
    userId?: {
      id: string;
      email: string;
    };
  };
}

export default function KidLearningZonePage() {
  const params = useParams();
  const [kidData, setKidData] = useState<KidData | null>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, any>>({});
  const [continueLearningCourse, setContinueLearningCourse] =
    useState<any>(null);
  const kidId = params.kidId as string;

  // Helper function to find course for "Continue Learning" section
  const findContinueLearningCourse = async (
    progressList: any[],
    allCourses: any[]
  ) => {
    try {
      // Find a course that has progress but is not completed
      const inProgressCourse = progressList.find((progress: any) => {
        return (
          progress.status === false &&
          (progress.lessonCompleted?.length > 0 ||
            progress.testResults?.length > 0)
        );
      });

      if (inProgressCourse && allCourses.length > 0) {
        const courseId =
          typeof inProgressCourse.courseId === "object"
            ? inProgressCourse.courseId._id || inProgressCourse.courseId.id
            : inProgressCourse.courseId;

        const courseData = allCourses.find(
          (course: any) => course._id === courseId
        );
        if (courseData) {
          // Get lessons to calculate progress
          try {
            const lessonsResponse = await getLessonsByCourse(courseId);
            const lessons = Array.isArray(lessonsResponse)
              ? lessonsResponse
              : lessonsResponse?.lessons ||
              lessonsResponse?.data?.lessons ||
              [];

            // Calculate progress percentage using utility function
            let progressPercentage = kidLocalStorage.getCourseOverallProgress(
              kidId,
              courseId
            );

            // Get lesson data for calculations
            const totalLessons = lessons.length;
            const completedLessons =
              inProgressCourse.lessonCompleted?.length || 0;

            // Fallback: calculate from localStorage individual lesson progress if no overall progress
            if (progressPercentage === 0) {
              // Try to calculate from individual lesson progress in localStorage
              let totalLessonProgress = 0;
              let lessonCount = 0;

              lessons.forEach((lesson: any) => {
                // Try new format first
                const newProgress = kidLocalStorage.getLessonProgress(
                  kidId,
                  lesson._id
                );

                if (newProgress && newProgress.currentProgress !== undefined) {
                  totalLessonProgress += Math.min(
                    100,
                    newProgress.currentProgress
                  );
                  lessonCount++;
                } else {
                  // Fallback to old format
                  const lessonProgressKey = `lesson_progress_${kidId}_${lesson._id}`;
                  const storedLessonProgress =
                    localStorage.getItem(lessonProgressKey);
                  if (storedLessonProgress) {
                    try {
                      const lessonData = JSON.parse(storedLessonProgress);
                      if (lessonData.currentProgress !== undefined) {
                        totalLessonProgress += Math.min(
                          100,
                          lessonData.currentProgress
                        );
                        lessonCount++;
                      }
                    } catch (error) {
                      console.error("Error parsing lesson progress:", error);
                    }
                  }
                }
              });

              if (lessonCount > 0) {
                // Calculate average progress from individual lessons
                progressPercentage = Math.round(
                  totalLessonProgress / lessonCount
                );

                // Update overall progress using utility
                kidLocalStorage.setCourseOverallProgress(
                  kidId,
                  courseId,
                  progressPercentage
                );
                console.log(
                  `💾 Calculated and saved overall progress: ${progressPercentage}% for course ${courseId}`
                );
              } else if (totalLessons > 0 && completedLessons <= totalLessons) {
                // Fallback to API calculation
                progressPercentage = Math.round(
                  (completedLessons / totalLessons) * 100
                );
                kidLocalStorage.setCourseOverallProgress(
                  kidId,
                  courseId,
                  progressPercentage
                );
              } else if (completedLessons > 0) {
                // Conservative estimate if data seems inconsistent
                progressPercentage = Math.min(
                  100,
                  Math.round(
                    (completedLessons /
                      Math.max(totalLessons, completedLessons)) *
                    100
                  )
                );
                kidLocalStorage.setCourseOverallProgress(
                  kidId,
                  courseId,
                  progressPercentage
                );
              }

              // Ensure final value is capped at 100%
              progressPercentage = Math.min(
                100,
                Math.max(0, progressPercentage)
              );
            }

            console.log(`🔍 Continue Learning - Course: ${courseData.title}`);
            console.log(
              `📈 Continue Learning - Progress: ${progressPercentage}% (from utility function)`
            );
            console.log(
              `🎯 Continue Learning - Progress data:`,
              inProgressCourse
            );

            // Get last completed lesson for "Continue Learning"
            const lastLessonIndex = Math.max(0, completedLessons - 1);
            const nextLessonIndex = Math.min(
              totalLessons - 1,
              completedLessons
            );
            const nextLesson = lessons[nextLessonIndex];

            setContinueLearningCourse({
              ...courseData,
              progress: progressPercentage,
              nextLesson: nextLesson,
              nextLessonNumber: nextLessonIndex + 1,
              totalLessons: totalLessons,
            });
          } catch (lessonError) {
            console.error(
              "Error fetching lessons for continue learning:",
              lessonError
            );
          }
        }
      }
    } catch (error) {
      console.error("Error finding continue learning course:", error);
    }
  };

  // Helper function to fetch lesson counts for accurate progress calculation
  const fetchLessonCounts = async (courseIds: string[], allCourses: any[]) => {
    try {
      const updatedCourses = await Promise.all(
        courseIds.map(async (courseId) => {
          try {
            const lessonsResponse = await getLessonsByCourse(courseId);
            const lessons = Array.isArray(lessonsResponse)
              ? lessonsResponse
              : lessonsResponse?.lessons ||
              lessonsResponse?.data?.lessons ||
              [];

            const course = allCourses.find((c: any) => c._id === courseId);
            if (course) {
              return {
                ...course,
                cachedLessonCount: lessons.length,
              };
            }
            return null;
          } catch (error) {
            console.error(
              `Error fetching lessons for course ${courseId}:`,
              error
            );
            return allCourses.find((c: any) => c._id === courseId);
          }
        })
      );

      // Update courses state with cached lesson counts
      setCourses((prevCourses) => {
        return prevCourses.map((course) => {
          const updatedCourse = updatedCourses.find(
            (uc) => uc && uc._id === course._id
          );
          return updatedCourse || course;
        });
      });
    } catch (error) {
      console.error("Error fetching lesson counts:", error);
    }
  };

  // Function to refresh kid data from API
  const refreshKidData = async (kidId: string) => {
    try {
      const kidResponse = await getKidById(kidId);
      if (kidResponse && kidResponse.success) {
        const refreshedKidData = { data: kidResponse.data };
        setKidData(refreshedKidData);

        // Update localStorage with fresh data
        localStorage.setItem("kidData", JSON.stringify(refreshedKidData));

        console.log(
          "🔄 Kid data refreshed with updated points:",
          kidResponse.data.points
        );
      }
    } catch (error) {
      console.error("Error refreshing kid data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load kid data from localStorage first for quick display
        const storedKidData = localStorage.getItem("kidData");
        if (storedKidData) {
          try {
            const parsedData = JSON.parse(storedKidData);
            setKidData(parsedData);
          } catch (error) {
            console.error("Error parsing kid data:", error);
          }
        }

        // Then refresh with latest data from API
        if (kidId) {
          await refreshKidData(kidId);
        }

        if (kidId) {
          // Fetch courses and progress data in parallel
          const [coursesResponse, progressResponse] = await Promise.all([
            getAllCourses(1, 20),
            getAllCourseProgressByKidId(kidId),
          ]);

          // Handle courses data
          if (
            coursesResponse &&
            coursesResponse.success &&
            coursesResponse.data &&
            Array.isArray(coursesResponse.data.courses)
          ) {
            const publishedCourses = coursesResponse.data.courses.filter(
              (course: any) => course.isPublished
            );
            setCourses(publishedCourses);
          }

          // Handle enrollment data
          if (progressResponse && progressResponse.success) {
            let enrolledCourseIds: string[] = [];
            let progressData: Record<string, any> = {};

            // Handle different API response structures
            let progressList: any[] = [];
            if (Array.isArray(progressResponse.data)) {
              progressList = progressResponse.data;
            } else if (
              progressResponse.data?.courseProgressList &&
              Array.isArray(progressResponse.data.courseProgressList)
            ) {
              progressList = progressResponse.data.courseProgressList;
            }

            progressList.forEach((progress: any) => {
              const courseId =
                typeof progress.courseId === "object" &&
                  progress.courseId !== null
                  ? progress.courseId._id ||
                  progress.courseId.id ||
                  progress.courseId
                  : progress.courseId;

              if (courseId) {
                enrolledCourseIds.push(courseId);
                progressData[courseId] = progress;
              }
            });

            setEnrolledCourses(enrolledCourseIds);
            setCourseProgress(progressData);

            // Fetch lesson counts for enrolled courses to ensure accurate progress calculation
            await fetchLessonCounts(
              enrolledCourseIds,
              coursesResponse.data?.courses || []
            );

            // Find course for "Continue Learning" section
            await findContinueLearningCourse(
              progressList,
              coursesResponse.data?.courses || []
            );
          }
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [kidId]);

  // Refresh kid data when page becomes visible (user returns from course/lessons)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && kidId) {
        await refreshKidData(kidId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [kidId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-400 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">
            Đang tải thông tin bé...
          </p>
        </div>
      </div>
    );
  }

  const kid = kidData?.data;
  // const user = kid?.userId

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
            Chào mừng trở lại! 🌟
          </h1>
          <p className="text-gray-600 text-lg">
            Hãy tiếp tục hành trình học tập thú vị của bé nhé!
          </p>
        </div>

        {/* Profile Section - Redesigned */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-400 to-blue-500 text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Kid Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 border-4 border-white/30 shadow-2xl">
                  <Image
                    src={kid?.avatar || "/avatar_default.png"}
                    alt={kid?.fullName || "Kid Profile"}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/avatar_default.png";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Lv.{kid?.level || 1}
                </div>
              </div>

              {/* Kid Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {kid?.fullName || "Tên bé"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-3 bg-white/20 rounded-lg p-3">
                    <Calendar size={20} className="text-yellow-300" />
                    <span className="font-medium">
                      Tuổi: {calculateAge(kid?.dateOfBirth || "")} tuổi
                    </span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3 bg-white/20 rounded-lg p-3">
                    <User size={20} className="text-yellow-300" />
                    <span className="font-medium">
                      Giới tính:{" "}
                      {kid?.gender === "male"
                        ? "Nam"
                        : kid?.gender === "female"
                          ? "Nữ"
                          : "Chưa xác định"}
                    </span>
                  </div>
                </div>

                {/* Kid Stats - Redesigned */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <Star size={16} />
                    {kid?.points || 0} điểm
                  </div>
                  <div className="bg-orange-400 text-orange-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <Zap size={16} />
                    {kid?.streak?.current || 0} ngày
                  </div>
                  <div className="bg-purple-400 text-purple-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <Award size={16} />
                    {kid?.achievements?.length || 0} thành tích
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {kid?.points || 0}
              </div>
              <div className="text-gray-600 font-medium">Tổng điểm</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {kid?.streak?.current || 0}
              </div>
              <div className="text-gray-600 font-medium">Streak hiện tại</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {kid?.achievements?.length || 0}
              </div>
              <div className="text-gray-600 font-medium">Thành tích</div>
            </CardContent>
          </Card>
        </div>

        {/* Reward Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <RewardDisplay />
        </div>

        {/* Continue Learning - Enhanced */}
        {continueLearningCourse ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              Tiếp tục học tập
            </h2>
            <Card className="border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
                <Image
                  src={
                    continueLearningCourse.thumbnailUrl ||
                    "https://res.cloudinary.com/dfkb8qo66/image/upload/v1742822285/1000000018_aifdis.jpg"
                  }
                  alt={continueLearningCourse.title}
                  width={640}
                  height={192}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {continueLearningCourse.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <Clock size={16} />
                    <span>
                      Lesson {continueLearningCourse.nextLessonNumber}:{" "}
                      {continueLearningCourse.nextLesson?.title || "Tiếp theo"}
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">
                      Tiến độ học tập
                    </span>
                    <span className="font-bold text-blue-600">
                      {continueLearningCourse.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${continueLearningCourse.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link
                    href={`/environment-kid/kid-learning-zone/${kidId}/courses/${continueLearningCourse._id
                      }/lessons/${continueLearningCourse.nextLesson?._id || ""}`}
                    className="flex items-center justify-center gap-2"
                  >
                    Tiếp tục học
                    <BookOpen size={18} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <Card className="border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden flex items-center justify-center">
                <div className="text-center text-white">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-80" />

                  <p className="text-white/90">
                    Hãy khám phá các khóa học thú vị!
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link
                    href={`/environment-kid/kid-learning-zone/${kidId}/courses`}
                    className="flex items-center justify-center gap-2"
                  >
                    Khám phá khóa học
                    <BookOpen size={18} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Courses - Enhanced Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            Khóa học của bé
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((courseId) => {
                const course = courses.find((c) => c._id === courseId);
                const progress = courseProgress[courseId];

                if (!course) return null;

                // Get progress using utility function
                let progressPercentage =
                  kidLocalStorage.getCourseOverallProgress(kidId, courseId);

                // Fallback: calculate from localStorage individual lesson progress if no overall progress
                if (progressPercentage === 0) {
                  // First try to get lessons and calculate from localStorage
                  if (
                    course.cachedLessonCount &&
                    course.cachedLessonCount > 0
                  ) {
                    // Try to calculate from localStorage individual lesson progress (more accurate)
                    let totalLessonProgress = 0;
                    let lessonCount = 0;

                    // We don't have lesson details here, so use API progress as fallback
                    if (progress) {
                      const completedLessons =
                        progress?.lessonCompleted?.length || 0;
                      const totalLessons = course.cachedLessonCount;

                      if (totalLessons > 0) {
                        progressPercentage = Math.round(
                          (completedLessons / totalLessons) * 100
                        );
                      }
                    }
                  } else if (progress) {
                    // Conservative calculation when lesson count is unknown
                    const completedLessons =
                      progress?.lessonCompleted?.length || 0;
                    if (completedLessons > 0) {
                      // If we don't know total lessons, assume reasonable completion
                      progressPercentage = Math.min(
                        100,
                        Math.round(completedLessons * 33.33)
                      ); // Assume ~3 lessons per course minimum
                    }
                  }

                  // Save calculated progress and ensure final value is capped at 100%
                  progressPercentage = Math.min(
                    100,
                    Math.max(0, progressPercentage)
                  );

                  if (progressPercentage > 0) {
                    kidLocalStorage.setCourseOverallProgress(
                      kidId,
                      courseId,
                      progressPercentage
                    );
                    console.log(
                      `💾 Saved calculated progress: ${progressPercentage}% for course ${courseId}`
                    );
                  }
                }

                // Debug logging
                console.log(`🔍 Course: ${course.title}`);
                console.log(
                  `📈 Progress: ${progressPercentage}% (from utility function)`
                );
                console.log(`🎯 Progress data:`, progress);

                return (
                  <Card
                    key={courseId}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                      <Image
                        src={
                          course.thumbnailUrl ||
                          "https://res.cloudinary.com/dfkb8qo66/image/upload/v1742822285/1000000018_aifdis.jpg"
                        }
                        alt={course.title}
                        width={320}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-gray-700">
                          {course.pointsEarned || 0}
                        </span>
                      </div>
                      {course.isPremium && (
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Premium
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3 text-gray-800">
                        {course.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center text-gray-600 gap-1">
                          <BookOpen size={16} />
                          <span>
                            {course.cachedLessonCount || "Nhiều"} bài học
                          </span>
                        </div>
                        <div className="text-green-600 font-bold">
                          {progressPercentage}% hoàn thành
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mb-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <Link
                          href={`/environment-kid/kid-learning-zone/${kidId}/courses/${course._id}`}
                          className="flex items-center justify-center gap-2"
                        >
                          {progressPercentage > 0 ? "Tiếp tục" : "Bắt đầu"}
                          <Star size={16} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-500 mb-2">
                  Chưa có khóa học nào
                </h3>
                <p className="text-gray-400 mb-6">
                  Hãy khám phá và đăng ký các khóa học thú vị!
                </p>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link
                    href={`/environment-kid/kid-learning-zone/${kidId}/courses`}
                    className="flex items-center gap-2"
                  >
                    Khám phá khóa học
                    <BookOpen size={18} />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Daily Challenge - Enhanced */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            Thử thách hàng ngày
          </h2>
          <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-yellow-200" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      Thử thách giải quyết vấn đề
                    </h3>
                  </div>
                  <p className="text-lg mb-6 text-white/90">
                    Hoàn thành câu đố hôm nay và nhận thêm sao vàng!
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                      <span className="font-bold">+5 sao</span>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-300" />
                      <span className="font-bold">+50 điểm</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button className="bg-white text-orange-500 hover:bg-white/90 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                    <Link
                      href="/environment-kid/kid-learning-zone/challenges/daily"
                      className="flex items-center gap-3"
                    >
                      Bắt đầu thử thách
                      <Trophy size={20} />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
