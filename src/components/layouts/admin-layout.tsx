import Link from "next/link"
import { Bell, BookOpen, Home, LineChart, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#f15f6c] text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/admin-dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#f15f6c] font-bold">E</span>
            </div>
            <span className="font-bold text-lg">EduKids</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell size={20} />
            </Button>

            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <nav className="container mx-auto px-4 py-1">
          <ul className="flex space-x-1 overflow-x-auto pb-2">
            <NavItem href="/admin-dashboard" icon={<Home size={18} />} label="Dashboard" />
            <NavItem href="/admin/users" icon={<Users size={18} />} label="Users" />
            <NavItem href="/admin/courses" icon={<BookOpen size={18} />} label="Courses" />
            <NavItem href="/admin/analytics" icon={<LineChart size={18} />} label="Analytics" />
            <NavItem href="/admin/profile" icon={<User size={18} />} label="Profile" />
            <NavItem href="/admin/settings" icon={<Settings size={18} />} label="Settings" />
          </ul>
        </nav>
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
