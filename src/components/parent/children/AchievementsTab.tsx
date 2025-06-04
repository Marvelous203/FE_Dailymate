"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Trophy, BookOpen, Brain, Zap } from "lucide-react";

export function AchievementsTab() {
  return (
    <div className="space-y-8">
      {/* Thành tích Nổi bật */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Thành tích Nổi bật</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center">
              <div className="p-4 bg-[#f59e0b] rounded-full mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-[#92400e] mb-2">Học sinh Xuất sắc</h4>
              <p className="text-sm text-[#b45309]">Hoàn thành xuất sắc tất cả các khóa học trong tháng</p>
              <Badge className="mt-4 bg-[#f59e0b] hover:bg-[#d97706] text-white">Đạt được 15/05/2023</Badge>
            </div>

            <div className="bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center">
              <div className="p-4 bg-[#0ea5e9] rounded-full mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-[#0c4a6e] mb-2">Sao Toán học</h4>
              <p className="text-sm text-[#0369a1]">Đạt điểm tuyệt đối trong bài kiểm tra Toán học</p>
              <Badge className="mt-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white">Đạt được 10/06/2023</Badge>
            </div>

            <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center">
              <div className="p-4 bg-[#10b981] rounded-full mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-[#065f46] mb-2">Nhà Khoa học Nhỏ</h4>
              <p className="text-sm text-[#047857]">Hoàn thành dự án khoa học đầu tiên</p>
              <Badge className="mt-4 bg-[#10b981] hover:bg-[#059669] text-white">Đạt được 22/06/2023</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tất cả Thành tích */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Tất cả Thành tích</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Achievement 1 */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#8b5cf6]/10 rounded-full">
                <Trophy className="h-6 w-6 text-[#8b5cf6]" />
              </div>
              <div>
                <h4 className="font-medium text-[#1e293b]">Học sinh Xuất sắc</h4>
                <p className="text-xs text-[#64748b]">Đạt được 15/05/2023</p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#0ea5e9]/10 rounded-full">
                <Star className="h-6 w-6 text-[#0ea5e9]" />
              </div>
              <div>
                <h4 className="font-medium text-[#1e293b]">Sao Toán học</h4>
                <p className="text-xs text-[#64748b]">Đạt được 10/06/2023</p>
              </div>
            </div>

            {/* Achievement 3 */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#10b981]/10 rounded-full">
                <Award className="h-6 w-6 text-[#10b981]" />
              </div>
              <div>
                <h4 className="font-medium text-[#1e293b]">Nhà Khoa học Nhỏ</h4>
                <p className="text-xs text-[#64748b]">Đạt được 22/06/2023</p>
              </div>
            </div>

            {/* Achievement 4 */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#f59e0b]/10 rounded-full">
                <BookOpen className="h-6 w-6 text-[#f59e0b]" />
              </div>
              <div>
                <h4 className="font-medium text-[#1e293b]">Đọc giả Nhiệt tình</h4>
                <p className="text-xs text-[#64748b]">Đạt được 05/07/2023</p>
              </div>
            </div>

            {/* Achievement 5 */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#ec4899]/10 rounded-full">
                <Brain className="h-6 w-6 text-[#ec4899]" />
              </div>
              <div>
                <h4 className="font-medium text-[#1e293b]">Tư duy Sáng tạo</h4>
                <p className="text-xs text-[#64748b]">Đạt được 18/07/2023</p>
              </div>
            </div>

            {/* Achievement 6 */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#6366f1]/10 rounded-full">
                <Zap className="h-6 w-6 text-[#6366f1]" />
              </div>
              <div>
                <h4 className="font-medium text-[#1e293b]">Học tập Liên tục</h4>
                <p className="text-xs text-[#64748b]">Đạt được 30/07/2023</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thành tích Sắp đạt được */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Thành tích Sắp đạt được</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#8b5cf6]/10 rounded-full">
                <Trophy className="h-6 w-6 text-[#8b5cf6]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#1e293b]">Chuyên gia Toán học</h4>
                <p className="text-xs text-[#64748b] mb-2">Hoàn thành tất cả các bài học Toán nâng cao</p>
                <div className="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-xs text-[#8b5cf6] mt-1 text-right">75%</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-[#0ea5e9]/10 rounded-full">
                <Star className="h-6 w-6 text-[#0ea5e9]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#1e293b]">Nhà Thám hiểm Khoa học</h4>
                <p className="text-xs text-[#64748b] mb-2">Hoàn thành 10 thí nghiệm khoa học</p>
                <div className="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <p className="text-xs text-[#0ea5e9] mt-1 text-right">40%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}