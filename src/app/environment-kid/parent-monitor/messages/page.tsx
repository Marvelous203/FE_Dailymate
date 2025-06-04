import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Paperclip } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Tin nhắn</h1>
        <p className="text-[#6b7280]">Giao tiếp với con của bạn</p>
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
          <ChildMessages name="Alex" />
        </TabsContent>

        <TabsContent value="emma" className="mt-6">
          <ChildMessages name="Emma" />
        </TabsContent>

        <TabsContent value="noah" className="mt-6">
          <ChildMessages name="Noah" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChildMessages({ name }) {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none p-3 max-w-[80%] shadow-sm">
                  <p>Chào bố/mẹ! Con đang học bài về giải quyết vấn đề.</p>
                  <p className="text-xs text-[#6b7280] mt-1">10:30 AM</p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#83d98c] text-white rounded-lg rounded-tr-none p-3 max-w-[80%] shadow-sm">
                  <p>Tuyệt vời con! Bài học thế nào? Con có thích không?</p>
                  <p className="text-xs text-white/80 mt-1">10:32 AM</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none p-3 max-w-[80%] shadow-sm">
                  <p>Con thích lắm ạ! Con đã hoàn thành bài tập và được 15 sao!</p>
                  <p className="text-xs text-[#6b7280] mt-1">10:35 AM</p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#83d98c] text-white rounded-lg rounded-tr-none p-3 max-w-[80%] shadow-sm">
                  <p>Giỏi quá! Bố/mẹ rất tự hào về con. Cố gắng học thêm nhiều bài nữa nhé!</p>
                  <p className="text-xs text-white/80 mt-1">10:37 AM</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input placeholder="Nhập tin nhắn..." className="rounded-full" />
              <Button className="rounded-full bg-[#83d98c] hover:bg-[#6bc275] flex-shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}