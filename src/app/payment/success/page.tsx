"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown, ArrowRight, Home, Receipt } from "lucide-react";
import { checkPaymentStatus } from "@/lib/api";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

interface PaymentData {
  orderCode: number;
  amount: number;
  status: string;
  payosStatus: string;
  createdAt: string;
  updatedAt: string;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#8b5cf6] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Đang tải trang...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentSuccessContent() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderCode = searchParams.get("orderCode");

  useEffect(() => {
    if (orderCode) {
      checkPayment(orderCode);
    } else {
      setLoading(false);
      toast.error("Không tìm thấy mã đơn hàng");
    }
  }, [orderCode]);

  const checkPayment = async (orderCode: string) => {
    try {
      const response = await checkPaymentStatus(orderCode);

      if (response.error === 0 && response.data) {
        setPaymentData(response.data);

        // Check if payment is actually successful
        if (
          response.data.status !== "SUCCESS" ||
          response.data.payosStatus !== "PAID"
        ) {
          toast.error("Thanh toán chưa được hoàn thành");
          router.push(`/payment/cancel?orderCode=${orderCode}`);
        }
      } else {
        throw new Error(
          response.message || "Không thể kiểm tra trạng thái thanh toán"
        );
      }
    } catch (error: any) {
      console.error("Check payment error:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi kiểm tra thanh toán");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#8b5cf6] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg">Đang xác nhận thanh toán...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              Không tìm thấy thông tin thanh toán
            </h2>
            <p className="text-gray-600 mb-6">
              Vui lòng kiểm tra lại mã đơn hàng của bạn.
            </p>
            <Link href="/payment">
              <Button className="w-full">Quay lại thanh toán</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full shadow-xl">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#10b981] to-[#059669] bg-clip-text text-transparent">
                Thanh toán thành công!
              </h1>
              <p className="text-[#64748b] text-lg">
                Cảm ơn bạn đã nâng cấp tài khoản. Bạn đã có thể sử dụng tất cả
                tính năng premium.
              </p>
            </div>
          </div>

          {/* Payment Details */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Chi tiết thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Mã đơn hàng
                  </label>
                  <p className="text-lg font-semibold">
                    {paymentData.orderCode}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Số tiền
                  </label>
                  <p className="text-lg font-semibold text-[#10b981]">
                    {paymentData.amount.toLocaleString("vi-VN")}đ
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </label>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10b981]" />
                    <span className="text-[#10b981] font-semibold">
                      {paymentData.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Ngày thanh toán
                  </label>
                  <p className="text-lg font-semibold">
                    {new Date(paymentData.updatedAt).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Crown className="h-5 w-5" />
                Tính năng premium đã kích hoạt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white/80" />
                  <span>Truy cập tất cả khóa học</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white/80" />
                  <span>Báo cáo chi tiết</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white/80" />
                  <span>Hỗ trợ ưu tiên</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white/80" />
                  <span>Chứng chỉ hoàn thành</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/parent/dashboard">
              <Button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white shadow-lg">
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
            <Link href="/parent/courses">
              <Button className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] text-white shadow-lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                Khám phá khóa học
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Lưu ý quan trọng:
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Gói premium có hiệu lực ngay lập tức</li>
              <li>• Bạn sẽ nhận được email xác nhận trong vài phút</li>
              <li>• Nếu có vấn đề, vui lòng liên hệ hỗ trợ khách hàng</li>
            </ul>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
