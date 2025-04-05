"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Medal, PlayCircle, Star, LogOut } from "lucide-react";

export default function KidLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#ecffee] flex flex-col">
      {/* Header */}
      <header className="bg-[#10b981] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Kid mascot"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <h1 className="text-white font-bold text-xl">EduKids</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Star className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b]" />
            </div>
            <span className="text-white font-bold">123</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto p-4 md:p-8">{children}</main>

      {/* Navigation */}
      <nav className="bg-white shadow-lg p-2">
        <div className="container mx-auto flex justify-around">
          <NavLink
            href="/kid/dashboard"
            icon={<Home size={24} />}
            label="Home"
            active={pathname === "/kid/dashboard"}
          />
          <NavLink
            href="/kid/courses"
            icon={<BookOpen size={24} />}
            label="Learn"
            active={pathname.startsWith("/kid/courses")}
          />
          <NavLink
            href="/kid/games"
            icon={<PlayCircle size={24} />}
            label="Games"
            active={pathname.startsWith("/kid/games")}
          />
          <NavLink
            href="/kid/rewards"
            icon={<Medal size={24} />}
            label="Rewards"
            active={pathname.startsWith("/kid/rewards")}
          />
          <NavLink
            href="/kid-login"
            icon={<LogOut size={24} />}
            label="Exit"
            active={false}
          />
        </div>
      </nav>
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
    <Link href={href} className="flex flex-col items-center gap-1">
      <div
        className={`p-2 rounded-full ${
          active ? "bg-[#10b981] text-white" : "text-[#6b7280]"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-xs ${
          active ? "text-[#10b981] font-medium" : "text-[#6b7280]"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
