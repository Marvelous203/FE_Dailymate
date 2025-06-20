'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, User, Filter, ChevronDown, Heart, Clock, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllCourses, getLessonsByCourse } from "@/lib/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  ageGroup: string;
  thumbnailUrl?: string;
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
  // Add these optional properties if needed
  level?: string;
  duration?: number;
  price?: number;
  imageUrl?: string;
}

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
  const [courseLessons, setCourseLessons] = useState<{ [key: string]: Lesson[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [loadingLessons, setLoadingLessons] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        setLoading(true);
        
        // Fetch courses
        const coursesResponse = await getAllCourses(1, 50);
        
        let coursesData = [];
        if (coursesResponse?.data?.courses) {
          coursesData = coursesResponse.data.courses;
        } else if (coursesResponse?.courses) {
          coursesData = coursesResponse.courses;
        }
        
        const publishedCourses = coursesData.filter((course: Course) => course.isPublished);
        setCourses(publishedCourses);
        setFilteredCourses(publishedCourses);
        
        // Fetch lessons for all courses concurrently
        if (publishedCourses.length > 0) {
          const lessonsPromises = publishedCourses.map((course: Course) => 
            getLessonsByCourse(course._id)
              .then(response => ({
                courseId: course._id,
                lessons: response?.lessons || response?.data?.lessons || []
              }))
              .catch(err => {
                console.error(`Error fetching lessons for course ${course._id}:`, err);
                return { courseId: course._id, lessons: [] };
              })
          );
          
          const lessonsResults = await Promise.all(lessonsPromises);
          
          const lessonsMap = lessonsResults.reduce((acc, { courseId, lessons }) => {
            acc[courseId] = lessons;
            return acc;
          }, {} as { [key: string]: Lesson[] });
          
          setCourseLessons(lessonsMap);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Không thể tải danh sách khóa học');
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, []);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        console.log('Fetching courses...');
        const response = await getAllCourses(1, 50);
        console.log('API Response:', response);
        
        // Fix: Handle the correct API response structure and filter published courses
        let coursesData = [];
        if (response && response.data && response.data.courses) {
          coursesData = response.data.courses;
        } else if (response && response.courses) {
          coursesData = response.courses;
        } else if (response && Array.isArray(response)) {
          coursesData = response;
        }
        
        // Filter only published courses
        const publishedCourses = coursesData.filter((course: Course) => course.isPublished === true);
        
        console.log('Courses data:', coursesData);
        console.log('Published courses:', publishedCourses);
        console.log('Number of published courses:', publishedCourses.length);
        
        setCourses(publishedCourses);
        setFilteredCourses(publishedCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Không thể tải danh sách khóa học');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  // Handle category filter
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredCourses(courses.filter(course => 
        searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredCourses(courses.filter(course => 
        course.category.toLowerCase() === selectedCategory.toLowerCase() &&
        (searchQuery === "" || 
         course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         course.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
    }
  }, [selectedCategory, courses, searchQuery]);

  // Fetch lessons for a course
  const fetchLessons = async (courseId: string) => {
    if (courseLessons[courseId]) {
      return; // Already loaded
    }

    try {
      setLoadingLessons(prev => ({ ...prev, [courseId]: true }));
      const response = await getLessonsByCourse(courseId);
      if (response && response.lessons) {
        setCourseLessons(prev => ({ ...prev, [courseId]: response.lessons }));
      }
    } catch (err) {
      console.error('Error fetching lessons:', err);
    } finally {
      setLoadingLessons(prev => ({ ...prev, [courseId]: false }));
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

  // Get unique categories from courses
  const categories = Array.from(new Set(courses.map(course => course.category)));

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
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <header className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}>
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
                Các khóa học tương tác được thiết kế để làm cho việc giáo dục trở nên thú vị và hấp dẫn cho trẻ em ở mọi lứa tuổi
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
                  onChange={handleSearch}
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
        {/* Course Categories */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1e1e1e] border-l-4 border-[#8b5cf6] pl-3">
              Danh sách khóa học ({filteredCourses.length})
            </h2>
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <Filter size={16} className="text-[#8b5cf6]" />
              <span className="text-sm">Lọc</span>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="mb-8"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="bg-white rounded-full p-1 shadow-sm w-fit">
                <TabsTrigger value="all" className="rounded-full">Tất cả khóa học</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category.toLowerCase()} className="rounded-full">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CourseCard 
                      course={course} 
                      isExpanded={expandedCourse === course._id}
                      onToggleExpansion={() => toggleCourseExpansion(course._id)}
                      lessons={courseLessons[course._id] || []}
                      loadingLessons={loadingLessons[course._id] || false}
                    />
                  </motion.div>
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#6b7280] text-lg">Không tìm thấy khóa học nào phù hợp</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}

function CourseCard({ 
  course, 
  isExpanded, 
  onToggleExpansion, 
  lessons, 
  loadingLessons 
}: { 
  course: Course;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  lessons: Lesson[];
  loadingLessons: boolean;
}) {
  return (
    <Card className="border-none rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-all duration-300">
      <div className="h-44 relative overflow-hidden">
        <Image
          src={course.thumbnailUrl || `/placeholder.svg?height=176&width=352`}
          alt={course.title}
          width={352}
          height={176}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <button className="absolute top-3 right-3 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors">
          <Heart className="h-4 w-4 text-white" />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-white text-xs font-medium">{course.level}</span>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#f0e5fc] px-2 py-1 rounded-full text-xs text-[#8b5cf6] font-medium">
            {course.category}
          </div>
          <div className="text-[#6b7280] text-xs flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {course.duration}h
          </div>
        </div>
        
        <h3 className="font-semibold mb-3 hover:text-[#8b5cf6] transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-[#4b5563] mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-xs text-[#6b7280]">
            <User size={14} className="mr-1" />
            <span>{course.instructor?.fullName || 'Không xác định'}</span>
          </div>
          <div className="font-bold text-[#8b5cf6]">
            {course.isPremium ? 'Premium' : 'Free'}
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={onToggleExpansion}
            variant="outline" 
            className="w-full rounded-full hover:bg-[#8b5cf6] hover:text-white transition-colors"
          >
            {isExpanded ? 'Ẩn bài học' : 'Xem bài học'}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
          
          <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full">
            <Link href={`/parent/courses/${course._id}`}>Xem chi tiết</Link>
          </Button>
        </div>
        
        {/* Lessons List */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <h4 className="font-semibold text-sm mb-3 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-[#8b5cf6]" />
              Danh sách bài học
            </h4>
            
            {loadingLessons ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#8b5cf6]"></div>
              </div>
            ) : lessons.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {lessons.map((lesson, index) => (
                  <div key={lesson._id} className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center text-xs font-medium mr-3">
                      {lesson.order || index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{lesson.title}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration} phút
                        {lesson.videoUrl && (
                          <>
                            <PlayCircle className="h-3 w-3 ml-2 mr-1" />
                            Video
                          </>
                        )}
                      </div>
                    </div>
                    <Link 
                      href={`/parent/courses/${course._id}/lessons/${lesson._id}`}
                      className="flex-shrink-0 text-[#8b5cf6] hover:text-[#7c3aed] transition-colors"
                    >
                      <PlayCircle className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Chưa có bài học nào</p>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
