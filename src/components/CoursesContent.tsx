'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ArrowLeft, 
  Play,
  CheckCircle,
  Award,
  Target
} from "lucide-react"

interface Course {
  id: number
  title: string
  description: string
  lessons: number
  duration: string
  level: string
  color: string
  price: string
  rating: number
  students: number
  instructor: string
  objectives: string[]
  curriculum: { title: string; duration: string }[]
  features: string[]
}

const courses: Course[] = [
  {
    id: 1,
    title: "Kỹ năng giao tiếp",
    description: "Học cách giao tiếp hiệu quả và xây dựng mối quan hệ tốt với bạn bè và gia đình",
    lessons: 24,
    duration: "6 tuần",
    level: "Cơ bản",
    color: "from-blue-500 to-blue-600",
    price: "299.000đ",
    rating: 4.8,
    students: 1250,
    instructor: "Cô Minh Anh",
    objectives: [
      "Học cách bắt chuyện và duy trì cuộc trò chuyện",
      "Phát triển kỹ năng lắng nghe tích cực",
      "Hiểu và sử dụng ngôn ngữ cơ thể hiệu quả",
      "Xây dựng lòng tin trong giao tiếp"
    ],
    curriculum: [
      { title: "Giới thiệu về giao tiếp", duration: "30 phút" },
      { title: "Kỹ năng lắng nghe", duration: "45 phút" },
      { title: "Ngôn ngữ cơ thể", duration: "40 phút" },
      { title: "Giao tiếp trong gia đình", duration: "35 phút" },
      { title: "Giao tiếp với bạn bè", duration: "50 phút" }
    ],
    features: [
      "Video bài giảng tương tác",
      "Bài tập thực hành",
      "Trò chơi role-play",
      "Chứng chỉ hoàn thành"
    ]
  },
  {
    id: 2,
    title: "Quản lý cảm xúc",
    description: "Hiểu và kiểm soát cảm xúc của bản thân, phát triển trí tuệ cảm xúc",
    lessons: 18,
    duration: "4 tuần",
    level: "Trung bình",
    color: "from-purple-500 to-purple-600",
    price: "399.000đ",
    rating: 4.9,
    students: 980,
    instructor: "Thầy Đức Minh",
    objectives: [
      "Nhận biết và đặt tên cho các cảm xúc",
      "Học cách điều chỉnh cảm xúc tiêu cực",
      "Phát triển khả năng đồng cảm",
      "Xử lý stress và áp lực"
    ],
    curriculum: [
      { title: "Hiểu về cảm xúc", duration: "35 phút" },
      { title: "Nhận biết cảm xúc", duration: "40 phút" },
      { title: "Kỹ thuật thở và thư giãn", duration: "30 phút" },
      { title: "Xử lý cảm xúc tiêu cực", duration: "45 phút" }
    ],
    features: [
      "Bài tập thiền cho trẻ em",
      "Trò chơi nhận biết cảm xúc",
      "Nhật ký cảm xúc",
      "Hỗ trợ tâm lý 24/7"
    ]
  },
  {
    id: 3,
    title: "Tư duy sáng tạo",
    description: "Phát triển khả năng tư duy và giải quyết vấn đề một cách sáng tạo",
    lessons: 32,
    duration: "8 tuần",
    level: "Nâng cao",
    color: "from-green-500 to-green-600",
    price: "499.000đ",
    rating: 4.7,
    students: 750,
    instructor: "Cô Thu Hà",
    objectives: [
      "Phát triển tư duy phản biện",
      "Học các phương pháp brainstorming",
      "Giải quyết vấn đề sáng tạo",
      "Xây dựng dự án cá nhân"
    ],
    curriculum: [
      { title: "Giới thiệu tư duy sáng tạo", duration: "40 phút" },
      { title: "Kỹ thuật brainstorming", duration: "50 phút" },
      { title: "Giải quyết vấn đề", duration: "60 phút" },
      { title: "Dự án thực hành", duration: "90 phút" }
    ],
    features: [
      "Workshop thực hành",
      "Dự án cá nhân",
      "Mentoring 1-1",
      "Cộng đồng học tập"
    ]
  }
]

export default function CoursesContent() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  if (selectedCourse) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.5 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)}
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách khóa học
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className={`h-64 bg-gradient-to-r ${selectedCourse.color} rounded-2xl mb-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="text-sm font-medium mb-2">{selectedCourse.level}</div>
                  <h1 className="text-4xl font-bold mb-2">{selectedCourse.title}</h1>
                  <p className="text-lg opacity-90">{selectedCourse.description}</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <BookOpen className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-bold text-2xl">{selectedCourse.lessons}</div>
                  <div className="text-sm text-gray-600">Bài học</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="font-bold text-2xl">{selectedCourse.duration}</div>
                  <div className="text-sm text-gray-600">Thời gian</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-bold text-2xl">{selectedCourse.students}</div>
                  <div className="text-sm text-gray-600">Học viên</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-bold text-2xl">{selectedCourse.rating}</div>
                  <div className="text-sm text-gray-600">Đánh giá</div>
                </div>
              </div>

              {/* Course Objectives */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-[#10b981]" />
                    Mục tiêu khóa học
                  </h3>
                  <ul className="space-y-3">
                    {selectedCourse.objectives.map((objective, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-[#10b981]" />
                    Chương trình học
                  </h3>
                  <div className="space-y-4">
                    {selectedCourse.curriculum.map((lesson, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#10b981] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{lesson.duration}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-[#10b981]" />
                    Tính năng đặc biệt
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCourse.features.map((feature, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#10b981]/10 to-[#059669]/10 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-[#10b981]" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#10b981] mb-2">{selectedCourse.price}</div>
                    <div className="text-gray-600">Một lần thanh toán</div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] mb-4">
                    Đăng ký ngay
                  </Button>

                  <Button variant="outline" className="w-full mb-6">
                    <Play className="h-4 w-4 mr-2" />
                    Xem demo
                  </Button>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảng viên:</span>
                      <span className="font-medium">{selectedCourse.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cấp độ:</span>
                      <span className="font-medium">{selectedCourse.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-medium">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bài học:</span>
                      <span className="font-medium">{selectedCourse.lessons} bài</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{selectedCourse.rating}</span>
                      <span className="text-gray-600">({selectedCourse.students} đánh giá)</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedCourse.students} học viên đã tham gia
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Khóa học nổi bật
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Các khóa học được thiết kế khoa học, phù hợp với từng độ tuổi
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`h-48 bg-gradient-to-r ${course.color} relative`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-medium">{course.level}</div>
                    <div className="text-2xl font-bold">{course.title}</div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{course.price}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.lessons} bài học
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.students})</span>
                    </div>
                    <span className="text-sm text-gray-500">bởi {course.instructor}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] group-hover:from-[#059669] group-hover:to-[#047857] transition-all">
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}