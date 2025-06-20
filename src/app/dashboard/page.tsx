import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  BookOpen,
  Calendar,
  Clock,
  Home,
  Settings,
  User,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-[#1dc994] flex-col p-4">
        <div className="flex items-center gap-2 mb-8 mt-4">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <h1 className="text-white font-bold text-xl">DailyMates</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-white bg-white/20 rounded-lg p-3"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 text-white hover:bg-white/10 rounded-lg p-3"
          >
            <BookOpen size={20} />
            <span>Courses</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 text-white hover:bg-white/10 rounded-lg p-3"
          >
            <Calendar size={20} />
            <span>Schedule</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 text-white hover:bg-white/10 rounded-lg p-3"
          >
            <BarChart size={20} />
            <span>Progress</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 text-white hover:bg-white/10 rounded-lg p-3"
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

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell size={24} />
            </Button>
            <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ebfdf4] rounded-full flex items-center justify-center">
                  <BookOpen className="text-[#10b981]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Courses</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#e0f2fe] rounded-full flex items-center justify-center">
                  <Clock className="text-[#0ea5e9]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Hours</p>
                  <h3 className="text-2xl font-bold">48</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ede9fe] rounded-full flex items-center justify-center">
                  <BarChart className="text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-[#6b7280]">Progress</p>
                  <h3 className="text-2xl font-bold">75%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="bg-white border-none shadow-sm overflow-hidden"
            >
              <div className="h-40 bg-[#d9d9d9]">
                <Image
                  src={`/placeholder.svg?height=160&width=320`}
                  alt="Course thumbnail"
                  width={320}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Mathematics for Kids</h3>
                <div className="flex items-center text-sm text-[#6b7280] mb-3">
                  <Clock size={16} className="mr-1" />
                  <span>4 hours</span>
                </div>
                <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
                  <div
                    className="bg-[#10b981] h-2 rounded-full"
                    style={{ width: `${65 + i * 10}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-[#6b7280]">Progress</span>
                  <span className="font-medium">{65 + i * 10}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bell(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 24, ...svgProps } = props;
  return (
    <svg
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
