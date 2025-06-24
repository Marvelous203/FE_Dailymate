"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, Lock, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getAllCourses,
  getAllCourseProgressByKidId,
  enrollInCourse,
  getCourseProgress,
} from "@/lib/api";
import { useParams } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  ageGroup: string;
  thumbnailUrl: string;
  pointsEarned: number;
  isPremium: boolean;
  instructor: {
    _id: string;
    fullName: string;
    specializations: string[];
  } | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Thêm function helper để rút gọn text
const truncateText = (text: string, maxLines: number = 3): string => {
  if (!text) return "";

  // Ước tính số ký tự cho mỗi dòng (khoảng 50-60 ký tự/dòng)
  const maxCharsPerLine = 55;
  const maxChars = maxLines * maxCharsPerLine;

  if (text.length <= maxChars) {
    return text;
  }

  // Cắt text và thêm "..."
  const truncated = text.substring(0, maxChars - 3).trim();
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  // Cắt tại từ cuối cùng để tránh cắt giữa từ
  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + "..."
    : truncated + "...";
};

// Default course images
const getDefaultCourseImage = (
  courseTitle: string,
  category?: string
): string => {
  const defaultImages = [
    "https://res.cloudinary.com/dfkb8qo66/image/upload/v1742822285/1000000018_aifdis.jpg",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=200&fit=crop",
  ];

  // Pick image based on course title hash for consistency
  const hash = courseTitle.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  return defaultImages[Math.abs(hash) % defaultImages.length];
};

export default function CoursesPage() {
  const params = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const kidId = params.kidId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch courses and enrollment data in parallel
        const [coursesResponse, progressResponse] = await Promise.all([
          getAllCourses(1, 20),
          getAllCourseProgressByKidId(kidId as string),
        ]);

        // Handle courses data
        if (
          coursesResponse &&
          coursesResponse.success &&
          coursesResponse.data &&
          Array.isArray(coursesResponse.data.courses)
        ) {
          const publishedCourses = coursesResponse.data.courses.filter(
            (course: Course) => course.isPublished
          );
          setCourses(publishedCourses);
        } else {
          console.warn("Unexpected API response structure:", coursesResponse);
          setCourses([]);
        }

        // Handle enrollment data
        if (progressResponse && progressResponse.success) {
          let enrolledCourseIds: string[] = [];

          // Handle different API response structures
          console.log(
            "🔍 Debug - progressResponse.data:",
            progressResponse.data
          );
          console.log(
            "🔍 Debug - progressResponse.data type:",
            typeof progressResponse.data
          );
          console.log(
            "🔍 Debug - progressResponse.data.courseProgressList:",
            progressResponse.data?.courseProgressList
          );

          if (Array.isArray(progressResponse.data)) {
            // Direct array format
            console.log("📋 Using direct array format");
            enrolledCourseIds = progressResponse.data.map((progress: any) => {
              console.log("📋 Progress item:", progress);
              console.log("📋 Progress courseId:", progress.courseId);
              console.log(
                "📋 Progress courseId type:",
                typeof progress.courseId
              );

              // Handle courseId as object or string
              const extractedId =
                typeof progress.courseId === "object"
                  ? progress.courseId._id ||
                    progress.courseId.id ||
                    progress.courseId
                  : progress.courseId;

              console.log("📋 Extracted course ID:", extractedId);
              return extractedId;
            });
          } else if (
            progressResponse.data?.courseProgressList &&
            Array.isArray(progressResponse.data.courseProgressList)
          ) {
            // Object with courseProgressList format
            console.log("📋 Using courseProgressList format");
            enrolledCourseIds = progressResponse.data.courseProgressList.map(
              (progress: any) => {
                console.log("📋 Progress item:", progress);
                // Handle courseId as object or string
                return typeof progress.courseId === "object"
                  ? progress.courseId._id ||
                      progress.courseId.id ||
                      progress.courseId
                  : progress.courseId;
              }
            );
          } else if (
            progressResponse.data &&
            typeof progressResponse.data === "object"
          ) {
            // Single object format - maybe the API returns just one enrollment record
            console.log("📋 Checking if single object format");
            if (progressResponse.data.courseId) {
              enrolledCourseIds = [progressResponse.data.courseId];
            }
          }

          console.log("📋 Final enrolled course IDs:", enrolledCourseIds);
          console.log("📋 Progress response data:", progressResponse.data);
          setEnrolledCourses(enrolledCourseIds);
        } else {
          console.log(
            "📋 Bulk progress API failed, will use individual course checks"
          );

          // If bulk API fails, we'll try to check each course individually using getCourseProgress
          if (
            progressResponse?.needsFallback &&
            coursesResponse?.data?.courses
          ) {
            console.log("🔄 Attempting fallback individual course checks...");
            const publishedCourses = coursesResponse.data.courses.filter(
              (course: Course) => course.isPublished
            );

            await checkIndividualCourseEnrollments(
              kidId as string,
              publishedCourses
            );
          } else {
            setEnrolledCourses([]);
          }
        }

        // Check user premium status from localStorage
        const parentData = localStorage.getItem("parentData");
        if (parentData) {
          const parent = JSON.parse(parentData);
          setIsUserPremium(parent.isPremium || false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu"
        );
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (kidId) {
      fetchData();
    }
  }, [kidId]);

  // Check individual course enrollments as fallback
  const checkIndividualCourseEnrollments = async (
    kidId: string,
    courses: Course[]
  ) => {
    console.log("🔍 Checking individual course enrollments...");
    const enrolledCourseIds: string[] = [];

    // Check each course individually
    for (const course of courses) {
      try {
        // Try to get course progress - if it exists, user is enrolled
        const progressResult = await getCourseProgress(kidId, course._id);
        if (
          progressResult?.success &&
          progressResult.data?._id &&
          progressResult.data._id !== "not_found"
        ) {
          enrolledCourseIds.push(course._id);
          console.log(
            `✅ Found enrollment for course: ${course.title} (${course._id})`
          );
        }
      } catch (error) {
        // Ignore errors for individual course checks
        console.log(`❌ Failed to check course ${course._id}:`, error);
      }
    }

    console.log("📋 Individual check results:", enrolledCourseIds);
    setEnrolledCourses(enrolledCourseIds);
  };

  // Refresh enrolled courses data
  const refreshEnrolledCourses = async () => {
    try {
      const progressResponse = await getAllCourseProgressByKidId(
        kidId as string
      );
      if (progressResponse && progressResponse.success) {
        let enrolledCourseIds: string[] = [];

        // Handle different API response structures
        console.log(
          "🔄 Refresh Debug - progressResponse.data:",
          progressResponse.data
        );

        if (Array.isArray(progressResponse.data)) {
          // Direct array format
          enrolledCourseIds = progressResponse.data.map((progress: any) => {
            return typeof progress.courseId === "object"
              ? progress.courseId._id ||
                  progress.courseId.id ||
                  progress.courseId
              : progress.courseId;
          });
        } else if (
          progressResponse.data?.courseProgressList &&
          Array.isArray(progressResponse.data.courseProgressList)
        ) {
          // Object with courseProgressList format
          enrolledCourseIds = progressResponse.data.courseProgressList.map(
            (progress: any) => {
              return typeof progress.courseId === "object"
                ? progress.courseId._id ||
                    progress.courseId.id ||
                    progress.courseId
                : progress.courseId;
            }
          );
        } else if (
          progressResponse.data &&
          typeof progressResponse.data === "object"
        ) {
          // Single object format
          if (progressResponse.data.courseId) {
            enrolledCourseIds = [progressResponse.data.courseId];
          }
        }

        console.log("🔄 Refreshed enrolled courses:", enrolledCourseIds);
        setEnrolledCourses(enrolledCourseIds);
      } else if (progressResponse?.needsFallback) {
        // Use fallback method if bulk API fails
        console.log("🔄 Using fallback refresh method...");
        await checkIndividualCourseEnrollments(kidId as string, courses);
      }
    } catch (error) {
      console.error("Failed to refresh enrolled courses:", error);
    }
  };

  // Handle course enrollment
  const handleEnrollCourse = async (courseId: string) => {
    try {
      setEnrolling(courseId);
      const result = await enrollInCourse(kidId as string, courseId);

      if (result.success) {
        // Refresh enrolled courses from API to ensure accuracy
        await refreshEnrolledCourses();

        // Show success message
        if (result.message && result.message.includes("already enrolled")) {
          alert("Bạn đã đăng ký khóa học này rồi!");
        } else {
          alert("Đăng ký khóa học thành công!");
        }
      }
    } catch (error) {
      console.error("Failed to enroll in course:", error);
      alert("Đã xảy ra lỗi khi đăng ký khóa học. Vui lòng thử lại.");
    } finally {
      setEnrolling(null);
    }
  };

  // Check if user can access course
  const canAccessCourse = (course: Course) => {
    if (!course.isPremium) return true; // Free courses
    return isUserPremium; // Premium courses need premium account
  };

  // Get button text and action
  const getCourseButton = (course: Course) => {
    const isEnrolled = enrolledCourses.includes(course._id);
    const canAccess = canAccessCourse(course);
    const isEnrollingThis = enrolling === course._id;

    if (isEnrollingThis) {
      return {
        text: "Đang đăng ký...",
        action: () => {},
        disabled: true,
        variant: "secondary" as const,
      };
    }

    if (!canAccess) {
      return {
        text: "Nâng cấp Premium",
        action: () => {
          // Redirect to premium page
          window.location.href = `/parent/premium`;
        },
        disabled: false,
        variant: "premium" as const,
        icon: Lock,
      };
    }

    if (isEnrolled) {
      return {
        text: "Tiếp tục học",
        action: () => {
          window.location.href = `/environment-kid/kid-learning-zone/${kidId}/courses/${course._id}`;
        },
        disabled: false,
        variant: "success" as const,
        icon: CheckCircle,
      };
    }

    return {
      text: "Đăng ký học",
      action: () => handleEnrollCourse(course._id),
      disabled: false,
      variant: "default" as const,
    };
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">All Courses</h1>
            <p className="text-[#6b7280]">Explore our learning materials</p>
          </div>
          <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
            <Link href={`/environment-kid/kid-learning-zone/${kidId}/`}>
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card
              key={index}
              className="border-none shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">All Courses</h1>
            <p className="text-[#6b7280]">Explore our learning materials</p>
          </div>
          <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
            <Link href={`/environment-kid/kid-learning-zone/${kidId}/`}>
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#83d98c] hover:bg-[#6bc275]"
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">All Courses</h1>
          <p className="text-[#6b7280]">Explore our learning materials</p>
        </div>
        <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
          <Link href="/environment-kid/kid-learning-zone">
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Debug Info:</h3>
            <Button
              size="sm"
              onClick={refreshEnrolledCourses}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
            >
              🔄 Refresh Enrollments
            </Button>
          </div>
          <p>Kid ID: {kidId}</p>
          <p>Is Premium: {isUserPremium ? "Yes" : "No"}</p>
          <p>
            Enrolled Courses: {enrolledCourses.length} (
            {enrolledCourses.join(", ")})
          </p>
          <p>Total Courses: {courses.length}</p>
          <p>Premium Courses: {courses.filter((c) => c.isPremium).length}</p>
          <div className="mt-2 text-sm">
            <p>
              <strong>Course IDs & Images:</strong>
            </p>
            {courses.map((course) => (
              <div key={course._id} className="ml-2">
                • {course.title}: {course._id}
                {enrolledCourses.includes(course._id) && (
                  <span className="text-green-600"> ✓ Enrolled</span>
                )}
                {course.isPremium && (
                  <span className="text-orange-600"> 💎 Premium</span>
                )}
                <br />
                <span className="text-xs text-gray-500 ml-4">
                  📷 Image: {course.thumbnailUrl || "No image URL"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
        {courses.length > 0 ? (
          courses.map((course) => {
            const isNew =
              new Date(course.createdAt) >
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

            const isEnrolled = enrolledCourses.includes(course._id);
            const canAccess = canAccessCourse(course);
            const buttonConfig = getCourseButton(course);

            return (
              <Card
                key={course._id}
                className={`border-none shadow-sm overflow-hidden h-full ${
                  !canAccess ? "opacity-75" : ""
                }`}
              >
                <div className="h-48 bg-[#d9d9d9] relative">
                  <Image
                    src={
                      course.thumbnailUrl?.trim().replace(/`/g, "") ||
                      getDefaultCourseImage(course.title, course.category)
                    }
                    alt={course.title}
                    width={384}
                    height={192}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getDefaultCourseImage(
                        course.title,
                        course.category
                      );
                    }}
                  />
                  {isNew && (
                    <div className="absolute top-2 right-2 bg-[#83d98c] text-white px-2 py-1 rounded-full text-sm">
                      New
                    </div>
                  )}
                  {course.isPremium && (
                    <div className="absolute top-2 left-2 bg-[#f59e0b] text-white px-2 py-1 rounded-full text-sm">
                      Premium
                    </div>
                  )}
                  {isEnrolled && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                      Enrolled
                    </div>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>

                  {/* FIX: Rút gọn mô tả và cố định chiều cao */}
                  <div className="flex-1">
                    <p className="text-[#6b7280] text-sm mb-2 leading-relaxed line-clamp-3">
                      {truncateText(course.description, 3)}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <p className="text-[#83d98c] text-xs mb-4 font-medium">
                      {course.category} • {course.ageGroup}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center text-[#6b7280]">
                        <BookOpen size={16} className="mr-1" />
                        <span>Lessons</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                        <span>{course.pointsEarned} points</span>
                      </div>
                    </div>
                    {course.instructor && (
                      <p className="text-xs text-[#6b7280] mb-4">
                        Instructor: {course.instructor.fullName}
                      </p>
                    )}

                    {/* Dynamic Button */}
                    <Button
                      className={`w-full flex items-center justify-center gap-2 ${
                        buttonConfig.variant === "premium"
                          ? "bg-[#f59e0b] hover:bg-[#d97706]"
                          : buttonConfig.variant === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : buttonConfig.variant === "secondary"
                          ? "bg-gray-400 hover:bg-gray-500"
                          : "bg-[#83d98c] hover:bg-[#6bc275]"
                      }`}
                      onClick={buttonConfig.action}
                      disabled={buttonConfig.disabled}
                    >
                      {buttonConfig.icon && <buttonConfig.icon size={16} />}
                      {buttonConfig.text}
                    </Button>

                    {!canAccess && (
                      <p className="text-xs text-red-500 mt-2 text-center">
                        Cần tài khoản Premium để truy cập
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-[#6b7280]">
              Không có khóa học nào được tìm thấy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
