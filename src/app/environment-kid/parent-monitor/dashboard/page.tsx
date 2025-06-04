import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Clock, MessageSquare, Settings, TrendingUp, Activity, Calendar, Eye, Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ParentMonitorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Bảng Điều Khiển Phụ Huynh</h1>
          <p className="text-[#6b7280]">Theo dõi và quản lý môi trường học tập của con bạn</p>
        </div>

        <div className="flex gap-3">
          <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
            <Settings className="mr-2 h-4 w-4" />
            Cài đặt
          </Button>
          <Button variant="outline" asChild>
            <Link href="/parent/dashboard">
              <span>Về Trang Chính</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Child Selector - Cải thiện với avatar và thông tin trạng thái */}
      <Tabs defaultValue="alex" className="w-full">
        <TabsList className="bg-white w-full justify-start overflow-x-auto p-1 rounded-xl">
          <TabsTrigger value="alex" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#d1fae5]">
            <div className="w-8 h-8 bg-[#d1fae5] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#10b981]">A</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Alex</div>
              <div className="text-xs text-[#6b7280]">Online</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="emma" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#feccd6]">
            <div className="w-8 h-8 bg-[#feccd6] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#f15f6c]">E</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Emma</div>
              <div className="text-xs text-[#6b7280]">Offline • 2h ago</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="noah" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#d7ebf0]">
            <div className="w-8 h-8 bg-[#d7ebf0] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#4dacc4]">N</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Noah</div>
              <div className="text-xs text-[#6b7280]">Offline • 1d ago</div>
            </div>
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
      {/* Child Overview - Thiết kế mới với thẻ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm md:col-span-4">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-[#d1fae5] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#10b981]">{name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-[#6b7280]">Hoạt động gần đây: Hôm nay, 15:45</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" className="bg-[#83d98c] hover:bg-[#6bc275]">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Gửi tin nhắn
                    </Button>
                    <Button size="sm" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Kiểm soát
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-8">
                <div className="bg-[#ebfdf4] rounded-lg p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-5 w-5 text-[#10b981]" />
                    <span className="font-medium">Thời gian hôm nay</span>
                  </div>
                  <p className="text-2xl font-bold">1h 45m</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#6b7280]">Giới hạn: 2h</p>
                    <Button size="sm" variant="ghost" className="text-[#10b981] p-0 h-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-[#ede9fe] rounded-lg p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                    <span className="font-medium">Bài học</span>
                  </div>
                  <p className="text-2xl font-bold">3</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#6b7280]">Hoàn thành hôm nay</p>
                    <Button size="sm" variant="ghost" className="text-[#8b5cf6] p-0 h-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-[#e0f2fe] rounded-lg p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-5 w-5 text-[#0ea5e9]" />
                    <span className="font-medium">Sao</span>
                  </div>
                  <p className="text-2xl font-bold">15</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#6b7280]">Đạt được hôm nay</p>
                    <Button size="sm" variant="ghost" className="text-[#0ea5e9] p-0 h-auto">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <Card className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#ebfdf4] flex items-center justify-center mb-2">
              <Activity className="h-6 w-6 text-[#10b981]" />
            </div>
            <h3 className="font-medium">Hoạt động</h3>
            <p className="text-xs text-[#6b7280]">Xem chi tiết</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-[#8b5cf6]" />
            </div>
            <h3 className="font-medium">Khóa học</h3>
            <p className="text-xs text-[#6b7280]">Quản lý khóa học</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-[#0ea5e9]" />
            </div>
            <h3 className="font-medium">Lịch trình</h3>
            <p className="text-xs text-[#6b7280]">Quản lý thời gian</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#fff7ed] flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-[#f59e0b]" />
            </div>
            <h3 className="font-medium">Bảo vệ</h3>
            <p className="text-xs text-[#6b7280]">Cài đặt an toàn</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Management */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#83d98c]" />
            Quản lý thời gian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-medium">Thời gian sử dụng hàng ngày</h3>
                  <p className="text-sm text-[#6b7280]">Hôm nay: 1h 45m / 2h giới hạn</p>
                </div>
                <Button size="sm" variant="outline">
                  Điều chỉnh
                </Button>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Sử dụng hàng tuần</h3>
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
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => (
                    <div key={i} className="text-xs text-[#6b7280]">
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Thời gian theo hoạt động</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Khóa học</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full bg-[#83d98c]" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Trò chơi</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8b5cf6]" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Phần thưởng</span>
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
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#8b5cf6]" />
            Tiến độ học tập
          </CardTitle>
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
                      {course.completed}/{course.total} bài học
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
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#f59e0b]" />
            Hoạt động gần đây
          </CardTitle>
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
    title: "Kỹ năng giải quyết vấn đề",
    category: "Kỹ năng sống",
    progress: 65,
    completed: 8,
    total: 12,
  },
  {
    title: "Trí tuệ cảm xúc",
    category: "Kỹ năng xã hội",
    progress: 30,
    completed: 5,
    total: 18,
  },
  {
    title: "Kỹ năng giao tiếp",
    category: "Kỹ năng xã hội",
    progress: 100,
    completed: 15,
    total: 15,
  },
]

const activities = [
  {
    title: "Hoàn thành bài học 'Tìm giải pháp'",
    time: "Hôm nay, 15:30",
    bgColor: "bg-[#ebfdf4]",
    icon: <BookOpen className="h-5 w-5 text-[#10b981]" />,
  },
  {
    title: "Đạt 15 sao trong bài kiểm tra Giải quyết vấn đề",
    time: "Hôm nay, 14:15",
    bgColor: "bg-[#ede9fe]",
    icon: <TrendingUp className="h-5 w-5 text-[#8b5cf6]" />,
  },
  {
    title: "Bắt đầu khóa học Kỹ năng giao tiếp",
    time: "Hôm nay, 10:45",
    bgColor: "bg-[#fff7ed]",
    icon: <BookOpen className="h-5 w-5 text-[#f59e0b]" />,
  },
]