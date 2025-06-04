"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, Clock, Edit, Settings, Star, Trophy } from "lucide-react";
import { ChildProfileProps } from "./types";
import { CourseTab } from "./CourseTab";
import { ProgressTab } from "./ProgressTab";
import { TimeManagementTab } from "./TimeManagementTab";
import { GoalsTab } from "./GoalsTab";
import { AchievementsTab } from "./AchievementsTab";
import { SettingsTab } from "./SettingsTab";

export function ChildProfile({
  name,
  age,
  grade,
  avatar,
  color,
  progressData,
}: ChildProfileProps) {
  return (
    <div className="space-y-8">
      {/* Child Overview */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-bold shadow-xl ring-4 ring-white/50`}>
                {avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1e293b] mb-1">{name}</h2>
                <div className="flex items-center gap-4 text-[#64748b]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {age} years old
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Grade {grade}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#10b981] rounded-xl">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-[#065f46]">Courses</span>
                </div>
                <p className="text-3xl font-bold text-[#065f46] mb-1">4</p>
                <p className="text-sm text-[#047857] flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Active courses
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#8b5cf6] rounded-xl">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-[#581c87]">Time</span>
                </div>
                <p className="text-3xl font-bold text-[#581c87] mb-1">12h</p>
                <p className="text-sm text-[#7c3aed] flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  This week
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#0ea5e9] rounded-xl">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-[#0c4a6e]">Achievements</span>
                </div>
                <p className="text-3xl font-bold text-[#0c4a6e] mb-1">8</p>
                <p className="text-sm text-[#0284c7] flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Total earned
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline" className="flex items-center gap-2 border-2 border-[#e2e8f0] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300">
              <Edit size={16} />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-2 border-[#e2e8f0] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300">
              <Settings size={16} />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Child Tabs */}
      <Tabs defaultValue="courses">
        <TabsList className="bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 rounded-xl p-1 mb-8">
          <TabsTrigger value="courses" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Courses</TabsTrigger>
          <TabsTrigger value="progress" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Progress</TabsTrigger>
          <TabsTrigger value="time-management" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Time Management</TabsTrigger>
          <TabsTrigger value="goals" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Goals</TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Achievements</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
          <CourseTab />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <ProgressTab progressData={progressData} />
        </TabsContent>

        <TabsContent value="time-management" className="mt-6">
          <TimeManagementTab />
        </TabsContent>

        <TabsContent value="goals" className="mt-6">
          <GoalsTab />
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <AchievementsTab />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}