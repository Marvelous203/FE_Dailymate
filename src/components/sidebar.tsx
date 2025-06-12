import Link from "next/link";
import {
  BarChart,
  BookOpen,
  Calendar,
  Home,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar({ activePage = "dashboard" }) {
  return (
    <div className="hidden md:flex w-64 bg-[#1dc994] flex-col p-4">
      <div className="flex items-center gap-2 mb-8 mt-4">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <h1 className="text-white font-bold text-xl">DailyMates</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 text-white ${activePage === "dashboard" ? "bg-white/20" : "hover:bg-white/10"
            } rounded-lg p-3`}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/courses"
          className={`flex items-center gap-3 text-white ${activePage === "courses" ? "bg-white/20" : "hover:bg-white/10"
            } rounded-lg p-3`}
        >
          <BookOpen size={20} />
          <span>Courses</span>
        </Link>
        <Link
          href="/schedule"
          className={`flex items-center gap-3 text-white ${activePage === "schedule" ? "bg-white/20" : "hover:bg-white/10"
            } rounded-lg p-3`}
        >
          <Calendar size={20} />
          <span>Schedule</span>
        </Link>
        <Link
          href="/analytics"
          className={`flex items-center gap-3 text-white ${activePage === "analytics" ? "bg-white/20" : "hover:bg-white/10"
            } rounded-lg p-3`}
        >
          <BarChart size={20} />
          <span>Analytics</span>
        </Link>
        <Link
          href="/profile"
          className={`flex items-center gap-3 text-white ${activePage === "profile" ? "bg-white/20" : "hover:bg-white/10"
            } rounded-lg p-3`}
        >
          <User size={20} />
          <span>Profile</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center gap-3 text-white ${activePage === "settings" ? "bg-white/20" : "hover:bg-white/10"
            } rounded-lg p-3`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 text-white hover:bg-white/10 rounded-lg p-3"
        >
          <User size={20} />
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
}
