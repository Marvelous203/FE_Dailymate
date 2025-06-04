import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, TrendingUp, Award, BarChart } from "lucide-react"

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Tiến độ & Thời gian</h1>
        <p className="text-[#6b7280]">Theo dõi chi tiết tiến độ học tập và thời gian sử dụng</p>
      </div>

      <Tabs defaultValue="alex" className="w-full">
        <TabsList className="bg-white w-full justify-start overflow-x-auto p-1 rounded-xl">
          <TabsTrigger value="alex" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#d1fae5]">
            <div className="w-8 h-8 bg-[#d1fae5] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#10b981]">A</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Alex</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="emma" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#feccd6]">
            <div className="w-8 h-8 bg-[#feccd6] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#f15f6c]">E</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Emma</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="noah" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#d7ebf0]">
            <div className="w-8 h-8 bg-[#d7ebf0] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-[#4dacc4]">N</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Noah</div>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alex" className="mt-6">
          <ChildProgress name="Alex Johnson" />
        </TabsContent>

        <TabsContent value="emma" className="mt-6">
          <ChildProgress name="Emma Johnson" />
        </TabsContent>

        <TabsContent value="noah" className="mt-6">
          <ChildProgress name="Noah Johnson" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChildProgress({ name }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#8b5cf6]" />
              Tiến độ khóa học
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

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-[#f59e0b]" />
              Thành tích
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ebfdf4] flex items-center justify-center">
                    <Award className="h-5 w-5 text-[#10b981]" />
                  </div>
                  <div>
                    <p className="font-medium">Tổng số sao</p>
                    <p className="text-sm text-[#6b7280]">Tất cả khóa học</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">123</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ede9fe] flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <p className="font-medium">Bài học đã hoàn thành</p>
                    <p className="text-sm text-[#6b7280]">Tất cả khóa học</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">28</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <p className="font-medium">Cấp độ hiện tại</p>
                    <p className="text-sm text-[#6b7280]">Dựa trên thành tích</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#83d98c]" />
            Thời gian sử dụng chi tiết
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#ebfdf4] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-[#10b981]" />
                  <span className="font-medium">Hôm nay</span>
                </div>
                <p className="text-2xl font-bold">1h 45m</p>
                <p className="text-sm text-[#6b7280]">Giới hạn: 2h</p>
              </div>

              <div className="bg-[#ede9fe] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-[#8b5cf6]" />
                  <span className="font-medium">Tuần này</span>
                </div>
                <p className="text-2xl font-bold">8h 30m</p>
                <p className="text-sm text-[#6b7280]">Giới hạn: 14h</p>
              </div>

              <div className="bg-[#e0f2fe] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-[#0ea5e9]" />
                  <span className="font-medium">Tháng này</span>
                </div>
                <p className="text-2xl font-bold">32h 15m</p>
                <p className="text-sm text-[#6b7280]">Giới hạn: 60h</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Thời gian sử dụng theo ngày</h3>
              <div className="flex h-40 items-end gap-2">
                {[35, 45, 60, 105, 75, 90, 45, 60, 80, 30, 45, 55, 65, 75].map((minutes, i) => (
                  <div key={i} className="relative flex h-full w-full flex-col items-center">
                    <div
                      className="absolute bottom-0 w-full max-w-12 rounded-t bg-[#83d98c]"
                      style={{ height: `${(minutes / 120) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 overflow-x-auto">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"].map((day, i) => (
                  <div key={i} className="text-xs text-[#6b7280]">
                    {day}
                  </div>
                ))}
              </div>
            </div>
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