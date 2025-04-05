import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, Clock, Edit, Plus, Settings } from "lucide-react";

export default function ParentChildrenPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">My Children</h1>
        <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
          <Plus className="mr-2 h-4 w-4" /> Add Child
        </Button>
      </div>

      {/* Child Selector */}
      <Tabs defaultValue="alex" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="alex" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d9d9d9] rounded-full"></div>
            Alex
          </TabsTrigger>
          <TabsTrigger value="emma" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d9d9d9] rounded-full"></div>
            Emma
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alex" className="mt-6">
          <ChildProfile name="Alex Johnson" age={8} grade="3rd" />
        </TabsContent>

        <TabsContent value="emma" className="mt-6">
          <ChildProfile name="Emma Johnson" age={6} grade="1st" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChildProfile({
  name,
  age,
  grade,
}: {
  name: string;
  age: number;
  grade: string;
}) {
  return (
    <div className="space-y-8">
      {/* Child Overview */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d9d9d9]">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Child"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-[#6b7280]">Age: {age} years</p>
                <p className="text-[#6b7280]">Grade: {grade}</p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-8">
              <div className="bg-[#ebfdf4] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-5 w-5 text-[#10b981]" />
                  <span className="font-medium">Courses</span>
                </div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-[#6b7280]">Active courses</p>
              </div>

              <div className="bg-[#ede9fe] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-[#8b5cf6]" />
                  <span className="font-medium">Time</span>
                </div>
                <p className="text-2xl font-bold">12h</p>
                <p className="text-sm text-[#6b7280]">This week</p>
              </div>

              <div className="bg-[#e0f2fe] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-5 w-5 text-[#0ea5e9]" />
                  <span className="font-medium">Achievements</span>
                </div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-[#6b7280]">Total earned</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Edit size={16} />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Child Tabs */}
      <Tabs defaultValue="courses">
        <TabsList className="bg-white">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Card 1 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="w-full h-40 bg-[#f3f4f6] rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-[#8b5cf6]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Mathematics</h3>
                  <p className="text-[#6b7280] text-sm mb-4">
                    Basic arithmetic and problem solving
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#6b7280]">Progress</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                      <div
                        className="bg-[#8b5cf6] h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Card 2 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="w-full h-40 bg-[#f3f4f6] rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-[#10b981]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Science</h3>
                  <p className="text-[#6b7280] text-sm mb-4">
                    Introduction to basic scientific concepts
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#6b7280]">Progress</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                      <div
                        className="bg-[#10b981] h-2 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Card 3 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="w-full h-40 bg-[#f3f4f6] rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-[#0ea5e9]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Language Arts</h3>
                  <p className="text-[#6b7280] text-sm mb-4">
                    Reading comprehension and writing skills
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#6b7280]">Progress</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                      <div
                        className="bg-[#0ea5e9] h-2 rounded-full"
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
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
              <p className="text-[#6b7280]">
                Progress tracking and analytics will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <p className="text-[#6b7280]">
                Achievements and badges will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <p className="text-[#6b7280]">
                Account settings and preferences will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
