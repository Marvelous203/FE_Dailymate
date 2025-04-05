"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  BookOpen,
  Calendar,
  Grid,
  MessageSquare,
  Settings,
  Users,
  LogOut,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-[#702dff] flex-col p-4">
        <div className="flex items-center gap-2 mb-8 mt-4">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <h1 className="text-white font-bold text-xl">EduKids Teacher</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavLink
            href="/teacher/dashboard"
            icon={<Grid size={20} />}
            label="Dashboard"
            active={pathname === "/teacher/dashboard"}
          />
          <NavLink
            href="/teacher/courses"
            icon={<BookOpen size={20} />}
            label="My Courses"
            active={pathname.startsWith("/teacher/courses")}
          />
          <NavLink
            href="/teacher/students"
            icon={<Users size={20} />}
            label="Students"
            active={pathname.startsWith("/teacher/students")}
          />
          <NavLink
            href="/teacher/schedule"
            icon={<Calendar size={20} />}
            label="Schedule"
            active={pathname.startsWith("/teacher/schedule")}
          />
          <NavLink
            href="/teacher/messages"
            icon={<MessageSquare size={20} />}
            label="Messages"
            active={pathname.startsWith("/teacher/messages")}
          />
          <NavLink
            href="/teacher/analytics"
            icon={<BarChart size={20} />}
            label="Analytics"
            active={pathname.startsWith("/teacher/analytics")}
          />
          <NavLink
            href="/teacher/settings"
            icon={<Settings size={20} />}
            label="Settings"
            active={pathname.startsWith("/teacher/settings")}
          />
        </nav>

        <div className="mt-auto">
          <Link
            href="/"
            className="flex items-center gap-3 text-white hover:bg-white/10 rounded-lg p-3"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1e1e1e]">
              Teacher Portal
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell size={20} />
              </Button>
              <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 text-white ${
        active ? "bg-white/20" : "hover:bg-white/10"
      } rounded-lg p-3`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
