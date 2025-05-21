import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Clock, MessageSquare, Settings, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ParentMonitorPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Kid's Environment - Parent Monitor</h1>
          <p className="text-[#6b7280]">Monitor and manage your child's learning environment</p>
        </div>

        <div className="flex gap-3">
          <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" asChild>
            <Link href="/parent-dashboard">
              <span>Back to Main Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Child Selector */}
      <Tabs defaultValue="alex" className="w-full">
        <TabsList className="bg-white w-full justify-start overflow-x-auto">
          <TabsTrigger value="alex" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d1fae5] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#10b981]">A</span>
            </div>
            Alex
          </TabsTrigger>
          <TabsTrigger value="emma" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#feccd6] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#f15f6c]">E</span>
            </div>
            Emma
          </TabsTrigger>
          <TabsTrigger value="noah" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d7ebf0] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#4dacc4]">N</span>
            </div>
            Noah
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alex" className="mt-6">
          <ChildMonitor name="Alex Johnson" />
        </TabsContent>

        <TabsContent value="emma" className="mt-6">
          <ChildMonitor name="Emma Johnson" />
        </TabsContent>

        <TabsContent value="noah" className="mt-6">
          <ChildMonitor name="Noah Johnson" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChildMonitor({ name }) {
  return (
    <div className="space-y-6">
      {/* Child Overview */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d1fae5]">
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
                <p className="text-[#6b7280]">Last active: Today, 3:45 PM</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" className="bg-[#83d98c] hover:bg-[#6bc275]">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Parental Controls
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-8">
              <div className="bg-[#ebfdf4] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-[#10b981]" />
                  <span className="font-medium">Time Today</span>
                </div>
                <p className="text-2xl font-bold">1h 45m</p>
                <p className="text-sm text-[#6b7280]">Daily limit: 2h</p>
              </div>

              <div className="bg-[#ede9fe] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                  <span className="font-medium">Lessons</span>
                </div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-[#6b7280]">Completed today</p>
              </div>

              <div className="bg-[#e0f2fe] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-5 w-5 text-[#0ea5e9]" />
                  <span className="font-medium">Stars</span>
                </div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-[#6b7280]">Earned today</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Management */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Time Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-medium">Daily Screen Time</h3>
                  <p className="text-sm text-[#6b7280]">Today's usage: 1h 45m / 2h limit</p>
                </div>
                <Button size="sm" variant="outline">
                  Adjust Limit
                </Button>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Weekly Usage</h3>
                <div className="flex h-40 items-end gap-2">
                  {[35, 45, 60, 105, 75, 90, 45].map((minutes, i) => (
                    <div key={i} className="relative flex h-full w-full flex-col items-center">
                      <div
                        className="absolute bottom-0 w-full max-w-12 rounded-t bg-[#83d98c]"
                        style={{ height: `${(minutes / 120) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <div key={i} className="text-xs text-[#6b7280]">
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Time Spent by Activity</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Courses</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full bg-[#83d98c]" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Games</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8b5cf6]" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Rewards</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full bg-[#f59e0b]" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Progress */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {courses.map((course, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-[#6b7280]">{course.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{course.progress}%</p>
                    <p className="text-sm text-[#6b7280]">
                      {course.completed}/{course.total} lessons
                    </p>
                  </div>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor} flex-shrink-0`}
                >
                  {activity.icon}
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-[#6b7280]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const courses = [
  {
    title: "Problem Solving for Kids",
    category: "Life Skills",
    progress: 65,
    completed: 8,
    total: 12,
  },
  {
    title: "Emotional Intelligence",
    category: "Social Skills",
    progress: 30,
    completed: 5,
    total: 18,
  },
  {
    title: "Communication Skills",
    category: "Social Skills",
    progress: 100,
    completed: 15,
    total: 15,
  },
]

const activities = [
  {
    title: "Completed 'Finding Solutions' lesson",
    time: "Today, 3:30 PM",
    bgColor: "bg-[#ebfdf4]",
    icon: <BookOpen className="h-5 w-5 text-[#10b981]" />,
  },
  {
    title: "Earned 15 stars in Problem Solving Quiz",
    time: "Today, 2:15 PM",
    bgColor: "bg-[#ede9fe]",
    icon: <TrendingUp className="h-5 w-5 text-[#8b5cf6]" />,
  },
  {
    title: "Started Communication Skills course",
    time: "Today, 10:45 AM",
    bgColor: "bg-[#fff7ed]",
    icon: <BookOpen className="h-5 w-5 text-[#f59e0b]" />,
  },
]
