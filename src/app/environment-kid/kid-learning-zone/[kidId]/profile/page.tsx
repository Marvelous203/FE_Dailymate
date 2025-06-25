"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Calendar,
  Award,
  Star,
  Trophy,
  BookOpen,
  Target,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  updateKid,
  getKidById,
  getAllCourseProgressByKidId,
  getAllCourses,
} from "@/lib/api";
import { kidLocalStorage } from "@/utils/kidProgress";
import { useParams } from "next/navigation";

// Add proper TypeScript interfaces
interface KidData {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "";
  avatar: string;
  level?: number;
  points?: number;
  streak?: {
    current: number;
    longest: number;
  };
  achievements?: {
    _id: string;
    name: string;
    description: string;
    points: number;
  }[];
  userId?: string;
}

interface KidResponse {
  data: KidData;
}

interface KidForm {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  avatar: string;
}

export default function KidProfilePage() {
  const params = useParams();
  const kidId = params.kidId as string;

  const [kidData, setKidData] = useState<KidResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [kidForm, setKidForm] = useState<KidForm>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    avatar: "",
  });

  // Learning progress states
  const [learningProgress, setLearningProgress] = useState({
    completedCourses: 0,
    totalCourses: 0,
    completedCoursesPercentage: 0,
  });

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth: string): number | string => {
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

  // Load learning progress data
  const loadLearningProgress = useCallback(async () => {
    try {
      if (!kidId) return;

      // Fetch all courses and kid's progress in parallel
      const [coursesResponse, progressResponse] = await Promise.all([
        getAllCourses(1, 100), // Get all courses
        getAllCourseProgressByKidId(kidId),
      ]);

      let totalCourses = 0;
      let completedCourses = 0;

      // Handle courses data
      if (coursesResponse && coursesResponse.success && coursesResponse.data) {
        const courses = Array.isArray(coursesResponse.data)
          ? coursesResponse.data
          : coursesResponse.data.courses || [];

        const publishedCourses = courses.filter(
          (course: any) => course.isPublished
        );
        totalCourses = publishedCourses.length;
      }

      // Handle progress data
      if (progressResponse && progressResponse.success) {
        console.log("🔍 Progress Response:", progressResponse);

        let progressList: any[] = [];
        if (Array.isArray(progressResponse.data)) {
          progressList = progressResponse.data;
        } else if (progressResponse.data?.courseProgressList) {
          progressList = progressResponse.data.courseProgressList;
        }

        console.log("📊 Progress List:", progressList);

        // Count completed courses
        progressList.forEach((progress: any) => {
          const courseId =
            typeof progress.courseId === "object"
              ? progress.courseId._id ||
                progress.courseId.id ||
                progress.courseId
              : progress.courseId;

          console.log("🔍 Checking progress:", {
            courseId: courseId,
            status: progress.status,
            statusType: typeof progress.status,
          });

          let isCompleted = false;

          // Check API status first
          if (progress.status === true) {
            isCompleted = true;
            console.log("✅ Course completed via API status");
          } else {
            // Fallback: check localStorage overall progress using utility function
            const storedProgress = kidLocalStorage.getCourseOverallProgress(
              kidId,
              courseId
            );
            if (storedProgress === 100) {
              isCompleted = true;
              console.log("✅ Course completed via utility function");
            }
          }

          if (isCompleted) {
            completedCourses++;
            console.log("✅ Found completed course, total:", completedCourses);
          }
        });
      }

      const completedCoursesPercentage =
        totalCourses > 0
          ? Math.round((completedCourses / totalCourses) * 100)
          : 0;

      setLearningProgress({
        completedCourses,
        totalCourses,
        completedCoursesPercentage,
      });

      console.log("📊 Learning Progress Updated:", {
        completedCourses,
        totalCourses,
        completedCoursesPercentage,
      });
    } catch (error) {
      console.error("Error loading learning progress:", error);
    }
  }, [kidId]);

  // Fix useEffect dependency with useCallback
  const loadKidData = useCallback(async () => {
    try {
      // Load from localStorage first
      const storedKidData = localStorage.getItem("kidData");
      if (storedKidData) {
        const parsedData = JSON.parse(storedKidData) as KidResponse;
        setKidData(parsedData);

        // Then fetch fresh data from API if kidId is available
        if (kidId) {
          const response = await getKidById(kidId);
          if (response.success) {
            const updatedData: KidResponse = { data: response.data };
            setKidData(updatedData);
            localStorage.setItem("kidData", JSON.stringify(updatedData));

            setKidForm({
              fullName: response.data.fullName || "",
              dateOfBirth: response.data.dateOfBirth || "",
              gender: response.data.gender || "",
              avatar: response.data.avatar || "",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error loading kid data:", error);
      toast.error("Có lỗi khi tải thông tin");
    } finally {
      setLoading(false);
    }
  }, [kidId]); // Add kidId as dependency

  const handleUpdateKid = async () => {
    try {
      if (!kidId) {
        toast.error("Không tìm thấy ID của bé");
        return;
      }

      const updateData: Partial<KidData> = {};
      const currentKid = kidData?.data;

      if (kidForm.fullName !== currentKid?.fullName) {
        updateData.fullName = kidForm.fullName;
      }
      if (kidForm.dateOfBirth !== currentKid?.dateOfBirth) {
        updateData.dateOfBirth = kidForm.dateOfBirth;
      }
      if (kidForm.gender !== currentKid?.gender) {
        updateData.gender = kidForm.gender as "male" | "female" | "";
      }
      if (kidForm.avatar !== currentKid?.avatar) {
        updateData.avatar = kidForm.avatar;
      }

      if (Object.keys(updateData).length === 0) {
        toast.info("Không có thay đổi nào để cập nhật");
        setEditing(false);
        return;
      }

      const response = await updateKid(kidId, updateData);
      if (response.success) {
        await loadKidData(); // Reload data
        setEditing(false);
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      console.error("Error updating kid:", error);
      toast.error("Có lỗi khi cập nhật thông tin");
    }
  };

  // Fix useEffect with proper dependency
  useEffect(() => {
    loadKidData();
    loadLearningProgress();
  }, [loadKidData, loadLearningProgress]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#83d98c] mx-auto mb-4"></div>
          <p className="text-[#6b7280]">Đang tải...</p>
        </div>
      </div>
    );
  }

  const kid = kidData?.data;
  // Remove unused user variable
  // const user = kid?.userId;

  return (
    <div className="space-y-6">
      <Toaster />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">
          Hồ sơ của {kid?.fullName || "bé"}
        </h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setEditing(!editing)}
        >
          {editing ? <X size={16} /> : <Edit size={16} />}
          {editing ? "Hủy" : "Chỉnh sửa"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#d9d9d9] mb-4 border-4 border-[#83d98c]">
                <Image
                  src={kid?.avatar || "/placeholder.svg?height=96&width=96"}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              {editing ? (
                <div className="w-full space-y-4">
                  <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                      id="fullName"
                      value={kidForm.fullName}
                      onChange={(e) =>
                        setKidForm({ ...kidForm, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={kidForm.dateOfBirth}
                      onChange={(e) =>
                        setKidForm({ ...kidForm, dateOfBirth: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Giới tính</Label>
                    <select
                      id="gender"
                      value={kidForm.gender}
                      onChange={(e) =>
                        setKidForm({ ...kidForm, gender: e.target.value })
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>
                  <Button onClick={handleUpdateKid} className="w-full">
                    <Save size={16} className="mr-2" />
                    Lưu thay đổi
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-center mb-2">
                    {" "}
                    Tên em là {kid?.fullName || "Tên bé"}
                  </h2>
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-[#83d98c]" />
                      <span>
                        Tuổi: {calculateAge(kid?.dateOfBirth || "")} tuổi
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <User className="h-4 w-4 text-[#83d98c]" />
                      <span>
                        Giới tính:{" "}
                        {kid?.gender === "male"
                          ? "Nam"
                          : kid?.gender === "female"
                          ? "Nữ"
                          : "Chưa xác định"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-[#83d98c]" />
                      <span>
                        Ngày sinh:{" "}
                        {kid?.dateOfBirth
                          ? new Date(kid.dateOfBirth).toLocaleDateString(
                              "vi-VN"
                            )
                          : "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats and Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#10b981] mb-1">
                  {kid?.level || 1}
                </div>
                <div className="text-sm text-[#6b7280]">Level</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#f59e0b] mb-1">
                  {kid?.points || 0}
                </div>
                <div className="text-sm text-[#6b7280]">Điểm</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#3b82f6] mb-1">
                  {kid?.streak?.current || 0}
                </div>
                <div className="text-sm text-[#6b7280]">Streak</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#8b5cf6] mb-1">
                  {kid?.achievements?.length || 0}
                </div>
                <div className="text-sm text-[#6b7280]">Thành tích</div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Progress */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#83d98c]" />
                Tiến độ học tập
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6b7280]">
                    Khóa học đã hoàn thành
                  </span>
                  <span className="font-medium">
                    {learningProgress.completedCourses}/
                    {learningProgress.totalCourses}
                  </span>
                </div>
                <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
                  <div
                    className="bg-[#83d98c] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${learningProgress.completedCoursesPercentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#f59e0b]" />
                Thành tích gần đây
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#fef3c7] rounded-lg">
                  <Award className="h-6 w-6 text-[#f59e0b]" />
                  <div>
                    <p className="font-medium text-sm">
                      Hoàn thành khóa học đầu tiên
                    </p>
                    <p className="text-xs text-[#6b7280]">2 ngày trước</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#ebfdf4] rounded-lg">
                  <Star className="h-6 w-6 text-[#10b981]" />
                  <div>
                    <p className="font-medium text-sm">Đạt 100 điểm</p>
                    <p className="text-xs text-[#6b7280]">1 tuần trước</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#e0f2fe] rounded-lg">
                  <Target className="h-6 w-6 text-[#0369a1]" />
                  <div>
                    <p className="font-medium text-sm">Streak 7 ngày</p>
                    <p className="text-xs text-[#6b7280]">2 tuần trước</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Remove unused user variable
// const [user, setUser] = useState(null); // Remove if not used
