"use client";

import Link from "next/link"
import { Bell, BookOpen, CreditCard, Home, MessageSquare, Settings, Users, BarChart2, ExternalLink, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function ParentLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#8b5cf6] text-white border-b border-[#7c3aed]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/parent/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#8b5cf6] font-bold">E</span>
            </div>
            <span className="font-bold text-lg">EduKids Parent</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <NavItem href="/parent/dashboard" icon={<Home size={18} />} label="Dashboard" />
            <NavItem href="/parent/courses" icon={<BookOpen size={18} />} label="Courses" />
            <NavItem href="/parent/children" icon={<Users size={18} />} label="My Children" />
            <NavItem
              href="/environment-kid/parent-monitor"
              icon={<ExternalLink size={18} />}
              label="Kids Environment"
            />
            <NavItem href="/parent/premium" icon={<CreditCard size={18} />} label="Premium" />
            <NavItem href="/parent/messages" icon={<MessageSquare size={18} />} label="Messages" />
            <NavItem href="/parent/analytics" icon={<BarChart2 size={18} />} label="Analytics" />
            <NavItem href="/parent/settings" icon={<Settings size={18} />} label="Settings" />
            {/* <NavItem href="/parent/profile" icon={<Profile size={18} />} label="Profile" /> */}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell size={20} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#8b5cf6] transition-all duration-300">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Parent Name</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      parent@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/parent/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Hồ sơ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer text-red-600 focus:text-red-600">
                  <Link href={"/login"}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                  </Link>
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
          <p>© 2025 EduKids. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function NavItem({ href, icon, label }) {
  return (
    <Link href={href}>
      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex items-center gap-2 group transition-all duration-300 overflow-hidden">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <span className="whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100">
          {label}
        </span>
      </Button>
    </Link>
  )
}
