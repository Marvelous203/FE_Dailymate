'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Eye, EyeOff, Globe, BookOpen } from "lucide-react";
import { loginUser } from '@/lib/api';
import { useAppDispatch } from '@/redux/hook';
import { loginStart, loginSuccess, loginFailure } from '@/redux/features/auth/authSlice';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(''); // Thay đổi từ username sang email
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useAppDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      dispatch(loginStart());
      const response = await loginUser(email, password); // Sử dụng email
      
      // Chuyển đổi dữ liệu từ API sang định dạng UserData
      const userData = {
        id: response.user._id,
        name: response.user.username,
        email: response.user.email,
        role: response.user.role,
      };
      
      // Giả định token được trả về từ API hoặc tạo một token tạm thời
      const token = 'temp-token'; // Trong thực tế, token nên được trả về từ API
      
      dispatch(loginSuccess({ user: userData, token }));
      
      // Chuyển hướng dựa trên vai trò người dùng
      if (response.user.role === 'parent') {
        router.push('/parent/dashboard');
      } else if (response.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (response.user.role === 'teacher') {
        router.push('/teacher/dashboard');
      } else {
        router.push('/auth/role-select');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      dispatch(loginFailure(error.message));
      setError(error.message);
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
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
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-[#3b82f6] rounded-full blur opacity-70"></div>
                  <div className="relative bg-white rounded-full p-2">
                    <Image
                      src="/globe.svg"
                      alt="Logo"
                      width={80}
                      height={80}
                      className="rounded-full p-2"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.h1 
              className="text-3xl font-bold text-[#1e1e1e] mb-2"
              variants={itemVariants}
            >
              Welcome to EduKids
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
              defaultValue="login" 
              className="w-full"
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="login"
                  className={`text-base font-medium rounded-md ${activeTab === 'login' ? 'bg-white shadow-sm' : ''}`}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className={`text-base font-medium rounded-md ${activeTab === 'signup' ? 'bg-white shadow-sm' : ''}`}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form className="space-y-5" onSubmit={handleLogin}>
                  {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <Label htmlFor="email" className="text-[#374151] font-medium">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-[#374151] font-medium">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-[#10b981] hover:text-[#059669] hover:underline transition-colors">
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
                      />
                      <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-medium py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                      {!loading && (
                        <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                          <CheckCircle size={18} />
                        </motion.span>
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
                    <Link href="/environment-kid/login" className="text-[#10b981] hover:text-[#059669] hover:underline font-medium transition-colors">
                      Go to Kid&apos;s Login
                    </Link>
                  </p>
                </motion.div>
              </TabsContent>

              <TabsContent value="signup">
                <form className="space-y-4">
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <Label htmlFor="name" className="text-[#374151] font-medium">Full Name</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe" 
                      className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <Label htmlFor="signup-email" className="text-[#374151] font-medium">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <Label htmlFor="signup-password" className="text-[#374151] font-medium">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20 pr-10"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <Label htmlFor="confirm-password" className="text-[#374151] font-medium">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="border-gray-200 focus:border-[#10b981] focus:ring-[#10b981]/20"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-medium py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                      <span>Sign Up</span>
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                        <CheckCircle size={18} />
                      </motion.span>
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
            <Link href="#" className="flex items-center gap-1 hover:text-[#10b981] transition-colors">
              <Globe size={16} />
              <span className="text-sm">Language</span>
            </Link>
            <Link href="#" className="flex items-center gap-1 hover:text-[#10b981] transition-colors">
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
        <p>© 2025 EduKids. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}