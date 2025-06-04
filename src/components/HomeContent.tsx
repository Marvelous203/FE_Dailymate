'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  BookOpen, 
  Trophy, 
  Star, 
  ArrowRight, 
  Play, 
  Sparkles,
  Heart
} from "lucide-react"
import AboutContent from "./AboutContent"

export default function HomeContent() {
  return (
    <div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#10b981]/10 to-[#059669]/10 border border-[#10b981]/20 rounded-full px-4 py-2"
                >
                  <Sparkles className="h-4 w-4 text-[#10b981]" />
                  <span className="text-sm font-medium text-[#10b981]">Nền tảng giáo dục #1 Việt Nam</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Kỹ năng sống
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#10b981] to-[#059669] bg-clip-text text-transparent">
                    cho trẻ em
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Giúp con bạn phát triển những kỹ năng thiết yếu trong cuộc sống thông qua 
                  các trải nghiệm học tập tương tác được thiết kế bởi các chuyên gia giáo dục.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-8 py-4 text-lg" asChild>
                    <Link href="/login" className="flex items-center gap-2">
                      Bắt đầu ngay
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2" asChild>
                    <Link href="/environment-kid/login" className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Khu vực trẻ em
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#10b981]">50K+</div>
                  <div className="text-sm text-gray-600">Học sinh</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#10b981]">1000+</div>
                  <div className="text-sm text-gray-600">Bài học</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#10b981]">98%</div>
                  <div className="text-sm text-gray-600">Hài lòng</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-16 w-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Học tập tương tác</h3>
                      <p className="text-gray-600">Trải nghiệm học tập thú vị</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <Heart className="h-8 w-8 text-red-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "50,000+", label: "Học sinh đang học" },
              { icon: BookOpen, number: "1,000+", label: "Bài học chất lượng" },
              { icon: Trophy, number: "500+", label: "Giải thưởng đạt được" },
              { icon: Star, number: "4.9/5", label: "Đánh giá từ phụ huynh" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>

  <AboutContent />
  </div>
  )
}