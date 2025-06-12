'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  GamepadIcon,
  BarChart3,
  Brain,
  Users,
  Shield,
  Smartphone,
  Award,
  Clock
} from "lucide-react"

export default function FeaturesContent() {
  const features = [
    {
      icon: BookOpen,
      title: "Bài học tương tác",
      description: "Học thông qua trò chơi và hoạt động thú vị, giúp trẻ hứng thú và tập trung cao",
      color: "text-blue-500",
      bgColor: "bg-blue-100"
    },
    {
      icon: GamepadIcon,
      title: "Trò chơi giáo dục",
      description: "Củng cố kiến thức qua các mini-game hấp dẫn được thiết kế phù hợp với lứa tuổi",
      color: "text-purple-500",
      bgColor: "bg-purple-100"
    },
    {
      icon: BarChart3,
      title: "Theo dõi tiến độ",
      description: "Báo cáo chi tiết về quá trình học tập và phát triển kỹ năng của trẻ",
      color: "text-green-500",
      bgColor: "bg-green-100"
    },
    {
      icon: Brain,
      title: "AI cá nhân hóa",
      description: "Hệ thống AI thông minh điều chỉnh nội dung phù hợp với tốc độ học của từng trẻ",
      color: "text-pink-500",
      bgColor: "bg-pink-100"
    },
    {
      icon: Users,
      title: "Học nhóm",
      description: "Tính năng học cùng bạn bè, phát triển kỹ năng xã hội và tinh thần đồng đội",
      color: "text-orange-500",
      bgColor: "bg-orange-100"
    },
    {
      icon: Shield,
      title: "An toàn tuyệt đối",
      description: "Môi trường học tập an toàn, được kiểm duyệt nghiêm ngặt và phù hợp với trẻ em",
      color: "text-red-500",
      bgColor: "bg-red-100"
    },
    {
      icon: Smartphone,
      title: "Đa nền tảng",
      description: "Học mọi lúc mọi nơi trên điện thoại, máy tính bảng hoặc máy tính",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100"
    },
    {
      icon: Award,
      title: "Hệ thống thưởng",
      description: "Huy hiệu, điểm số và chứng chỉ để động viên và ghi nhận thành tích của trẻ",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Clock,
      title: "Học linh hoạt",
      description: "Thời gian học linh hoạt, phù hợp với lịch trình và nhịp độ của từng gia đình",
      color: "text-teal-500",
      bgColor: "bg-teal-100"
    }
  ]

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
            Tính năng nổi bật
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Những công nghệ tiên tiến và phương pháp giáo dục hiện đại giúp trẻ học tập hiệu quả và phát triển toàn diện
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`h-10 w-10 ${feature.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#10b981] to-[#059669] rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Tại sao chọn DailyMates?</h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Chúng tôi kết hợp công nghệ hiện đại với phương pháp giáo dục được chứng minh khoa học,
              tạo ra trải nghiệm học tập độc đáo và hiệu quả cho trẻ em Việt Nam.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-lg opacity-90">Phụ huynh hài lòng</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-lg opacity-90">Trẻ em đã học</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Hỗ trợ kỹ thuật</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}