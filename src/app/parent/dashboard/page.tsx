"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  TrendingUp,
  Star,
  Target,
  Users,
  Activity,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Brain,
  Palette,
  Calculator,
  UserCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AddChild } from "@/components/addchild";
import { getKidsByParentId, createKid } from "@/lib/api";

// Define interfaces for type safety
interface Kid {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  points: number;
  level: number;
  avatar: string;
  streak: {
    current: number;
    longest: number;
  };
  achievements: any[];
  createdAt: string;
  updatedAt: string;
}

interface ParentInfo {
  parentId: string;
  parentUserId: string;
  parentFullName: string;
  parentEmail: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    kids: Kid[];
    parentInfo: ParentInfo;
  };
}

export default function ParentDashboard() {
  const [children, setChildren] = useState<Kid[]>([]);
  const [parentInfo, setParentInfo] = useState<ParentInfo | null>(null);
  const [selectedChild, setSelectedChild] = useState<Kid | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get parent ID from localStorage
  const getParentId = () => {
    if (typeof window !== "undefined") {
      const parentData = localStorage.getItem("parentData");
      if (parentData) {
        try {
          const parsed = JSON.parse(parentData);
          // Lấy parentId từ structure của API response
          return parsed.data?.parentId || parsed.data?._id;
        } catch (error) {
          console.error("Error parsing parent data:", error);
          return null;
        }
      }
    }
    return null;
  };

  // Fetch kids data on component mount
  useEffect(() => {
    const fetchKidsData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const parentId = getParentId();

        if (!parentId) {
          throw new Error(
            "Không tìm thấy thông tin phụ huynh. Vui lòng đăng nhập lại."
          );
        }

        const response: ApiResponse = await getKidsByParentId(parentId);

        if (response.success) {
          setChildren(response.data.kids || []);
          setParentInfo(response.data.parentInfo);

          // Set first child as selected if available
          if (response.data.kids && response.data.kids.length > 0) {
            setSelectedChild(response.data.kids[0]);
          }
        } else {
          throw new Error(response.message || "Không thể tải dữ liệu con");
        }
      } catch (err) {
        console.error("Error fetching kids data:", err);
        setError(
          err instanceof Error ? err.message : "Không thể tải dữ liệu con"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchKidsData();
  }, []);

  // Handle adding new child
  const handleAddChild = async (childData: {
    name: string;
    dateOfBirth: string;
    gender: string;
  }) => {
    try {
      const parentId = getParentId();

      if (!parentId) {
        throw new Error("Không tìm thấy thông tin phụ huynh");
      }

      const kidData = {
        fullName: childData.name,
        dateOfBirth: childData.dateOfBirth,
        gender: childData.gender,
        parentId: parentId,
      };

      const response = await createKid(kidData);

      if (response.success) {
        // Refresh the kids list after successful creation
        const updatedResponse: ApiResponse = await getKidsByParentId(parentId);
        if (updatedResponse.success) {
          setChildren(updatedResponse.data.kids || []);

          // Select the newly created child if it's the first one
          if (
            !selectedChild &&
            updatedResponse.data.kids &&
            updatedResponse.data.kids.length > 0
          ) {
            setSelectedChild(
              updatedResponse.data.kids[updatedResponse.data.kids.length - 1]
            );
          }
        }
      } else {
        throw new Error(response.message || "Không thể tạo hồ sơ con");
      }
    } catch (err) {
      console.error("Error creating child:", err);
      setError(err instanceof Error ? err.message : "Không thể tạo hồ sơ con");
      throw err; // Re-throw to handle in AddChild component
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
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

  // Get grade based on age
  const getGradeFromAge = (age: number) => {
    if (age <= 5) return "Mẫu giáo";
    if (age <= 6) return "Lớp 1";
    if (age <= 7) return "Lớp 2";
    if (age <= 8) return "Lớp 3";
    if (age <= 9) return "Lớp 4";
    if (age <= 10) return "Lớp 5";
    return `Lớp ${age - 5}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center"
        >
          <div className="relative w-24 h-24">
            <Image
              src="/globe.svg"
              alt="DailyMates Logo"
              width={96}
              height={96}
              className="animate-pulse"
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-purple-600">
            Đang tải bảng điều khiển...
          </h2>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Có lỗi xảy ra
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        variants={itemVariants}
      >
        <div>
          <div className="flex items-center gap-3">
            <motion.div
              className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-2 shadow-lg"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/globe.svg"
                alt="DailyMates Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-0">
                Bảng điều khiển phụ huynh
              </h1>
              {parentInfo && (
                <p className="text-sm text-gray-500">
                  Chào mừng trở lại, {parentInfo.parentFullName}
                </p>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            Theo dõi tiến trình học tập và hoạt động của con bạn
          </p>
        </div>
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="flex items-center gap-2 shadow-sm border-purple-100"
            >
              <Bell className="h-4 w-4 text-purple-500" />
              Thông báo
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="flex items-center gap-2 shadow-sm border-purple-100"
            >
              <Settings className="h-4 w-4 text-purple-500" />
              Cài đặt
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="flex items-center gap-2 shadow-sm border-green-100 text-green-600 hover:bg-green-50"
              onClick={() => (window.location.href = "/environment-kid/login")}
            >
              <UserCircle className="h-4 w-4" />
              Kid Login
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AddChild onAddChild={handleAddChild} />
          </motion.div>
        </div>
      </motion.div>

      {/* Children Overview Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        {children.map((child) => {
          const age = calculateAge(child.dateOfBirth);
          const grade = getGradeFromAge(age);

          return (
            <motion.div
              key={child._id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedChild?._id === child._id
                  ? "ring-2 ring-purple-400 shadow-lg scale-105"
                  : "hover:shadow-md hover:scale-102"
              }`}
              onClick={() => setSelectedChild(child)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                      {child.avatar && child.avatar !== "img/default" ? (
                        <Image
                          src={child.avatar}
                          alt={child.fullName}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">
                          {child.fullName?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {child.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {age} tuổi • {grade}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">
                            {child.points || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">
                            Cấp {child.level || 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {/* Show message if no children */}
        {children.length === 0 && (
          <motion.div
            className="col-span-full text-center py-12"
            variants={itemVariants}
          >
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              Chưa có con nào được thêm
            </h3>
            <p className="text-gray-400 mb-4">
              Thêm con đầu tiên để bắt đầu theo dõi tiến trình học tập
            </p>
            <AddChild onAddChild={handleAddChild} />
          </motion.div>
        )}
      </motion.div>
      {selectedChild && (
        <motion.div variants={itemVariants}>
          <ChildDashboard child={selectedChild} />
        </motion.div>
      )}
      {/* Rest of the dashboard content... */}
    </motion.div>
  );
}

function ChildDashboard({ child }: { child: Kid }) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Child Overview */}
      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-lg bg-gradient-to-r from-white to-blue-50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 -mt-32 -mr-32 z-0"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={
                        child.avatar && child.avatar !== "img/default"
                          ? child.avatar
                          : "/avatar_default.png"
                      }
                      alt={child.fullName || "Avatar của học sinh"}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Star className="h-4 w-4 text-white" />
                  </motion.div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {child.fullName}
                  </h2>
                  <p className="text-gray-600 text-lg">Cấp độ {child.level}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Điểm: {child.points}
                  </p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        Khóa học
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                    <p className="text-sm text-gray-600">Đang học</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        Thời gian
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">0h</p>
                    <p className="text-sm text-gray-600">Tuần này</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Award className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        Thành tích
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {child.achievements}
                    </p>
                    <p className="text-sm text-gray-600">Đã đạt được</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <Card className="border-none shadow-lg h-full bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  Tiến trình học tập
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-100 text-purple-600 hover:bg-purple-50"
                  >
                    Xem tất cả
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-purple-100 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${course.bgColor}`}
                        >
                          {course.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {course.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          {course.progress}%
                        </p>
                        <p className="text-sm text-gray-600">
                          {course.completed}/{course.total} bài học
                        </p>
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`absolute top-0 left-0 h-full rounded-full ${course.progressColor}`}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-600">
                        Tiếp theo: {course.nextLesson}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 border-purple-100 text-purple-600 hover:bg-purple-50"
                        >
                          <PlayCircle className="h-4 w-4" />
                          Tiếp tục
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-lg h-full bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor} flex-shrink-0`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                      {activity.score && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-yellow-600">
                            {activity.score}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-purple-100 text-purple-600 hover:bg-purple-50"
                >
                  Xem tất cả hoạt động
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Teacher Communication */}
      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-10 -mt-32 -mr-32 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-10 -mb-32 -ml-32 z-0"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              Liên lạc với giáo viên
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="/avatar_default.png"
                      alt="Teacher"
                      width={64}
                      height={64}
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cô Sarah Johnson
                    </h3>
                    <p className="text-gray-600">Giáo viên Toán học</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        Đánh giá 4.9
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <motion.div
                    whileHover={{
                      x: 5,
                      backgroundColor: "rgba(243, 244, 246, 1)",
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                  >
                    <Mail className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">
                      sarah.johnson@example.com
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      x: 5,
                      backgroundColor: "rgba(243, 244, 246, 1)",
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">+1 234 567 890</span>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      x: 5,
                      backgroundColor: "rgba(243, 244, 246, 1)",
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                  >
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-700">
                      Giờ làm việc: Thứ 2-6, 14:00-16:00
                    </span>
                  </motion.div>
                </div>

                <div className="flex gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Gửi tin nhắn
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="border-purple-100 hover:bg-purple-50"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Tin nhắn mới nhất
                </h3>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Teacher"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed">
                        Alex đang học rất tốt môn toán! Em ấy đang tiến bộ rất
                        nhiều trong phép nhân và phép chia. Tôi khuyên nên luyện
                        tập thêm các bài toán có lời ở nhà để củng cố những kỹ
                        năng này.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Hôm qua, 15:45</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-100 hover:bg-purple-50"
                      >
                        Trả lời
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div
                  className="mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-purple-100 text-purple-600 hover:bg-purple-50"
                  >
                    Xem tất cả tin nhắn
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

const courses = [
  {
    title: "Toán học cho trẻ em",
    category: "Toán học",
    progress: 65,
    completed: 8,
    total: 12,
    nextLesson: "Phép chia cơ bản",
    bgColor: "bg-blue-100",
    progressColor: "bg-blue-500",
    icon: <Calculator className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Từ vựng tiếng Anh",
    category: "Ngôn ngữ",
    progress: 30,
    completed: 5,
    total: 18,
    nextLesson: "Tên các loài động vật",
    bgColor: "bg-green-100",
    progressColor: "bg-green-500",
    icon: <BookOpen className="h-5 w-5 text-green-600" />,
  },
  {
    title: "Thí nghiệm khoa học",
    category: "Khoa học",
    progress: 100,
    completed: 15,
    total: 15,
    nextLesson: "Khóa học đã hoàn thành!",
    bgColor: "bg-purple-100",
    progressColor: "bg-purple-500",
    icon: <Brain className="h-5 w-5 text-purple-600" />,
  },
  {
    title: "Nghệ thuật & Thủ công",
    category: "Nghệ thuật",
    progress: 0,
    completed: 0,
    total: 10,
    nextLesson: "Bắt đầu",
    bgColor: "bg-orange-100",
    progressColor: "bg-orange-500",
    icon: <Palette className="h-5 w-5 text-orange-600" />,
  },
];

const activities = [
  {
    title: "Hoàn thành bài học Toán số 5",
    time: "Hôm nay, 10:30",
    bgColor: "bg-blue-100",
    icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    score: "95%",
  },
  {
    title: "Đạt 95% bài kiểm tra Khoa học",
    time: "Hôm qua, 15:15",
    bgColor: "bg-green-100",
    icon: <TrendingUp className="h-5 w-5 text-green-600" />,
    score: "95%",
  },
  {
    title: "Bắt đầu khóa học Nghệ thuật & Thủ công",
    time: "2 ngày trước",
    bgColor: "bg-purple-100",
    icon: <PlayCircle className="h-5 w-5 text-purple-600" />,
  },
  {
    title: "Đạt được huy hiệu thành tích",
    time: "3 ngày trước",
    bgColor: "bg-yellow-100",
    icon: <Award className="h-5 w-5 text-yellow-600" />,
  },
];
