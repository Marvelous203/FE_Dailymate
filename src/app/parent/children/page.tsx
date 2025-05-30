import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, Clock, Edit, Plus, Settings, TrendingUp, Star, Trophy } from "lucide-react";

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
            <ChildProfile name="Alex Johnson" age={8} grade="3rd" avatar="A" color="from-[#fbbf24] to-[#f59e0b]" />
          </TabsContent>

          <TabsContent value="emma" className="mt-8">
            <ChildProfile name="Emma Johnson" age={6} grade="1st" avatar="E" color="from-[#ec4899] to-[#db2777]" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ChildProfile({
  name,
  age,
  grade,
  avatar,
  color,
}: {
  name: string;
  age: number;
  grade: string;
  avatar: string;
  color: string;
}) {
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
                  <TrendingUp className="h-3 w-3" />
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
          <TabsTrigger value="achievements" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Achievements</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
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
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1e293b]">Learning Progress</h3>
                <p className="text-[#64748b] max-w-md mx-auto">
                  Detailed progress tracking and analytics will be displayed here. Monitor your child's learning journey with comprehensive insights.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1e293b]">Achievements</h3>
                <p className="text-[#64748b] max-w-md mx-auto">
                  Celebrate your child's accomplishments! Achievements and badges will be displayed here to motivate continued learning.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#64748b] to-[#475569] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1e293b]">Account Settings</h3>
                <p className="text-[#64748b] max-w-md mx-auto">
                  Customize your child's learning experience. Account settings and preferences will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}