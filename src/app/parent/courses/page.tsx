"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  User,
  Filter,
  ChevronDown,
  Heart,
  Clock,
  PlayCircle,
  Star,
  Award,
  Lock,
  Crown,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllCourses, getLessonsByCourse } from "@/lib/api";
import {
  hasParentPremiumAccess,
  canAccessCourse,
  getPremiumStatusInfo,
  filterCoursesByAccess,
  redirectToPremiumUpgrade,
  checkCourseAccess,
} from "@/utils/premium";
import type { Course } from "@/utils/premium";

interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl?: string;
  order: number;
}

export default function ParentCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseLessons, setCourseLessons] = useState<{
    [key: string]: Lesson[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [premiumStatus, setPremiumStatus] = useState({
    isPremium: false,
    displayText: "Gói Miễn phí",
    isExpired: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [loadingLessons, setLoadingLessons] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch courses
        const response = await getAllCourses(1, 100);
        if (response.success && response.data) {
          setCourses(response.data.courses || []);
        }

        // Get premium status
        const status = getPremiumStatusInfo();
        setPremiumStatus({
          isPremium: status.isPremium,
          displayText: status.displayText,
          isExpired: status.isExpired,
        });
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(
          err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải khóa học"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || course.category === selectedCategory;
    const matchesAgeGroup =
      !selectedAgeGroup || course.ageGroup === selectedAgeGroup;

    return (
      matchesSearch && matchesCategory && matchesAgeGroup && course.isPublished
    );
  });

  // Get filtered courses by access
  const { accessibleCourses, restrictedCourses, freeCourses, premiumCourses } =
    filterCoursesByAccess(filteredCourses);

  // Get unique categories and age groups
  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );
  const ageGroups = Array.from(
    new Set(courses.map((course) => course.ageGroup))
  );

  // Fetch lessons for a course
  const fetchLessons = async (courseId: string) => {
    if (courseLessons[courseId]) {
      return; // Already loaded
    }

    try {
      setLoadingLessons((prev) => ({ ...prev, [courseId]: true }));
      const response = await getLessonsByCourse(courseId);
      if (response && response.lessons) {
        setCourseLessons((prev) => ({ ...prev, [courseId]: response.lessons }));
      }
    } catch (err) {
      console.error("Error fetching lessons:", err);
    } finally {
      setLoadingLessons((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  // Toggle course expansion
  const toggleCourseExpansion = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      fetchLessons(courseId);
    }
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePremiumUpgrade = () => {
    redirectToPremiumUpgrade();
  };

  const renderCourseCard = (course: Course, isRestricted = false) => {
    const courseAccess = canAccessCourse(course);

    return (
      <motion.div
        key={course._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card
          className={`border-none shadow-md hover:shadow-lg transition-all duration-300 h-full ${
            isRestricted ? "opacity-75" : ""
          }`}
        >
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image
              src={
                course.thumbnailUrl || `/placeholder.svg?height=192&width=320`
              }
              alt={course.title}
              width={320}
              height={192}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Premium Badge */}
            {course.isPremium && (
              <div className="absolute top-3 right-3">
                <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  Premium
                </div>
              </div>
            )}

            {/* Lock overlay for restricted courses */}
            {isRestricted && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            )}

            {/* Course Category */}
            <div className="absolute top-3 left-3">
              <div className="bg-[#8b5cf6] text-white px-2 py-1 rounded-full text-xs font-medium">
                {course.category}
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-[#f59e0b]">
                <Star className="h-4 w-4 fill-[#f59e0b]" />
                <span className="text-sm ml-1">4.8</span>
              </div>
              <div className="text-[#6b7280] text-sm flex items-center">
                <User className="h-4 w-4 mr-1" />
                Độ tuổi {course.ageGroup}
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#8b5cf6] transition-colors">
              {course.title}
            </h3>

            <p className="text-[#6b7280] text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-sm text-[#6b7280]">
                <Clock className="h-4 w-4 mr-1" />
                <span>Nhiều bài học</span>
              </div>
              <div className="flex items-center text-sm text-[#8b5cf6] font-medium">
                <Award className="h-4 w-4 mr-1" />
                <span>{course.pointsEarned} điểm</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-bold text-lg text-[#1e1e1e]">
                {course.isPremium ? (
                  courseAccess ? (
                    <span className="text-[#10b981] flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Có quyền truy cập
                    </span>
                  ) : (
                    <span className="text-[#f59e0b] flex items-center gap-1">
                      <Lock className="h-4 w-4" />
                      Cần Premium
                    </span>
                  )
                ) : (
                  <span className="text-[#10b981]">Miễn phí</span>
                )}
              </div>

              {courseAccess ? (
                <Link href={`/parent/courses/${course._id}`}>
                  <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full flex items-center gap-2">
                    <span>Xem chi tiết</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handlePremiumUpgrade}
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-black rounded-full flex items-center gap-2"
                >
                  <Crown className="h-4 w-4" />
                  <span>Nâng cấp</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5cf6] mx-auto mb-4"></div>
          <p className="text-[#6b7280]">Đang tải khóa học...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#8b5cf6] hover:bg-[#7c3aed]"
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <header
        className={`sticky top-0 z-10 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1e1e1e] flex items-center">
            <span className="text-[#8b5cf6] mr-2">Kid</span>Learning
          </h1>
          <div className="flex items-center gap-4">
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full">
              Khóa học đã mua
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Khám phá niềm vui học tập
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/90 text-lg mb-6"
              >
                Các khóa học tương tác được thiết kế để làm cho việc giáo dục
                trở nên thú vị và hấp dẫn cho trẻ em ở mọi lứa tuổi
              </motion.p>

              <div className="relative max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Tìm kiếm khóa học..."
                  className="pl-10 py-6 rounded-full bg-white/90 backdrop-blur-sm border-none text-[#1e1e1e] placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 flex justify-center"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90e6a6a92f94"
                alt="Kids learning"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280] h-5 w-5" />
              <Input
                placeholder="Tìm kiếm khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#e5e7eb] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="border-[#e5e7eb] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả danh mục</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedAgeGroup}
              onValueChange={setSelectedAgeGroup}
            >
              <SelectTrigger className="border-[#e5e7eb] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]">
                <User className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Chọn độ tuổi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả độ tuổi</SelectItem>
                {ageGroups.map((ageGroup) => (
                  <SelectItem key={ageGroup} value={ageGroup}>
                    {ageGroup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedAgeGroup("");
              }}
              variant="outline"
              className="border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white"
            >
              Xóa bộ lọc
            </Button>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-none shadow-md">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-[#8b5cf6] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#1e1e1e]">
                {filteredCourses.length}
              </div>
              <div className="text-[#6b7280]">Tổng khóa học</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-[#10b981] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#1e1e1e]">
                {freeCourses.length}
              </div>
              <div className="text-[#6b7280]">Khóa học miễn phí</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6 text-center">
              <Crown className="h-8 w-8 text-[#FFD700] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#1e1e1e]">
                {premiumCourses.length}
              </div>
              <div className="text-[#6b7280]">Khóa học Premium</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-[#8b5cf6] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#1e1e1e]">
                {accessibleCourses.length}
              </div>
              <div className="text-[#6b7280]">Có thể truy cập</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accessible Courses */}
        {accessibleCourses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-[#1e1e1e] mb-6 flex items-center gap-3">
              <CheckCircle className="h-7 w-7 text-[#10b981]" />
              Khóa học có thể truy cập
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessibleCourses.map((course) => renderCourseCard(course))}
            </div>
          </motion.section>
        )}

        {/* Restricted Courses */}
        {restrictedCourses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between text-black">
                <div className="flex items-center gap-3">
                  <Crown className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Khóa học Premium</h2>
                    <p className="text-black/80">
                      Nâng cấp để truy cập toàn bộ khóa học
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handlePremiumUpgrade}
                  className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-2"
                >
                  Nâng cấp ngay
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restrictedCourses.map((course) =>
                renderCourseCard(course, true)
              )}
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-16"
          >
            <BookOpen className="h-16 w-16 text-[#6b7280] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1e1e1e] mb-2">
              Không tìm thấy khóa học nào
            </h3>
            <p className="text-[#6b7280] mb-6">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedAgeGroup("");
              }}
              className="bg-[#8b5cf6] hover:bg-[#7c3aed]"
            >
              Xóa bộ lọc
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
