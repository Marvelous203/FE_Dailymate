"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Star,
  Crown,
  Zap,
  Shield,
  Users,
  BookOpen,
  Award,
  Headphones,
} from "lucide-react";

export default function PremiumContent() {
  const plans = [
    {
      name: "Miễn phí",
      price: "Miễn phí",
      originalPrice: null,
      description: "Khám phá nền tảng với các tính năng cơ bản",
      features: [
        "5 bài học cơ bản",
        "Báo cáo tiến độ cơ bản",
        "1 hồ sơ con",
        "Hỗ trợ email",
        "Giới hạn thời gian học",
      ],
      highlighted: false,
      color: "from-gray-500 to-gray-600",
      icon: BookOpen,
    },
    {
      name: "Premium",
      price: "60.000đ",
      originalPrice: "79.000đ",
      description: "Trải nghiệm học tập hoàn chỉnh",
      features: [
        "Tất cả bài học và hoạt động",
        "Báo cáo chi tiết & phân tích",
        "Không giới hạn hồ sơ con",
        "Hỗ trợ ưu tiên 24/7",
        "Chứng chỉ hoàn thành",
        "Tải xuống không giới hạn",
        "Tính năng AI hỗ trợ học tập",
        "Không quảng cáo",
      ],
      highlighted: true,
      color: "from-[#8b5cf6] to-[#7c3aed]",
      icon: Crown,
    },
  ];

  const premiumFeatures = [
    {
      icon: Zap,
      title: "Học tập nhanh hơn",
      description: "AI cá nhân hóa giúp tối ưu hóa tốc độ học",
    },
    {
      icon: Shield,
      title: "An toàn tuyệt đối",
      description: "Môi trường học tập được bảo vệ nghiêm ngặt",
    },
    {
      icon: Award,
      title: "Chứng chỉ chính thức",
      description: "Được công nhận bởi Bộ Giáo dục",
    },
    {
      icon: Headphones,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ",
    },
  ];

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
            Gói Premium
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Nâng cấp trải nghiệm học tập với những tính năng độc quyền và hỗ trợ
            chuyên nghiệp
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative ${plan.highlighted ? "z-10" : ""}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Phổ biến nhất
                  </div>
                </div>
              )}

              <Card
                className={`overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full ${
                  plan.highlighted
                    ? "ring-2 ring-[#10b981] bg-gradient-to-br from-white to-green-50"
                    : "bg-white"
                }`}
              >
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <plan.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      {plan.originalPrice && (
                        <div className="text-lg text-gray-400 line-through mb-1">
                          {plan.originalPrice}
                        </div>
                      )}
                      <div
                        className={`text-4xl font-bold ${
                          plan.highlighted ? "text-[#10b981]" : "text-gray-900"
                        }`}
                      >
                        {plan.price}
                      </div>
                      {plan.price !== "Liên hệ" &&
                        plan.price !== "Miễn phí" && (
                          <div className="text-gray-600">/tháng</div>
                        )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle
                          className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                            plan.highlighted
                              ? "text-[#10b981]"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {plan.price === "Liên hệ"
                      ? "Liên hệ tư vấn"
                      : plan.price === "Miễn phí"
                      ? "Bắt đầu miễn phí"
                      : "Chọn gói này"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Premium Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Tại sao chọn Premium?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-gradient-to-r from-[#10b981] to-[#059669] rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn gia đình đã tin tưởng DailyMates để phát
            triển kỹ năng sống cho con em mình
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#10b981] hover:bg-gray-100"
            >
              Dùng thử miễn phí
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-green-500 hover:bg-green-500 hover:text-white"
            >
              Xem demo
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
