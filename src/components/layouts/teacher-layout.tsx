'use client';

import Link from "next/link"
import { Bell, BookOpen, Home, MessageSquare, Settings, User, Users, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#4dacc4] text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/teacher/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#4dacc4] font-bold">E</span>
            </div>
            <span className="font-bold text-lg">DailyMates</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell size={20} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Teacher" />
                    <AvatarFallback>{user?.name?.charAt(0)?.toUpperCase() || 'T'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex flex-col items-start">
                  <div className="font-medium">{user?.name || 'Teacher'}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/teacher/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/teacher/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <nav className="container mx-auto px-4 py-1">
          <ul className="flex space-x-1 overflow-x-auto pb-2">
            <NavItem href="/teacher/dashboard" icon={<Home size={18} />} label="Dashboard" />
            <NavItem href="/teacher/courses" icon={<BookOpen size={18} />} label="Courses" />
            <NavItem href="/teacher/students" icon={<Users size={18} />} label="Students" />
            <NavItem href="/teacher/messages" icon={<MessageSquare size={18} />} label="Messages" />
            <NavItem href="/teacher/profile" icon={<User size={18} />} label="Profile" />
            <NavItem href="/teacher/settings" icon={<Settings size={18} />} label="Settings" />
          </ul>
        </nav>
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
  )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <li>
      <Link href={href}>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex gap-1 items-center">
          {icon}
          <span>{label}</span>
        </Button>
      </Link>
    </li>
  )
}
