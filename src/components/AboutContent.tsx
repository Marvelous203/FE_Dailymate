'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  BookOpen,
  Lightbulb,
  Globe,
  Star
} from "lucide-react"

export default function AboutContent() {
  const values = [
    {
      icon: Heart,
      title: "Yêu thương",
      description: "Chúng tôi tin rằng tình yêu thương là nền tảng của mọi sự học hỏi và phát triển"
    },
    {
      icon: Lightbulb,
      title: "Sáng tạo",
      description: "Khuyến khích tư duy sáng tạo và khả năng giải quyết vấn đề một cách độc đáo"
    },
    {
      icon: Users,
      title: "Cộng đồng",
      description: "Xây dựng cộng đồng học tập tích cực, hỗ trợ lẫn nhau trong quá trình phát triển"
    },
    {
      icon: Award,
      title: "Chất lượng",
      description: "Cam kết mang đến chất lượng giáo dục cao nhất cho mọi trẻ em Việt Nam"
    }
  ]

  const team = [
    {
      name: "Nguyễn Minh Anh",
      role: "CEO & Founder",
      experience: "15 năm kinh nghiệm giáo dục",
      description: "Chuyên gia tâm lý trẻ em, từng làm việc tại các tổ chức giáo dục quốc tế"
    },
    {
      name: "Trần Đức Minh",
      role: "CTO",
      experience: "12 năm phát triển công nghệ",
      description: "Chuyên gia AI và machine learning, từng làm việc tại Google và Microsoft"
    },
    {
      name: "Lê Thu Hà",
      role: "Head of Education",
      experience: "10 năm nghiên cứu giáo dục",
      description: "Tiến sĩ Tâm lý học Phát triển, chuyên gia về phương pháp giáo dục hiện đại"
    }
  ]

  const achievements = [
    {
      icon: Users,
      number: "50,000+",
      label: "Trẻ em đã học",
      description: "Trên khắp Việt Nam"
    },
    {
      icon: BookOpen,
      number: "1,000+",
      label: "Bài học chất lượng",
      description: "Được chuyên gia thiết kế"
    },
    {
      icon: Award,
      number: "15+",
      label: "Giải thưởng",
      description: "Trong và ngoài nước"
    },
    {
      icon: Globe,
      number: "63",
      label: "Tỉnh thành",
      description: "Có học sinh sử dụng"
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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            Về EduKids
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            EduKids là nền tảng giáo dục kỹ năng sống hàng đầu tại Việt Nam, được phát triển bởi đội ngũ 
            chuyên gia giáo dục và công nghệ với hơn 10 năm kinh nghiệm. Chúng tôi tin rằng mỗi đứa trẻ 
            đều có tiềm năng vô hạn và xứng đáng được trang bị những kỹ năng cần thiết để thành công trong cuộc sống.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Sứ mệnh</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Tạo ra một thế hệ trẻ em Việt Nam tự tin, sáng tạo và có đầy đủ kỹ năng sống 
                  để đối mặt với những thách thức của tương lai. Chúng tôi cam kết mang đến 
                  những trải nghiệm học tập tốt nhất, giúp trẻ phát triển toàn diện cả về 
                  trí tuệ, cảm xúc và xã hội.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Tầm nhìn</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Trở thành nền tảng giáo dục kỹ năng sống số 1 Đông Nam Á vào năm 2030, 
                  góp phần xây dựng một xã hội phát triển bền vững với những công dân 
                  có kỹ năng sống tốt, biết yêu thương và chia sẻ.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Đội ngũ lãnh đạo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                whileHover={{ y: -10 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                    <div className="text-[#10b981] font-medium mb-2">{member.role}</div>
                    <div className="text-sm text-gray-500 mb-4">{member.experience}</div>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Thành tựu của chúng tôi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + (index * 0.1) }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#10b981] mb-2">{achievement.number}</div>
                <div className="text-lg font-medium mb-1">{achievement.label}</div>
                <div className="text-sm text-gray-600">{achievement.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center bg-gradient-to-r from-[#10b981] to-[#059669] rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Cùng chúng tôi xây dựng tương lai</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Tham gia cùng EduKids để mang đến cho con em bạn những kỹ năng sống cần thiết 
            cho thành công trong tương lai. Hãy bắt đầu hành trình học tập thú vị ngay hôm nay!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-[#10b981] hover:bg-gray-100">
              Bắt đầu ngay
            </Button>
            <Button size="lg" variant="outline" className="border-white text-green-500 hover:bg-green-500 hover:text-white">
              Tìm hiểu thêm
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}