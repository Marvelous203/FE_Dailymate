'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, BookOpen, Gamepad2, GamepadIcon, Gift, Home, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export default function KidLayout({ children }: { children: React.ReactNode }) {
  const [kidData, setKidData] = useState<any>(null);
  const { logout } = useAuth();

  useEffect(() => {
    // Lấy dữ liệu kid từ localStorage
    const storedKidData = localStorage.getItem('kidData');
    if (storedKidData) {
      try {
        const parsedData = JSON.parse(storedKidData);
        setKidData(parsedData);
        console.log('Kid data loaded:', parsedData); // Debug log
      } catch (error) {
        console.error('Error parsing kid data:', error);
      }
    }
  }, []);

  const kid = kidData?.data;
  const user = kid?.userId;
  
  // Đảm bảo hiển thị đúng kid ID
  console.log('Current kid ID:', kid?._id); // Debug log
  
  // Tạo base URL với kid ID
  const kidBaseUrl = kid?._id ? `/environment-kid/kid-learning-zone/${kid._id}` : '/environment-kid/kid-learning-zone';

  // Cập nhật các liên kết navigation
  // Remove unused variables
  // const user = ... // Remove if not used
  // const navItems = ... // Remove if not used
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eafff4]">
      <header className="bg-[#83d98c] text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/kid/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#83d98c] font-bold text-xl">D</span>
            </div>
            <span className="font-bold text-xl">DailyMates</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-right mr-2 hidden sm:block">
              <p className="font-bold">{kid?.fullName || 'Kid Name'}</p>
              <p className="text-xs">Level {kid?.level || 1}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10 border-2 border-white/30">
                    <AvatarImage 
                      src={kid?.avatar  || '/placeholder.svg?height=40&width=40'} 
                      alt={kid?.fullName || 'Kid'} 
                    />
                    <AvatarFallback className="bg-white text-[#83d98c] font-bold">
                      {kid?.fullName ? kid.fullName.charAt(0).toUpperCase() : 'K'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-[#10b981] border-2 border-white rounded-full"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-0" align="end">
                {/* User Info Section */}
                <div className="bg-gradient-to-r from-[#10b981] to-[#059669] p-4 text-white">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white/30">
                      <AvatarImage 
                        src={kid?.avatar ? `/avatars/${kid.avatar}.png` : '/placeholder.svg?height=48&width=48'} 
                        alt={kid?.fullName || 'Kid'} 
                      />
                      <AvatarFallback className="bg-white text-[#10b981] font-bold">
                        {kid?.fullName ? kid.fullName.charAt(0).toUpperCase() : 'K'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{kid?.fullName || 'Kid Name'}</p>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                          Level {kid?.level || 1}
                        </span>
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                          {kid?.points || 0} điểm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <DropdownMenuItem asChild>
                    <Link href={`${kidBaseUrl}/profile`} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <div className="w-8 h-8 bg-[#ebfdf4] rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-[#10b981]" />
                      </div>
                      <div>
                        <p className="font-medium">Hồ sơ</p>
                        <p className="text-xs text-[#6b7280]">Xem thông tin cá nhân</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer text-[#ef4444] focus:text-[#ef4444]"
                  >
                    <div className="w-8 h-8 bg-[#fef2f2] rounded-full flex items-center justify-center">
                      <LogOut className="h-4 w-4 text-[#ef4444]" />
                    </div>
                    <div>
                      <p className="font-medium">Đăng xuất</p>
                      <p className="text-xs text-[#6b7280]">Thoát khỏi tài khoản</p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <nav className="container mx-auto px-4 mt-2">
          <div className="bg-white rounded-full p-1 flex justify-between">
            <NavItem href={kidBaseUrl} icon={<Home size={20} />} label="Home" />
            <NavItem href={`${kidBaseUrl}/courses`} icon={<BookOpen size={20} />} label="Courses" />
            <NavItem href={`${kidBaseUrl}/games`} icon={<GamepadIcon size={20} />} label="Games" />
            <NavItem href={`${kidBaseUrl}/rewards`} icon={<Award size={20} />} label="Rewards" />
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>

      <footer className="bg-white py-3 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#6b7280] text-sm">© 2025 DailyMates</p>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        size="sm"
        className="text-[#1e1e1e] hover:bg-[#eafff4] rounded-full flex gap-1 items-center"
      >
        <div className="bg-[#eafff4] p-1 rounded-full">{icon}</div>
        <span className="font-medium">{label}</span>
      </Button>
    </Link>
  );
}
