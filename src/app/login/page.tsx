"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Globe,
  BookOpen,
  Loader2,
} from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import {
  loginUser,
  createParent,
  fetchUserDataAfterLogin,
  fetchKidDataAfterLogin,
} from "@/lib/api";
import { useAppDispatch } from "@/redux/hook";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/redux/features/auth/authSlice";
import { toast } from "sonner"; // Chỉ import toast, không import Toaster

// Component to handle search params
function SearchParamsHandler({
  setEmail,
  setActiveTab,
}: {
  setEmail: (email: string) => void;
  setActiveTab: (tab: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      // Tự động chuyển sang tab login nếu đang ở tab signup
      setActiveTab("login");
    }
  }, [searchParams, setEmail, setActiveTab]);

  return null;
}

function LoginPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  // Thêm các state mới cho verification
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const minLoadingTime = 3000;
    const startTime = Date.now();

    try {
      dispatch(loginStart());

      // Sử dụng Promise.all để đồng bộ hóa API call và minimum loading time
      const [response] = await Promise.all([
        loginUser(email, password),
        new Promise((resolve) => {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
          setTimeout(resolve, remainingTime);
        }),
      ]);

      const userData = {
        _id: response.user._id,
        username: response.user.username,
        name: response.user.username, // Fallback to username if name not provided
        email: response.user.email,
        role: response.user.role,
        isActive: response.user.isActive || true,
        isVerified: response.user.isVerified || false,
        avatar: response.user.avatar,
        roleData: response.user.roleData,
        createdAt: response.user.createdAt || new Date().toISOString(),
        updatedAt: response.user.updatedAt || new Date().toISOString(),
      };

      // Set session cookie name để middleware có thể đọc
      const isSecure = window.location.protocol === "https:";
      console.log("🔒 Setting cookies with secure:", isSecure);

      // Chuẩn bị user data để lưu cookie
      const cookieData = {
        _id: response.user._id,
        username: response.user.username,
        email: response.user.email,
        role: response.user.role,
      };

      // Set connect.sid cookie
      const connectSidValue = `user-session-${Date.now()}`;
      const connectSidCookie = `connect.sid=${connectSidValue}; path=/; max-age=86400${
        isSecure ? "; secure" : ""
      }; samesite=lax`;
      document.cookie = connectSidCookie;
      console.log("📝 Set connect.sid cookie:", connectSidCookie);

      // Set user cookie với minimal data
      const userCookieValue = btoa(JSON.stringify(cookieData)); // Use base64 encoding
      const userCookie = `user=${userCookieValue}; path=/; max-age=86400${
        isSecure ? "; secure" : ""
      }; samesite=lax`;
      document.cookie = userCookie;
      console.log("📝 Set user cookie:", userCookie);

      // Log tất cả cookies hiện tại
      console.log("🍪 All cookies after setting:", document.cookie);

      // Verify cookie đã được set thành công
      let cookieVerified = false;
      await new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 5; // Giảm số lần thử xuống
        const checkCookie = () => {
          const allCookies = document.cookie;
          console.log(
            `🔍 Checking cookies (Attempt ${attempts + 1}/${maxAttempts}):`,
            allCookies
          );

          const cookies = allCookies.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
          }, {} as Record<string, string>);

          if (cookies.user) {
            console.log("✅ User cookie found:", cookies.user);
            cookieVerified = true;
            resolve(undefined);
          } else {
            attempts++;
            console.log(
              `⏳ User cookie not found, attempt ${attempts}/${maxAttempts}`
            );

            if (attempts >= maxAttempts) {
              console.error(
                "❌ Failed to verify user cookie after multiple attempts"
              );
              console.log("🔄 Final attempt to set cookie...");

              // Thử set cookie một lần cuối với cách khác
              const finalCookie = `user=${userCookieValue}; path=/`;
              document.cookie = finalCookie;
              console.log("📝 Final cookie attempt:", finalCookie);

              resolve(undefined);
            } else {
              setTimeout(checkCookie, 500);
            }
          }
        };
        checkCookie();
      });

      // Log kết quả cuối cùng
      console.log("🏁 Final cookie verification result:", cookieVerified);
      console.log("🍪 Final cookies:", document.cookie);

      // Lưu đầy đủ data vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("💾 User data saved to localStorage");

      // Dispatch action và đợi thêm thời gian
      await Promise.all([
        dispatch(loginSuccess({ user: userData })),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      console.log("✅ Login success dispatched");

      // Đợi thêm 2 giây trước khi redirect để có thể xem logs
      console.log("⏳ Waiting 2 seconds before redirect...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log thông tin redirect
      console.log("🔄 Starting redirect process...");
      console.log("👤 User role:", response.user.role);
      console.log("📝 User data:", response.user);

      // Nếu là parent, gọi thêm các APIs để lấy dữ liệu
      if (response.user.role === "parent" && response.user.roleData?._id) {
        try {
          const userCompleteData = await fetchUserDataAfterLogin(
            response.user.roleData._id
          );
          localStorage.setItem(
            "parentData",
            JSON.stringify(userCompleteData.parent)
          );
          localStorage.setItem(
            "kidsData",
            JSON.stringify(userCompleteData.kids)
          );
          localStorage.setItem(
            "kidsInfo",
            JSON.stringify(userCompleteData.kidsInfo)
          );
        } catch (dataError) {
          console.error("Error fetching additional user data:", dataError);
        }
      }

      // THÊM LOGIC CHO KID
      else if (response.user.role === "kid" && response.user.roleData?._id) {
        try {
          const kidCompleteData = await fetchKidDataAfterLogin(
            response.user.roleData._id
          );

          // Tạo một object mới thay vì modify object hiện tại
          const updatedUserData = {
            ...userData,
            roleData: kidCompleteData.data || kidCompleteData,
          };

          // Cập nhật cookie với dữ liệu mới
          const updatedCookieValue = encodeURIComponent(
            JSON.stringify(updatedUserData)
          );
          document.cookie = `user=${updatedCookieValue}; path=/; max-age=86400; secure=${
            window.location.protocol === "https:"
          }; samesite=lax`;

          localStorage.setItem("kidData", JSON.stringify(kidCompleteData));
          console.log("Kid data loaded:", kidCompleteData);
        } catch (dataError) {
          console.error("Error fetching kid data:", dataError);
        }
      }

      // THÊM LOGIC CHO TEACHER
      else if (
        response.user.role === "teacher" &&
        response.user.roleData?._id
      ) {
        try {
          // Lưu teacher data vào localStorage
          localStorage.setItem("teacherData", JSON.stringify(response.user));
        } catch (dataError) {
          console.error("Error saving teacher data:", dataError);
        }
      }

      // Đợi một chút để đảm bảo tất cả dữ liệu đã được lưu
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Redirect based on role
      console.log("Redirecting user with role:", response.user.role);
      console.log("User data:", response.user);

      // Helper function to safely redirect với production support
      const safeRedirect = async (url: string) => {
        console.log(`🔄 Redirecting to: ${url}`);

        // Đợi thêm một chút để đảm bảo cookies đã được lưu hoàn toàn
        await new Promise((resolve) => setTimeout(resolve, 300));

        try {
          // Kiểm tra nếu đang ở production
          const isProduction = window.location.hostname !== "localhost";

          if (isProduction) {
            // Trên production, thử multiple methods
            console.log(
              "🌐 Production environment detected, using enhanced redirect"
            );

            // Method 1: router.push với replace
            try {
              await router.replace(url);
              // Chờ một chút để route có thể được process
              await new Promise((resolve) => setTimeout(resolve, 500));

              // Nếu vẫn ở trang login sau 500ms, force reload
              if (window.location.pathname === "/login") {
                console.log("🔄 Router.replace failed, using window.location");
                window.location.replace(url);
              }
            } catch (routerError) {
              console.error("Router error:", routerError);
              // Fallback to window.location
              window.location.replace(url);
            }
          } else {
            // Localhost: sử dụng window.location.href như cũ
            window.location.href = url;
          }
        } catch (error) {
          console.error("Error with primary redirect method:", error);
          // Final fallback
          try {
            router.push(url);
          } catch (finalError) {
            console.error("Final fallback failed:", finalError);
            // Show error to user
            toast.error("Không thể chuyển hướng. Vui lòng tải lại trang.");
          }
        }
      };

      if (response.user.role === "parent") {
        await safeRedirect("/parent/dashboard");
      } else if (response.user.role === "admin") {
        await safeRedirect("/admin/dashboard");
      } else if (response.user.role === "teacher") {
        console.log(
          "🧑‍🏫 Teacher login detected, redirecting to teacher dashboard"
        );
        console.log("🔍 Teacher data:", response.user);
        await safeRedirect("/teacher/dashboard");
      } else if (response.user.role === "kid") {
        // Fix: Include kidId in the URL for kid routing
        const kidId = response.user.roleData?._id || response.user._id;
        console.log(`🧒 Kid ID for routing: ${kidId}`);
        await safeRedirect(`/environment-kid/kid-learning-zone/${kidId}`);
      } else {
        console.error("Unknown user role:", response.user.role);
        toast.error("Vai trò người dùng không hợp lệ");
      }

      // Fallback: Nếu redirect không thành công sau 3 giây, hiển thị manual redirect
      setTimeout(() => {
        if (window.location.pathname === "/login") {
          console.warn("🚨 Redirect failed, showing manual redirect option");

          let dashboardUrl = "/";
          if (response.user.role === "parent") {
            dashboardUrl = "/parent/dashboard";
          } else if (response.user.role === "admin") {
            dashboardUrl = "/admin/dashboard";
          } else if (response.user.role === "teacher") {
            dashboardUrl = "/teacher/dashboard";
          } else if (response.user.role === "kid") {
            const kidId = response.user.roleData?._id || response.user._id;
            dashboardUrl = `/environment-kid/kid-learning-zone/${kidId}`;
          }

          toast.error(
            <div className="flex flex-col gap-2">
              <span>
                Đăng nhập thành công nhưng không thể chuyển hướng tự động
              </span>
              <button
                onClick={() => {
                  window.location.href = dashboardUrl;
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Nhấn để vào trang chính
              </button>
            </div>,
            {
              duration: 10000,
              position: "top-center",
            }
          );
        }
      }, 3000);
    } catch (error) {
      // Đảm bảo minimum loading time ngay cả khi có lỗi
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      dispatch(loginFailure(errorMessage));
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError("");

    // Validation
    if (
      !name ||
      !signupEmail ||
      !signupPassword ||
      !confirmPassword ||
      !gender
    ) {
      setSignupError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setSignupError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);

    try {
      const parentData = {
        email: signupEmail,
        password: signupPassword,
        fullName: name,
        gender: gender,
      };

      const response = await createParent(parentData);

      // Toast với action buttons
      toast.success(
        <div className="flex flex-col gap-2">
          <span>Đăng ký thành công! 🎉</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss();
                router.push(
                  `/verify-email?email=${encodeURIComponent(signupEmail)}`
                );
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Xác thực ngay
            </button>
            <button
              onClick={() => {
                toast.dismiss();
                setActiveTab("login");
                setEmail(signupEmail);
                // Reset form...
              }}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Đăng nhập
            </button>
          </div>
        </div>,
        {
          duration: 8000,
          position: "top-center",
        }
      );
    } catch (error: unknown) {
      console.error("Signup error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Đã có lỗi xảy ra khi đăng ký";

      // Toast lỗi đơn giản
      toast.error(errorMessage);

      setSignupError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler setEmail={setEmail} setActiveTab={setActiveTab} />
      </Suspense>
      {/* Sử dụng Loading Component */}
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

      <div className="min-h-screen bg-gradient-to-b from-[#e6fffa] to-[#eafff4] flex flex-col">
        <motion.div
          className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-full max-w-md" variants={itemVariants}>
            <motion.div className="mb-8 text-center" variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/" className="block">
                    <div className="relative cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-[#3b82f6] rounded-full blur opacity-70"></div>
                      <div className="relative bg-white rounded-full p-2">
                        <Image
                          src="/globe.svg"
                          alt="Logo - Quay về trang chủ"
                          width={80}
                          height={80}
                          className="rounded-full p-2"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
              <motion.h1
                className="text-3xl font-bold text-[#1e1e1e] mb-2"
                variants={itemVariants}
              >
                Welcome to DailyMates
              </motion.h1>
              <motion.p
                className="text-[#4b5563] text-lg"
                variants={itemVariants}
              >
                Life skills education for children
              </motion.p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              variants={itemVariants}
            >
              <Tabs
                value={activeTab}
                defaultValue="login"
                className="w-full"
                onValueChange={(value) => setActiveTab(value)}
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger
                    value="login"
                    className={`text-base font-medium rounded-md ${
                      activeTab === "login" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className={`text-base font-medium rounded-md ${
                      activeTab === "signup" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form className="space-y-5" onSubmit={handleLogin}>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200"
                      >
                        <div>{error}</div>
                        {process.env.NODE_ENV === "production" && (
                          <button
                            type="button"
                            onClick={() => {
                              const cookies = document.cookie;
                              const userAgent = navigator.userAgent;
                              const currentUrl = window.location.href;

                              console.log("🔍 Debug Info:");
                              console.log("Cookies:", cookies);
                              console.log("User Agent:", userAgent);
                              console.log("Current URL:", currentUrl);
                              console.log(
                                "Protocol:",
                                window.location.protocol
                              );
                              console.log(
                                "Hostname:",
                                window.location.hostname
                              );

                              toast.info(
                                <div className="text-xs">
                                  <div>Debug info logged to console</div>
                                  <div>
                                    Cookies: {cookies ? "Present" : "None"}
                                  </div>
                                  <div>
                                    Protocol: {window.location.protocol}
                                  </div>
                                </div>,
                                { duration: 5000 }
                              );
                            }}
                            className="mt-2 px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                          >
                            Debug Info
                          </button>
                        )}
                      </motion.div>
                    )}
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label
                        htmlFor="email"
                        className="text-[#374151] font-medium"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          className="text-[#374151] font-medium"
                        >
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-[#10b981] hover:text-[#059669] hover:underline transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20 pr-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          disabled={loading}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-medium py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Đang đăng nhập...</span>
                          </>
                        ) : (
                          <>
                            <span>Login</span>
                            <motion.span
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <CheckCircle size={18} />
                            </motion.span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  <motion.div
                    className="mt-8 text-center"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="h-px bg-gray-200 flex-1"></div>
                      <span className="text-sm text-gray-500">or</span>
                      <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    <p className="text-sm text-[#6b7280]">
                      Looking for the children&apos;s area?{" "}
                      <Link
                        href="/environment-kid/login"
                        className="text-[#10b981] hover:text-[#059669] hover:underline font-medium transition-colors"
                      >
                        Go to Kid&apos;s Login
                      </Link>
                    </p>
                  </motion.div>
                </TabsContent>

                <TabsContent value="signup">
                  <form className="space-y-4" onSubmit={handleSignup}>
                    {signupError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200"
                      >
                        {signupError}
                      </motion.div>
                    )}
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label
                        htmlFor="name"
                        className="text-[#374151] font-medium"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label
                        htmlFor="signup-email"
                        className="text-[#374151] font-medium"
                      >
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label className="text-[#374151] font-medium">
                        Gender
                      </Label>
                      <div className="flex gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-4 h-4 text-[#10b981] border-gray-300 focus:ring-[#10b981] focus:ring-2"
                            required
                            disabled={loading}
                          />
                          <span className="text-[#374151]">Male</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-4 h-4 text-[#10b981] border-gray-300 focus:ring-[#10b981] focus:ring-2"
                            required
                            disabled={loading}
                          />
                          <span className="text-[#374151]">Female</span>
                        </label>
                      </div>
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label
                        htmlFor="signup-password"
                        className="text-[#374151] font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20 pr-10"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          disabled={loading}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label
                        htmlFor="confirm-password"
                        className="text-[#374151] font-medium"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-medium py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Đang đăng ký...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign Up</span>
                            <motion.span
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <CheckCircle size={18} />
                            </motion.span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              className="mt-6 flex justify-center gap-6 text-gray-500"
              variants={itemVariants}
            >
              <Link
                href="#"
                className="flex items-center gap-1 hover:text-[#10b981] transition-colors"
              >
                <Globe size={16} />
                <span className="text-sm">Language</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-1 hover:text-[#10b981] transition-colors"
              >
                <BookOpen size={16} />
                <span className="text-sm">Help</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.footer
          className="py-6 text-center text-[#6b7280] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© 2025 DailyMates. All rights reserved.</p>
        </motion.footer>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#e8f5e8] to-[#c8e6c9] flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10b981] mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
