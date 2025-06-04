"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function CourseTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Course Card 1 */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-6 relative">
          <div className="flex flex-col h-full">
            <div className="w-full h-48 bg-gradient-to-br from-[#8b5cf6]/10 to-[#7c3aed]/10 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] opacity-10"></div>
              <BookOpen className="h-16 w-16 text-[#8b5cf6] relative z-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#1e293b]">Mathematics</h3>
            <p className="text-[#64748b] text-sm mb-6 flex-grow">
              Basic arithmetic and problem solving with interactive exercises
            </p>
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#64748b]">Progress</span>
                <span className="text-sm font-bold text-[#8b5cf6]">65%</span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Card 2 */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-[#059669]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-6 relative">
          <div className="flex flex-col h-full">
            <div className="w-full h-48 bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#059669] opacity-10"></div>
              <BookOpen className="h-16 w-16 text-[#10b981] relative z-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#1e293b]">Science</h3>
            <p className="text-[#64748b] text-sm mb-6 flex-grow">
              Introduction to basic scientific concepts and experiments
            </p>
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#64748b]">Progress</span>
                <span className="text-sm font-bold text-[#10b981]">42%</span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#10b981] to-[#059669] h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Card 3 */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/5 to-[#0284c7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-6 relative">
          <div className="flex flex-col h-full">
            <div className="w-full h-48 bg-gradient-to-br from-[#0ea5e9]/10 to-[#0284c7]/10 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] opacity-10"></div>
              <BookOpen className="h-16 w-16 text-[#0ea5e9] relative z-10" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#1e293b]">Language Arts</h3>
            <p className="text-[#64748b] text-sm mb-6 flex-grow">
              Reading comprehension and creative writing skills
            </p>
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#64748b]">Progress</span>
                <span className="text-sm font-bold text-[#0ea5e9]">78%</span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}