"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Star, Trophy, User, Calendar, Award, Target, Zap } from "lucide-react"
import { RewardDisplay } from "@/components/rewards/RewardDisplay"
import { useState, useEffect } from "react"

export default function KidLearningZonePage() {
  const [kidData, setKidData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load kid data from localStorage
    const storedKidData = localStorage.getItem('kidData')
    if (storedKidData) {
      try {
        const parsedData = JSON.parse(storedKidData)
        setKidData(parsedData)
      } catch (error) {
        console.error('Error parsing kid data:', error)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-400 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Đang tải thông tin bé...</p>
        </div>
      </div>
    )
  }

  const kid = kidData?.data
  const user = kid?.userId

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 'N/A'
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
            Chào mừng trở lại! 🌟
          </h1>
          <p className="text-gray-600 text-lg">Hãy tiếp tục hành trình học tập thú vị của bé nhé!</p>
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
                    alt={kid?.fullName || 'Kid Profile'}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/avatar_default.png"
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
                  {kid?.fullName || 'Tên bé'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-3 bg-white/20 rounded-lg p-3">
                    <Calendar size={20} className="text-yellow-300" />
                    <span className="font-medium">Tuổi: {calculateAge(kid?.dateOfBirth)} tuổi</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-3 bg-white/20 rounded-lg p-3">
                    <User size={20} className="text-yellow-300" />
                    <span className="font-medium">Giới tính: {kid?.gender === 'male' ? 'Nam' : kid?.gender === 'female' ? 'Nữ' : 'Chưa xác định'}</span>
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
              <div className="text-3xl font-bold text-green-600 mb-2">{kid?.points || 0}</div>
              <div className="text-gray-600 font-medium">Tổng điểm</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{kid?.streak?.current || 0}</div>
              <div className="text-gray-600 font-medium">Streak hiện tại</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{kid?.achievements?.length || 0}</div>
              <div className="text-gray-600 font-medium">Thành tích</div>
            </CardContent>
          </Card>
        </div>

        {/* Reward Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <RewardDisplay />
        </div>

        {/* Continue Learning - Enhanced */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            Tiếp tục học tập
          </h2>
          <Card className="border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Problem Solving for Kids</h3>
                <div className="flex items-center gap-2 text-white/90">
                  <Clock size={16} />
                  <span>Lesson 3: Finding Solutions</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-medium">Tiến độ học tập</span>
                  <span className="font-bold text-blue-600">65%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500" style={{ width: "65%" }}></div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/environment-kid/kid-learning-zone/courses/1/lessons/3" className="flex items-center justify-center gap-2">
                  Tiếp tục học
                  <BookOpen size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Courses - Enhanced Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            Khóa học của bé
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kidCourses.map((course, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-700">{course.stars}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center text-gray-600 gap-1">
                      <BookOpen size={16} />
                      <span>{course.lessons} bài học</span>
                    </div>
                    <div className="text-green-600 font-bold">
                      {course.progress}% hoàn thành
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mb-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <Link href={`/environment-kid/kid-learning-zone/courses/${course.id}`} className="flex items-center justify-center gap-2">
                      Chơi ngay
                      <Star size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                    <h3 className="text-2xl font-bold">Thử thách giải quyết vấn đề</h3>
                  </div>
                  <p className="text-lg mb-6 text-white/90">Hoàn thành câu đố hôm nay và nhận thêm sao vàng!</p>
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
                    <Link href="/environment-kid/kid-learning-zone/challenges/daily" className="flex items-center gap-3">
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
  )
}

const kidCourses = [
  {
    id: 1,
    title: "Problem Solving for Kids",
    lessons: 12,
    stars: 45,
    progress: 65,
  },
  {
    id: 2,
    title: "Emotional Intelligence",
    lessons: 18,
    stars: 32,
    progress: 30,
  },
  {
    id: 3,
    title: "Communication Skills",
    lessons: 15,
    stars: 50,
    progress: 100,
  },
]