"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { ChildProfile } from "@/components/parent/children/ChildProfile";
import { ChildProgressData } from "@/components/parent/children/types";

// Dữ liệu mẫu cho tiến độ học tập
const sampleProgressData: ChildProgressData = {
  subjects: [
    { subject: 'Toán', progress: 65, lastActivity: '2023-06-10', timeSpent: 320, score: 85 },
    { subject: 'Khoa học', progress: 42, lastActivity: '2023-06-08', timeSpent: 180, score: 78 },
    { subject: 'Ngôn ngữ', progress: 78, lastActivity: '2023-06-12', timeSpent: 240, score: 92 },
    { subject: 'Lịch sử', progress: 30, lastActivity: '2023-06-05', timeSpent: 120, score: 70 },
    { subject: 'Nghệ thuật', progress: 55, lastActivity: '2023-06-09', timeSpent: 150, score: 88 },
  ],
  skills: [
    { name: 'Tư duy phản biện', level: 4, progress: 65 },
    { name: 'Giải quyết vấn đề', level: 3, progress: 45 },
    { name: 'Sáng tạo', level: 5, progress: 80 },
    { name: 'Giao tiếp', level: 4, progress: 70 },
  ],
  weeklyActivity: [
    { day: 'CN', minutes: 30 },
    { day: 'T2', minutes: 45 },
    { day: 'T3', minutes: 60 },
    { day: 'T4', minutes: 30 },
    { day: 'T5', minutes: 75 },
    { day: 'T6', minutes: 45 },
    { day: 'T7', minutes: 90 },
  ],
  monthlyProgress: [
    { week: 'Tuần 1', progress: 25 },
    { week: 'Tuần 2', progress: 40 },
    { week: 'Tuần 3', progress: 55 },
    { week: 'Tuần 4', progress: 65 },
  ],
};

export default function ParentChildrenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
              My Children
            </h1>
            <p className="text-[#64748b] mt-1">Manage and track your children's learning progress</p>
          </div>
          <Button className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Add Child
          </Button>
        </div>

        {/* Child Selector */}
        <Tabs defaultValue="alex" className="mb-8">
          <TabsList className="bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 rounded-xl p-1">
            <TabsTrigger value="alex" className="flex items-center gap-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                A
              </div>
              <span className="font-medium">Alex</span>
            </TabsTrigger>
            <TabsTrigger value="emma" className="flex items-center gap-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ec4899] to-[#db2777] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                E
              </div>
              <span className="font-medium">Emma</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alex" className="mt-8">
            <ChildProfile 
              name="Alex Johnson" 
              age={8} 
              grade="3rd" 
              avatar="A" 
              color="from-[#fbbf24] to-[#f59e0b]" 
              progressData={sampleProgressData} 
            />
          </TabsContent>

          <TabsContent value="emma" className="mt-8">
            <ChildProfile 
              name="Emma Johnson" 
              age={6} 
              grade="1st" 
              avatar="E" 
              color="from-[#ec4899] to-[#db2777]" 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}