"use client";

import Link from "next/link";
import {
  Bell,
  BookOpen,
  CreditCard,
  Home,
  MessageSquare,
  Settings,
  Users,
  BarChart2,
  ExternalLink,
  LogOut,
  User,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuth();
  const [parentData, setParentData] = useState<any>(null);

  // Load parent data từ localStorage
  useEffect(() => {
    try {
      const storedParentData = localStorage.getItem("parentData");
      if (storedParentData) {
        setParentData(JSON.parse(storedParentData));
      }
    } catch (error) {
      console.error("Error loading parent data:", error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Nếu có lỗi, vẫn cố gắng logout
      window.location.href = "/login";
    }
  };

  // Lấy thông tin hiển thị
  const displayName = parentData?.data?.fullName;
  const displayEmail = parentData?.userId?.email;
  const displayAvatar = parentData?.data?.image;
  const avatarFallback = displayName?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#8b5cf6] text-white border-b border-[#7c3aed]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/parent/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#8b5cf6] font-bold">E</span>
            </div>
            <span className="font-bold text-lg">DailyMates Parent</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <NavItem
              href="/parent/dashboard"
              icon={<Home size={18} />}
              label="Dashboard"
            />
            <NavItem
              href="/parent/courses"
              icon={<BookOpen size={18} />}
              label="Courses"
            />
            <NavItem
              href="/parent/children"
              icon={<Users size={18} />}
              label="My Children"
            />
            <NavItem
              href="/parent/premium"
              icon={<CreditCard size={18} />}
              label="Premium"
            />
            <NavItem
              href="/parent/messages"
              icon={<MessageSquare size={18} />}
              label="Messages"
            />
            <NavItem
              href="/parent/analytics"
              icon={<BarChart2 size={18} />}
              label="Analytics"
            />
            <NavItem
              href="/parent/settings"
              icon={<Settings size={18} />}
              label="Settings"
            />
          </nav>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 relative"
              >
                <Bell size={20} />
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium">
                  3
                </span>
              </Button>
            </div>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="relative group">
                  <Avatar className="h-10 w-10 cursor-pointer border-2 border-white/20 hover:border-white/60 transition-all duration-300 group-hover:scale-105">
                    <AvatarImage
                      src={
                        displayAvatar || "/placeholder.svg?height=40&width=40"
                      }
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold text-sm">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online status indicator */}
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 p-2 shadow-lg border-0 bg-white/95 backdrop-blur-sm"
              >
                <DropdownMenuLabel className="font-normal p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg mb-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2 border-purple-200">
                      <AvatarImage
                        src={
                          displayAvatar || "/placeholder.svg?height=48&width=48"
                        }
                        alt="User Avatar"
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold">
                        {avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-gray-900">
                        {displayName}
                      </p>
                      <p className="text-xs leading-none text-gray-600">
                        {displayEmail}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">
                          Đang hoạt động
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer hover:bg-purple-50 rounded-md p-3 transition-colors"
                >
                  <Link href="/parent/profile" className="flex items-center">
                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Hồ sơ</span>
                      <span className="text-xs text-gray-500">
                        Xem và chỉnh sửa thông tin
                      </span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer hover:bg-purple-50 rounded-md p-3 transition-colors"
                >
                  <Link href="/parent/settings" className="flex items-center">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Settings className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Cài đặt</span>
                      <span className="text-xs text-gray-500">
                        Tùy chỉnh tài khoản
                      </span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-red-50 rounded-md p-3 transition-colors text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <LogOut className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Đăng xuất</span>
                    <span className="text-xs text-red-400">
                      Thoát khỏi tài khoản
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-[#f5f5f5]">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>

      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-[#6b7280] text-sm">
          <p>© 2025 DailyMates. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/10 flex items-center gap-2 group transition-all duration-300 overflow-hidden"
      >
        <div className="flex-shrink-0">{icon}</div>
        <span className="whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100">
          {label}
        </span>
      </Button>
    </Link>
  );
}
