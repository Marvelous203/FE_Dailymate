import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";
import ParentHeader from "@/components/parent-header";
import Link from "next/link";

export default function PremiumPlans() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Chọn gói phù hợp cho con bạn
          </h1>
          <p className="text-[#4b5563] text-lg">
            Nâng cấp trải nghiệm học tập với những tính năng độc quyền và toàn
            diện.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 inline-flex">
            <Button className="rounded-full bg-[#8b5cf6]">Hàng tháng</Button>
            <Button variant="ghost" className="rounded-full">
              Hàng năm (Tiết kiệm 20%)
            </Button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="border-none shadow-sm relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Miễn phí</CardTitle>
              <p className="text-[#6b7280]">
                Khám phá nền tảng với các tính năng cơ bản
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold">Miễn phí</span>
              </div>

              <Link href="/payment">
                <Button className="w-full mb-6">Bắt đầu miễn phí</Button>
              </Link>

              <div className="space-y-3">
                <PlanFeature included>5 bài học cơ bản</PlanFeature>
                <PlanFeature included>Báo cáo tiến độ cơ bản</PlanFeature>
                <PlanFeature included>1 hồ sơ con</PlanFeature>
                <PlanFeature included>Hỗ trợ email</PlanFeature>
                <PlanFeature included>Giới hạn thời gian học</PlanFeature>
                <PlanFeature>Tất cả bài học và hoạt động</PlanFeature>
                <PlanFeature>Báo cáo chi tiết</PlanFeature>
                <PlanFeature>Không giới hạn hồ sơ con</PlanFeature>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-none shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#8b5cf6] text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              Phổ biến nhất
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Premium</CardTitle>
              <p className="text-[#6b7280]">Trải nghiệm học tập hoàn chỉnh</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-lg text-gray-400 line-through mb-1">
                  79.000đ
                </div>
                <span className="text-3xl font-bold">60.000đ</span>
                <span className="text-[#6b7280]">/tháng</span>
              </div>

              <Link href="/payment">
                <Button className="w-full mb-6 bg-[#8b5cf6] hover:bg-[#7c3aed]">
                  Nâng cấp ngay
                </Button>
              </Link>

              <div className="space-y-3">
                <PlanFeature included>Tất cả bài học và hoạt động</PlanFeature>
                <PlanFeature included>Báo cáo chi tiết & phân tích</PlanFeature>
                <PlanFeature included>Không giới hạn hồ sơ con</PlanFeature>
                <PlanFeature included>Hỗ trợ ưu tiên 24/7</PlanFeature>
                <PlanFeature included>Chứng chỉ hoàn thành</PlanFeature>
                <PlanFeature included>Tải xuống không giới hạn</PlanFeature>
                <PlanFeature included>Tính năng AI hỗ trợ học tập</PlanFeature>
                <PlanFeature included>Không quảng cáo</PlanFeature>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            So sánh tính năng
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Tính năng</th>
                  <th className="p-4 text-center">Miễn phí</th>
                  <th className="p-4 text-center bg-[#f0e5fc]">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Số lượng bài học</td>
                  <td className="p-4 text-center">5 bài học</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    Không giới hạn
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Hồ sơ con</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    Không giới hạn
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Theo dõi tiến độ</td>
                  <td className="p-4 text-center">Cơ bản</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">Nâng cao</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Tài liệu tải xuống</td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-[#ef4444] mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Hoạt động tương tác</td>
                  <td className="p-4 text-center">Giới hạn</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">Đầy đủ</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Dashboard phụ huynh</td>
                  <td className="p-4 text-center">Cơ bản</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">Nâng cao</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Hỗ trợ khách hàng</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center bg-[#f0e5fc]">Ưu tiên 24/7</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">AI hỗ trợ học tập</td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-[#ef4444] mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4">Chứng chỉ</td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-[#ef4444] mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-[#f0e5fc]">
                    <CheckCircle className="h-5 w-5 text-[#8b5cf6] mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-[#4b5563]">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be applied at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Is there a free trial?
              </h3>
              <p className="text-[#4b5563]">
                Yes, we offer a 7-day free trial for all new users. You can
                explore our platform and see which plan works best for your
                family.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How do child profiles work?
              </h3>
              <p className="text-[#4b5563]">
                Each child profile allows you to track progress separately. You
                can customize learning paths and monitor achievements for each
                child individually.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-[#4b5563]">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access until the end of your current billing
                period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-[#4b5563]">
                We accept all major credit cards, PayPal, and Apple Pay. All
                payments are processed securely.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to start your child's learning journey?
          </h2>
          <p className="mb-6 text-white/80 max-w-2xl mx-auto">
            Join thousands of parents who have enhanced their children's
            education with our interactive learning platform.
          </p>
          <Link href="/payment">
            <Button className="bg-white text-[#8b5cf6] hover:bg-white/90">
              Get Started Today
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

function PlanFeature({
  children,
  included = false,
}: {
  children: React.ReactNode;
  included?: boolean;
}) {
  return (
    <div className="flex items-center">
      {included ? (
        <CheckCircle className="h-5 w-5 text-[#8b5cf6] mr-3 flex-shrink-0" />
      ) : (
        <X className="h-5 w-5 text-[#6b7280] mr-3 flex-shrink-0" />
      )}
      <span className={included ? "" : "text-[#6b7280]"}>{children}</span>
    </div>
  );
}
