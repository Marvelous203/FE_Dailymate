import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Shield, Eye, Bell } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Cài đặt</h1>
        <p className="text-[#6b7280]">Quản lý cài đặt và kiểm soát của phụ huynh</p>
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
          <ChildSettings name="Alex" />
        </TabsContent>

        <TabsContent value="emma" className="mt-6">
          <ChildSettings name="Emma" />
        </TabsContent>

        <TabsContent value="noah" className="mt-6">
          <ChildSettings name="Noah" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChildSettings({ name }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#83d98c]" />
              Giới hạn thời gian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="daily-limit">Giới hạn hàng ngày (giờ)</Label>
                <div className="flex gap-2 mt-1">
                  <Input id="daily-limit" type="number" defaultValue="2" min="0" max="24" />
                  <Button className="bg-[#83d98c] hover:bg-[#6bc275]">Lưu</Button>
                </div>
              </div>

              <div>
                <Label htmlFor="weekly-limit">Giới hạn hàng tuần (giờ)</Label>
                <div className="flex gap-2 mt-1">
                  <Input id="weekly-limit" type="number" defaultValue="14" min="0" max="168" />
                  <Button className="bg-[#83d98c] hover:bg-[#6bc275]">Lưu</Button>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="schedule">Lịch trình học tập</Label>
                    <p className="text-sm text-[#6b7280]">Giới hạn thời gian sử dụng theo lịch</p>
                  </div>
                  <Switch id="schedule" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#f59e0b]" />
              Kiểm soát nội dung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="content-filter">Bộ lọc nội dung</Label>
                  <p className="text-sm text-[#6b7280]">Lọc nội dung không phù hợp</p>
                </div>
                <Switch id="content-filter" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="game-access">Truy cập trò chơi</Label>
                  <p className="text-sm text-[#6b7280]">Cho phép truy cập vào trò chơi</p>
                </div>
                <Switch id="game-access" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="chat-access">Trò chuyện với phụ huynh</Label>
                  <p className="text-sm text-[#6b7280]">Cho phép trò chuyện với phụ huynh</p>
                </div>
                <Switch id="chat-access" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5 text-[#8b5cf6]" />
            Giám sát hoạt động
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activity-tracking">Theo dõi hoạt động</Label>
                <p className="text-sm text-[#6b7280]">Ghi lại hoạt động của trẻ</p>
              </div>
              <Switch id="activity-tracking" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="progress-reports">Báo cáo tiến độ</Label>
                <p className="text-sm text-[#6b7280]">Nhận báo cáo tiến độ hàng tuần</p>
              </div>
              <Switch id="progress-reports" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Thông báo</Label>
                <p className="text-sm text-[#6b7280]">Nhận thông báo về hoạt động của trẻ</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0ea5e9]" />
            Thông báo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="login-notifications">Thông báo đăng nhập</Label>
                <p className="text-sm text-[#6b7280]">Thông báo khi trẻ đăng nhập</p>
              </div>
              <Switch id="login-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="achievement-notifications">Thông báo thành tích</Label>
                <p className="text-sm text-[#6b7280]">Thông báo khi trẻ đạt được thành tích mới</p>
              </div>
              <Switch id="achievement-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="time-notifications">Cảnh báo thời gian</Label>
                <p className="text-sm text-[#6b7280]">Thông báo khi trẻ gần đạt giới hạn thời gian</p>
              </div>
              <Switch id="time-notifications" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}