"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Star, Trophy } from "lucide-react"
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#83d98c] mx-auto mb-4"></div>
          <p className="text-[#6b7280]">Đang tải...</p>
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#83d98c] rounded-full flex items-center justify-center">
            <Image
              src={kid?.avatar ? `/avatars/${kid.avatar}.png` : "/placeholder.svg?height=48&width=48"}
              alt="Avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Chào {kid?.fullName || 'bạn nhỏ'}! 👋</h1>
            <p className="text-[#6b7280]">Hôm nay bạn muốn học gì?</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="bg-[#ebfdf4] text-[#10b981] px-2 py-1 rounded-full">
                Level {kid?.level || 1}
              </span>
              <span className="bg-[#fef3c7] text-[#d97706] px-2 py-1 rounded-full">
                {kid?.points || 0} điểm
              </span>
              <span className="bg-[#e0f2fe] text-[#0369a1] px-2 py-1 rounded-full">
                Streak: {kid?.streak?.current || 0} ngày
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Kid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#10b981]">{kid?.points || 0}</div>
            <div className="text-sm text-[#6b7280]">Tổng điểm</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#f59e0b]">{kid?.streak?.current || 0}</div>
            <div className="text-sm text-[#6b7280]">Streak hiện tại</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#8b5cf6]">{kid?.achievements?.length || 0}</div>
            <div className="text-sm text-[#6b7280]">Thành tích</div>
          </CardContent>
        </Card>
      </div>

      {/* Reward Display */}
      <RewardDisplay />

      {/* Continue Learning */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="h-40 bg-[#d9d9d9] relative">
            <Image
              src="/placeholder.svg?height=160&width=640"
              alt="Course thumbnail"
              width={640}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Problem Solving for Kids</h3>
            <div className="flex items-center text-sm text-[#6b7280] mb-3">
              <Clock size={16} className="mr-1" />
              <span>Lesson 3: Finding Solutions</span>
            </div>
            <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
              <div className="bg-[#83d98c] h-2 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-[#6b7280]">Progress</span>
              <span className="font-medium">65%</span>
            </div>
            <Button className="w-full mt-4 bg-[#83d98c] hover:bg-[#6bc275]">
              <Link href="/environment-kid/kid-learning-zone/courses/1/lessons/3">Continue</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {kidCourses.map((course, index) => (
            <Card key={index} className="border-none shadow-sm overflow-hidden">
              <div className="h-32 bg-[#d9d9d9] relative">
                <Image
                  src={`/placeholder.svg?height=128&width=256`}
                  alt={course.title}
                  width={256}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center text-[#6b7280]">
                    <BookOpen size={16} className="mr-1" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                    <span>{course.stars} stars</span>
                  </div>
                </div>
                <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
                  <div className="bg-[#83d98c] h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
                <Button className="w-full mt-4 bg-[#83d98c] hover:bg-[#6bc275]">
                  <Link href={`/environment-kid/kid-learning-zone/courses/${course.id}`}>Play</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Challenge */}
      <div>
        <h2 className="text-xl font-bold mb-4">Daily Challenge</h2>
        <Card className="border-none shadow-sm overflow-hidden bg-gradient-to-r from-[#83d98c] to-[#6bc275] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Problem Solving Challenge</h3>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                <span>5 stars</span>
              </div>
            </div>
            <p className="mb-4">Complete today's problem-solving puzzle and earn extra stars!</p>
            <Button className="bg-white text-[#83d98c] hover:bg-white/90">
              <Link href="/environment-kid/kid-learning-zone/challenges/daily">Start Challenge</Link>
            </Button>
          </CardContent>
        </Card>
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
