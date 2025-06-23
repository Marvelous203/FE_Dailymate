"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Crown,
  Heart,
  Sparkles,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { createPayment } from "@/lib/api";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  highlighted: boolean;
  color: string;
  icon: any;
}

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const plans: Plan[] = [
    {
      id: "free",
      name: "Gói Miễn phí",
      price: 0,
      description: "Phù hợp để khám phá nền tảng",
      features: [
        "5 bài học cơ bản",
        "Báo cáo tiến độ cơ bản",
        "1 hồ sơ con",
        "Hỗ trợ email",
        "Giới hạn thời gian học",
      ],
      highlighted: false,
      color: "from-gray-500 to-gray-600",
      icon: Sparkles,
    },
    {
      id: "premium",
      name: "Gói Premium",
      price: 60000,
      originalPrice: 79000,
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

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast.error("Vui lòng chọn gói thanh toán");
      return;
    }

    // If free plan is selected, just show success message
    if (selectedPlan.id === "free") {
      toast.success("Bạn đang sử dụng gói miễn phí!");
      router.push("/parent/dashboard");
      return;
    }

    setLoading(true);
    try {
      const paymentData = {
        amount: selectedPlan.price,
        description: `${selectedPlan.name} - ${selectedPlan.description}`,
        planType: selectedPlan.id,
      };

      const response = await createPayment(paymentData);

      if (response.error === 0 && response.data?.checkoutUrl) {
        // Redirect to PayOS checkout page
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error(response.message || "Tạo thanh toán thất bại");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi tạo thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/parent/premium">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Thanh toán</h1>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-2xl shadow-xl">
                <CreditCard className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
              Chọn gói phù hợp cho bạn
            </h2>
            <p className="text-[#64748b] text-lg">
              Nâng cấp trải nghiệm học tập với những tính năng độc quyền
            </p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:scale-105 ${
                plan.highlighted
                  ? "ring-2 ring-[#8b5cf6] bg-gradient-to-br from-white to-purple-50"
                  : "bg-white/80 backdrop-blur-sm"
              } ${
                selectedPlan?.id === plan.id
                  ? "ring-2 ring-blue-500 shadow-xl"
                  : ""
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center transform rotate-12 shadow-xl">
                  <span className="text-white font-bold text-sm transform -rotate-12">
                    Phổ biến
                  </span>
                </div>
              )}

              <CardHeader className="pb-4 relative">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 bg-gradient-to-br ${plan.color} rounded-xl shadow-lg`}
                  >
                    <plan.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle
                    className={`text-2xl font-bold ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {plan.name}
                  </CardTitle>
                </div>
                <p className="text-[#64748b] text-lg">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  {plan.originalPrice && (
                    <div className="text-lg text-gray-400 line-through mb-1">
                      {plan.originalPrice.toLocaleString("vi-VN")}đ
                    </div>
                  )}
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent"
                        : "text-[#1e293b]"
                    }`}
                  >
                    {plan.price === 0
                      ? "Miễn phí"
                      : `${plan.price.toLocaleString("vi-VN")}đ`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-[#64748b] text-lg">/tháng</span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle
                        className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-[#8b5cf6]" : "text-gray-400"
                        }`}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {selectedPlan?.id === plan.id && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">
                      ✓ Đã chọn gói này
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        {selectedPlan && (
          <div className="max-w-md mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">
                  Thông tin thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Gói đã chọn:</span>
                  <span className="font-semibold">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Giá:</span>
                  <span className="font-semibold text-lg">
                    {selectedPlan.price.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="border-t pt-4">
                  <Button
                    onClick={handlePayment}
                    disabled={loading}
                    className={`w-full py-3 font-semibold ${
                      selectedPlan.highlighted
                        ? "bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9]"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    } text-white shadow-xl`}
                  >
                    {loading
                      ? "Đang xử lý..."
                      : selectedPlan.price === 0
                      ? "Sử dụng miễn phí"
                      : "Thanh toán ngay"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
