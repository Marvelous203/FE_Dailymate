'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Star, Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">DailyMates</span>
            </div>
            <p className="text-gray-300 mb-4">
              Nền tảng giáo dục kỹ năng sống hàng đầu cho trẻ em Việt Nam
            </p>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Khóa học</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Trò chơi</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Theo dõi tiến độ</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Cộng đồng</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Liên hệ</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Cộng đồng</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Pháp lý</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Điều khoản</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Bảo mật</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Cookie</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>© 2025 DailyMates. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </motion.footer>
  )
}