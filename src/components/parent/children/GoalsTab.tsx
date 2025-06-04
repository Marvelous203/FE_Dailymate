"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, Calendar, Edit, CheckCircle, Clock } from "lucide-react";

export function GoalsTab() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#1e293b]">Mục tiêu Học tập</h3>
        <Button className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] text-white flex items-center gap-2">
          <PlusCircle size={16} />
          Thêm Mục tiêu
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goal Card 1 */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-full">
                  <Target className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <h4 className="font-semibold text-[#1e293b]">Hoàn thành khóa học Toán</h4>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#64748b] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/5">
                <Edit size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#64748b]">Tiến độ</span>
                <span className="text-sm font-bold text-[#8b5cf6]">65%</span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: "65%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-sm text-[#64748b]">
                  <Calendar size={14} />
                  <span>Hạn: 30/06/2023</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-[#10b981]">
                  <CheckCircle size={14} />
                  <span>Đang tiến hành</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal Card 2 */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-full">
                  <Target className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <h4 className="font-semibold text-[#1e293b]">Đọc 5 sách khoa học</h4>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#64748b] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/5">
                <Edit size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#64748b]">Tiến độ</span>
                <span className="text-sm font-bold text-[#8b5cf6]">20%</span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: "20%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-sm text-[#64748b]">
                  <Calendar size={14} />
                  <span>Hạn: 15/07/2023</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-[#f59e0b]">
                  <Clock size={14} />
                  <span>Mới bắt đầu</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal Card 3 */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-full">
                  <Target className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <h4 className="font-semibold text-[#1e293b]">Hoàn thành dự án khoa học</h4>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#64748b] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/5">
                <Edit size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#64748b]">Tiến độ</span>
                <span className="text-sm font-bold text-[#8b5cf6]">50%</span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: "50%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-sm text-[#64748b]">
                  <Calendar size={14} />
                  <span>Hạn: 10/08/2023</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-[#10b981]">
                  <CheckCircle size={14} />
                  <span>Đang tiến hành</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}