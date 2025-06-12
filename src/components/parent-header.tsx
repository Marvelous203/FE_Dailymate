import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellIcon, Menu } from "lucide-react";

export default function ParentHeader() {
  return (
    <header className="bg-[#8b5cf6] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <h1 className="font-bold text-xl">DailyMates</h1>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/parent/dashboard"
            className="text-white hover:text-white/80"
          >
            Dashboard
          </Link>
          <Link
            href="/parent/courses"
            className="text-white hover:text-white/80"
          >
            Courses
          </Link>
          <Link
            href="/parent/premium"
            className="text-white hover:text-white/80"
          >
            Premium
          </Link>
          <Link href="/parent/join" className="text-white hover:text-white/80">
            Join Kids Mode
          </Link>
          <Link
            href="/parent/support"
            className="text-white hover:text-white/80"
          >
            Support
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <BellIcon size={20} />
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
            <span>Parent Account</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
