"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LearningCalendar } from "@/components/learning-calendar";
import { Clock, Calendar, Settings, Save } from "lucide-react";

export function TimeManagementTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Lịch Học tập */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1e293b]">Lịch Học tập</h3>
            <Button variant="outline" className="flex items-center gap-2 border-2 border-[#e2e8f0] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300">
              <Calendar size={16} />
              Thêm Sự kiện
            </Button>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <LearningCalendar />
          </div>
        </CardContent>
      </Card>

      {/* Giới hạn Thời gian Hàng ngày */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Giới hạn Thời gian Hàng ngày</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#64748b]">Thời gian học tối đa</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input type="number" placeholder="120" className="border-2 border-[#e2e8f0] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20" />
                </div>
                <span className="text-[#64748b]">phút/ngày</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#64748b]">Thời gian nghỉ giải lao</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input type="number" placeholder="15" className="border-2 border-[#e2e8f0] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20" />
                </div>
                <span className="text-[#64748b]">phút sau mỗi</span>
                <div className="w-20">
                  <Input type="number" placeholder="45" className="border-2 border-[#e2e8f0] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/20" />
                </div>
                <span className="text-[#64748b]">phút học</span>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] text-white flex items-center justify-center gap-2">
                <Save size={16} />
                Lưu Cài đặt
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lịch trình Học tập */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Lịch trình Học tập</h3>
          <div className="space-y-4">
            {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"].map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium text-[#1e293b]">{day}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#64748b]">2 giờ</span>
                  <Button variant="outline" size="sm" className="h-8 border-2 border-[#e2e8f0] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300">
                    <Settings size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Thời gian Nghỉ giải lao */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Thời gian Nghỉ giải lao</h3>
          <div className="space-y-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#8b5cf6]/10 rounded-full">
                  <Clock className="h-6 w-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1e293b]">Giải lao Ngắn</h4>
                  <p className="text-sm text-[#64748b]">5-10 phút sau mỗi 25 phút học</p>
                </div>
              </div>
              <p className="text-sm text-[#64748b]">
                Nghỉ ngắn giúp tăng sự tập trung và giảm mệt mỏi trong quá trình học tập.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#8b5cf6]/10 rounded-full">
                  <Clock className="h-6 w-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1e293b]">Giải lao Dài</h4>
                  <p className="text-sm text-[#64748b]">15-30 phút sau mỗi 2 giờ học</p>
                </div>
              </div>
              <p className="text-sm text-[#64748b]">
                Nghỉ dài giúp não bộ xử lý thông tin và cải thiện khả năng ghi nhớ dài hạn.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}