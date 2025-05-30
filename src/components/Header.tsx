'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'courses', label: 'Khóa học' },
    { id: 'features', label: 'Tính năng' },
    { id: 'premium', label: 'Premium' },
    { id: 'about', label: 'Giới thiệu' }
  ]

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl bg-gradient-to-r from-[#10b981] to-[#059669] bg-clip-text text-transparent">
                EduKids
              </span>
              <p className="text-xs text-gray-500">Học kỹ năng sống</p>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#10b981] shadow-md'
                    : 'text-gray-600 hover:text-[#10b981]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857]" asChild>
              <Link href="/signup">Đăng ký</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}