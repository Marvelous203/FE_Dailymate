import Link from "next/link"
import { Bell, Clock, Home, MessageSquare, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function KidParentLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#eafff4]">
      <header className="bg-[#83d98c] text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/environment-kid/parent-monitor" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#83d98c] font-bold text-xl">E</span>
            </div>
            <span className="font-bold text-xl">DailyMates</span>
            <span className="text-sm bg-white text-[#83d98c] px-2 py-1 rounded-full">Parent Mode</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell size={20} />
            </Button>

            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Parent" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <nav className="container mx-auto px-4 mt-2">
          <div className="bg-white rounded-full p-1 flex justify-between">
            <NavItem href="/environment-kid/parent-monitor" icon={<Home size={18} />} label="Dashboard" />
            <NavItem
              href="/environment-kid/parent-monitor/progress"
              icon={<Clock size={18} />}
              label="Time & Progress"
            />
            <NavItem
              href="/environment-kid/parent-monitor/messages"
              icon={<MessageSquare size={18} />}
              label="Messages"
            />
            <NavItem href="/environment-kid/parent-monitor/settings" icon={<Settings size={18} />} label="Settings" />
            <NavItem href="/parent-dashboard" icon={<User size={18} />} label="Main Account" />
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
