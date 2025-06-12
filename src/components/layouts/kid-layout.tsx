import Link from "next/link"
import { Award, BookOpen, GamepadIcon, Home, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function KidLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#eafff4]">
      <header className="bg-[#83d98c] text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/environment-kid/kid-learning-zone" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#83d98c] font-bold text-xl">E</span>
            </div>
            <span className="font-bold text-xl">DailyMates</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-right mr-2 hidden sm:block">
              <p className="font-bold">Alex</p>
              <p className="text-xs">Level 5</p>
            </div>

            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Kid" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <nav className="container mx-auto px-4 mt-2">
          <div className="bg-white rounded-full p-1 flex justify-between">
            <NavItem href="/environment-kid/kid-learning-zone" icon={<Home size={20} />} label="Home" />
            <NavItem href="/environment-kid/kid-learning-zone/courses" icon={<BookOpen size={20} />} label="Courses" />
            <NavItem href="/environment-kid/kid-learning-zone/games" icon={<GamepadIcon size={20} />} label="Games" />
            <NavItem href="/environment-kid/kid-learning-zone/rewards" icon={<Award size={20} />} label="Rewards" />
            <NavItem href="/environment-kid/login" icon={<LogOut size={20} />} label="Exit" />
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
  )
}

function NavItem({ href, icon, label }) {
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
  )
}
