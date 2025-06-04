"use client";

import { Card, CardContent } from "@/components/ui/card";
import { WeeklyActivityChart, SubjectProgressChart, ProgressTrendChart } from "@/components/charts/learning-charts";
import { ChildProgressData } from "./types";

interface ProgressTabProps {
  progressData?: ChildProgressData;
}

export function ProgressTab({ progressData }: ProgressTabProps) {
  // Sử dụng dữ liệu mẫu nếu không có dữ liệu được truyền vào
  const data = progressData || {
    subjects: [
      { subject: "Toán", progress: 65, lastActivity: "2 ngày trước", timeSpent: 120, score: 85 },
      { subject: "Khoa học", progress: 42, lastActivity: "1 ngày trước", timeSpent: 90, score: 72 },
      { subject: "Ngôn ngữ", progress: 78, lastActivity: "Hôm nay", timeSpent: 150, score: 90 },
      { subject: "Nghệ thuật", progress: 55, lastActivity: "3 ngày trước", timeSpent: 60, score: 80 },
      { subject: "Thể dục", progress: 70, lastActivity: "2 ngày trước", timeSpent: 45, score: 88 },
    ],
    skills: [
      { name: "Tư duy phản biện", level: 4, progress: 65 },
      { name: "Giải quyết vấn đề", level: 3, progress: 42 },
      { name: "Sáng tạo", level: 5, progress: 78 },
      { name: "Làm việc nhóm", level: 4, progress: 55 },
      { name: "Giao tiếp", level: 3, progress: 70 },
    ],
    weeklyActivity: [
      { day: "T2", minutes: 45 },
      { day: "T3", minutes: 60 },
      { day: "T4", minutes: 30 },
      { day: "T5", minutes: 75 },
      { day: "T6", minutes: 90 },
      { day: "T7", minutes: 120 },
      { day: "CN", minutes: 60 },
    ],
    monthlyProgress: [
      { week: "Tuần 1", progress: 25 },
      { week: "Tuần 2", progress: 40 },
      { week: "Tuần 3", progress: 55 },
      { week: "Tuần 4", progress: 65 },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Hoạt động Hàng tuần */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Hoạt động Hàng tuần</h3>
          <div className="h-80">
            <WeeklyActivityChart data={data.weeklyActivity} />
          </div>
        </CardContent>
      </Card>

      {/* Tiến độ Môn học */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Tiến độ Môn học</h3>
          <div className="h-80">
            <SubjectProgressChart data={data.subjects} />
          </div>
        </CardContent>
      </Card>

      {/* Phát triển Kỹ năng */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Phát triển Kỹ năng</h3>
          <div className="space-y-6">
            {data.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#1e293b]">{skill.name}</span>
                  <span className="text-sm font-bold text-[#8b5cf6]">Cấp độ {skill.level}/10</span>
                </div>
                <div className="w-full bg-[#e2e8f0] rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Xu hướng Tiến độ */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Xu hướng Tiến độ</h3>
          <div className="h-80">
            <ProgressTrendChart data={data.monthlyProgress} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}