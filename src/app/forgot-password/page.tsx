"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { sendVerificationEmail, resetPassword } from "@/lib/api";
import { toast } from "sonner";
import { CheckCircle, Mail, Lock, ArrowLeft } from "lucide-react";

type StepType = "email" | "verification" | "newPassword" | "success";

// Component to handle search params
function SearchParamsHandler({
  setEmail,
}: {
  setEmail: (email: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams, setEmail]);

  return null;
}

function ForgotPasswordContent() {
  const [step, setStep] = useState<StepType>("email");
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendVerificationEmail(email, true);
      toast.success(
        "Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn."
      );
      setStep("verification");
    } catch (error: unknown) {
      console.error("Send email error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode) {
      setError("Vui lòng nhập mã xác thực");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Chuyển sang bước nhập mật khẩu mới
      setStep("newPassword");
      toast.success("Mã xác thực hợp lệ! Vui lòng nhập mật khẩu mới.");
    } catch (error: unknown) {
      console.error("Verify code error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await resetPassword(email, verifyCode, newPassword);
      toast.success(
        "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới."
      );
      setStep("success");
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (step) {
      case "email":
        return "Quên mật khẩu";
      case "verification":
        return "Nhập mã xác thực";
      case "newPassword":
        return "Đặt mật khẩu mới";
      case "success":
        return "Thành công!";
      default:
        return "Quên mật khẩu";
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case "email":
        return "Nhập email để đặt lại mật khẩu";
      case "verification":
        return `Mã xác thực đã được gửi đến ${email}`;
      case "newPassword":
        return "Nhập mật khẩu mới cho tài khoản của bạn";
      case "success":
        return "Mật khẩu đã được đặt lại thành công!";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "email":
        return (
          <form onSubmit={handleSendEmail} className="w-full space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#374151] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2 focus:border-[#10b981] focus:ring-[#10b981]/20"
                required
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-md flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Mail size={18} />
              Gửi email đặt lại
            </Button>
          </form>
        );

      case "verification":
        return (
          <form onSubmit={handleVerifyCode} className="w-full space-y-4">
            <div>
              <Label
                htmlFor="verifyCode"
                className="text-[#374151] font-medium"
              >
                Mã xác thực
              </Label>
              <Input
                id="verifyCode"
                type="text"
                placeholder="Nhập mã 6 số"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2 focus:border-[#10b981] focus:ring-[#10b981]/20 text-center text-lg tracking-widest"
                maxLength={6}
                required
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-md flex items-center justify-center gap-2"
              disabled={loading}
            >
              <CheckCircle size={18} />
              Xác nhận mã
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleSendEmail({ preventDefault: () => {} } as React.FormEvent)
              }
              className="w-full"
              disabled={loading}
            >
              Gửi lại mã
            </Button>
          </form>
        );

      case "newPassword":
        return (
          <form onSubmit={handleResetPassword} className="w-full space-y-4">
            <div>
              <Label
                htmlFor="newPassword"
                className="text-[#374151] font-medium"
              >
                Mật khẩu mới
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2 focus:border-[#10b981] focus:ring-[#10b981]/20"
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-[#374151] font-medium"
              >
                Xác nhận mật khẩu
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-[#d9d9d9] bg-white rounded-md px-4 py-2 focus:border-[#10b981] focus:ring-[#10b981]/20"
                required
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-md flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Lock size={18} />
              Đặt lại mật khẩu
            </Button>
          </form>
        );

      // Trong phần renderStepContent, case 'success':
      case "success":
        return (
          <div className="w-full space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <Button
              onClick={() =>
                router.push(`/login?email=${encodeURIComponent(email)}`)
              }
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-md"
            >
              Đăng nhập ngay
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler setEmail={setEmail} />
      </Suspense>
      <AnimatePresence>
        <LoadingOverlay
          isVisible={loading}
          title="Đang xử lý..."
          subtitle="Vui lòng chờ trong giây lát"
          logoSrc="/globe.svg"
          showProgress={true}
          showDots={true}
        />
      </AnimatePresence>

      <main className="min-h-screen bg-gradient-to-b from-[#e6fffa] to-[#eafff4] flex flex-col items-center justify-between">
        <div className="w-full max-w-md mx-auto pt-16 px-4 flex flex-col items-center">
          <motion.div
            className="w-full text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-[#1e1e1e]">{getTitle()}</h1>
            <p className="text-[#4b5563] mt-2">{getSubtitle()}</p>
          </motion.div>

          <motion.div
            className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200 mb-4"
              >
                {error}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {step !== "success" && (
              <div className="text-center mt-4">
                <p className="text-[#4b5563] text-sm">
                  Nhớ mật khẩu?{" "}
                  <Link
                    href="/login"
                    className="text-[#10b981] font-medium hover:underline"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            )}

            {step !== "email" && step !== "success" && (
              <Button
                variant="ghost"
                onClick={() => setStep("email")}
                className="w-full mt-2 text-[#4b5563] hover:text-[#10b981]"
              >
                <ArrowLeft size={16} className="mr-2" />
                Quay lại
              </Button>
            )}
          </motion.div>
        </div>

        <div className="w-full flex justify-center mt-auto">
          <div className="relative w-full h-32">
            <Image
              src="/globe.svg"
              alt="Mascot character"
              width={120}
              height={120}
              className="absolute bottom-0 left-8"
            />
            <div className="absolute bottom-0 w-full h-16 bg-[#83d98c] rounded-t-3xl"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ForgotPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-[#e6fffa] to-[#eafff4] flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10b981] mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}

// Replace any types with proper interfaces
interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>; // Replace 'any' with proper type
}

// Remove unused FormData interface and handleError function if not used
interface FormData {
  email: string;
  code?: string;
  newPassword?: string;
}

// Replace any with proper types in error handlers
const handleError = (error: Error | ApiResponse) => {
  // ... existing code ...
};
