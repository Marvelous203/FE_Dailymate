"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, RefreshCw, ArrowLeft, Home, HelpCircle } from "lucide-react";
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

function PaymentCancelContent() {
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
    }
  }, [orderCode]);

  const checkPayment = async (orderCode: string) => {
    try {
      const response = await checkPaymentStatus(orderCode);

      if (response.error === 0 && response.data) {
        setPaymentData(response.data);

        // If payment is actually successful, redirect to success page
        if (
          response.data.status === "SUCCESS" &&
          response.data.payosStatus === "PAID"
        ) {
          toast.success("Thanh toán đã thành công!");
          router.push(`/payment-success?orderCode=${orderCode}`);
        }
      } else {
        // Even if we can't get payment data, we still show the cancel page
        console.log("Could not fetch payment data:", response.message);
      }
    } catch (error: any) {
      console.error("Check payment error:", error);
      // Don't show error toast here as this page can be reached legitimately when payment is cancelled
    } finally {
      setLoading(false);
    }
  };

  const retryPayment = () => {
    router.push("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#8b5cf6] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg">Đang kiểm tra trạng thái thanh toán...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Cancel Header */}
          <div className="text-center mb-8">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-full shadow-xl">
                  <XCircle className="h-16 w-16 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#ef4444] to-[#dc2626] bg-clip-text text-transparent">
                Thanh toán đã bị hủy
              </h1>
              <p className="text-[#64748b] text-lg">
                Giao dịch của bạn chưa được hoàn thành. Đừng lo lắng, không có
                khoản phí nào được tính.
              </p>
            </div>
          </div>

          {/* Payment Details (if available) */}
          {paymentData && (
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Thông tin đơn hàng
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
                    <p className="text-lg font-semibold">
                      {paymentData.amount.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Trạng thái
                    </label>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-[#ef4444]" />
                      <span className="text-[#ef4444] font-semibold">
                        {paymentData.status === "CANCELLED"
                          ? "Đã hủy"
                          : "Không hoàn thành"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Thời gian
                    </label>
                    <p className="text-lg font-semibold">
                      {new Date(paymentData.updatedAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reasons for cancellation */}
          <Card className="bg-orange-50 border border-orange-200 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-orange-800">
                Có thể do những lý do sau:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-orange-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Bạn đã thoát khỏi trang thanh toán</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Thông tin thẻ không chính xác</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Thẻ không đủ số dư hoặc bị khóa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Kết nối mạng bị gián đoạn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Vượt quá thời gian cho phép</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* What happens next */}
          <Card className="bg-blue-50 border border-blue-200 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-blue-800">
                Điều gì sẽ xảy ra tiếp theo?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-blue-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    Không có khoản phí nào được tính từ tài khoản của bạn
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Bạn có thể thử lại ngay lập tức</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Tài khoản của bạn vẫn giữ nguyên gói hiện tại</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Liên hệ hỗ trợ nếu gặp vấn đề liên tục</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button
              onClick={retryPayment}
              className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] text-white shadow-lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Thử lại thanh toán
            </Button>

            <Link href="/parent/premium">
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Chọn gói khác
              </Button>
            </Link>

            <Link href="/parent/dashboard">
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <Card className="bg-gray-50 border border-gray-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800 text-center">
                Cần hỗ trợ?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Nếu bạn gặp vấn đề liên tục với thanh toán, đội ngũ hỗ trợ của
                chúng tôi luôn sẵn sàng giúp đỡ.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-800">Email hỗ trợ:</p>
                  <p className="text-[#8b5cf6]">support@kidlearning.vn</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Hotline:</p>
                  <p className="text-[#8b5cf6]">1900-123-456</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentCancelContent />
    </Suspense>
  );
}
