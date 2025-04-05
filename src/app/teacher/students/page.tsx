import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MoreHorizontal, Mail, Download } from "lucide-react";
import Image from "next/image";

const students = [
  {
    id: "STU-001",
    name: "Alex Johnson",
    class: "Class 3A",
    progress: 85,
    score: 92,
    lastActivity: "Today, 10:30 AM",
  },
  {
    id: "STU-002",
    name: "Emma Smith",
    class: "Class 3A",
    progress: 75,
    score: 85,
    lastActivity: "Yesterday, 3:15 PM",
  },
  {
    id: "STU-003",
    name: "Noah Williams",
    class: "Class 3A",
    progress: 60,
    score: 78,
    lastActivity: "2 days ago",
  },
  {
    id: "STU-004",
    name: "Olivia Brown",
    class: "Class 3A",
    progress: 45,
    score: 65,
    lastActivity: "Today, 9:45 AM",
  },
  {
    id: "STU-005",
    name: "Liam Davis",
    class: "Class 3A",
    progress: 80,
    score: 88,
    lastActivity: "Today, 11:20 AM",
  },
  {
    id: "STU-006",
    name: "Sophia Wilson",
    class: "Class 3B",
    progress: 90,
    score: 95,
    lastActivity: "Yesterday, 2:00 PM",
  },
  {
    id: "STU-007",
    name: "Jackson Miller",
    class: "Class 3B",
    progress: 70,
    score: 82,
    lastActivity: "Today, 8:30 AM",
  },
  {
    id: "STU-008",
    name: "Ava Taylor",
    class: "Class 3B",
    progress: 55,
    score: 72,
    lastActivity: "3 days ago",
  },
  {
    id: "STU-009",
    name: "Lucas Anderson",
    class: "Class 3B",
    progress: 40,
    score: 58,
    lastActivity: "Yesterday, 1:15 PM",
  },
  {
    id: "STU-010",
    name: "Mia Thomas",
    class: "Class 3B",
    progress: 95,
    score: 98,
    lastActivity: "Today, 10:00 AM",
  },
];

const activities = [
  {
    student: "Alex Johnson",
    action: "Completed Mathematics Quiz",
    time: "Today, 10:30 AM",
  },
  {
    student: "Emma Smith",
    action: "Submitted Science Assignment",
    time: "Yesterday, 3:15 PM",
  },
  {
    student: "Mia Thomas",
    action: "Started English Course",
    time: "Today, 10:00 AM",
  },
  {
    student: "Noah Williams",
    action: "Posted in Discussion Forum",
    time: "2 days ago",
  },
];

function getScoreColor(score: number) {
  if (score >= 90) {
    return "text-[#10b981] font-medium";
  } else if (score >= 70) {
    return "text-[#f59e0b] font-medium";
  } else if (score >= 50) {
    return "text-[#6b7280] font-medium";
  } else {
    return "text-[#ef4444] font-medium";
  }
}

export default function TeacherStudentsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">My Students</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Mail size={16} className="mr-1" />
            Message All
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search students..."
            className="pl-10 bg-white border-none"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Student List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Student</th>
                      <th className="text-left p-3">Class</th>
                      <th className="text-left p-3">Progress</th>
                      <th className="text-left p-3">Avg. Score</th>
                      <th className="text-left p-3">Last Activity</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#d9d9d9]">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt={student.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-[#6b7280]">
                                ID: {student.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{student.class}</td>
                        <td className="p-3">
                          <div className="w-full bg-[#e5e7eb] h-2 rounded-full max-w-[100px]">
                            <div
                              className="bg-[#702dff] h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-[#6b7280] mt-1">
                            {student.progress}%
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={getScoreColor(student.score)}>
                            {student.score}%
                          </span>
                        </td>
                        <td className="p-3">{student.lastActivity}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Message
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing 1-10 of 48 students
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would have similar content but filtered by status */}
        <TabsContent value="active" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Similar table but filtered for active students */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]">
                    Excellent (90-100%)
                  </span>
                  <span className="text-sm font-medium">12 students</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#10b981]"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]">Good (70-89%)</span>
                  <span className="text-sm font-medium">24 students</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#f59e0b]"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]">
                    Average (50-69%)
                  </span>
                  <span className="text-sm font-medium">8 students</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6b7280]"
                    style={{ width: "17%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]\">
                    Needs Improvement (50%)
                  </span>
                  <span className="text-sm font-medium">4 students</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ef4444]"
                    style={{ width: "8%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]">
                    Course Completion
                  </span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#702dff]"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]">
                    Assignment Submission
                  </span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#702dff]"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]">
                    Quiz Participation
                  </span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#702dff]"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#6b7280]">
                    Discussion Participation
                  </span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#702dff]"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#d9d9d9]">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt={activity.student}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{activity.student}</p>
                    <p className="text-sm text-[#6b7280]">{activity.action}</p>
                    <p className="text-xs text-[#6b7280]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
