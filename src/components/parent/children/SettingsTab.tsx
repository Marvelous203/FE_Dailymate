"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Lock, Eye, Clock, Volume2, Moon, Sun, Languages, Shield } from "lucide-react";


export function SettingsTab() {
  return (
    <div className="space-y-8">
      {/* Cài đặt Tài khoản */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Cài đặt Tài khoản</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="childName">Tên Hiển thị</Label>
                <Input id="childName" defaultValue="Alex Nguyen" className="border-2 border-[#e2e8f0] focus:border-[#8b5cf6] transition-all duration-300" />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="avatar">Ảnh đại diện</Label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center text-white text-xl font-bold">A</div>
                  <Button variant="outline" className="border-2 border-[#e2e8f0] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300">
                    Thay đổi
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="age">Tuổi</Label>
                <Input id="age" type="number" defaultValue="10" className="border-2 border-[#e2e8f0] focus:border-[#8b5cf6] transition-all duration-300" />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="grade">Lớp</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="border-2 border-[#e2e8f0] focus:border-[#8b5cf6] transition-all duration-300">
                    <SelectValue placeholder="Chọn lớp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Lớp 1</SelectItem>
                    <SelectItem value="2">Lớp 2</SelectItem>
                    <SelectItem value="3">Lớp 3</SelectItem>
                    <SelectItem value="4">Lớp 4</SelectItem>
                    <SelectItem value="5">Lớp 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] transition-all duration-300 shadow-md hover:shadow-lg">
                Lưu Thay đổi
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cài đặt Thông báo */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Cài đặt Thông báo</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Bell className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Thông báo Hoạt động</p>
                  <p className="text-sm text-[#64748b]">Nhận thông báo về hoạt động học tập</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Clock className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Nhắc nhở Học tập</p>
                  <p className="text-sm text-[#64748b]">Nhận nhắc nhở về lịch học tập</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Shield className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Cảnh báo An toàn</p>
                  <p className="text-sm text-[#64748b]">Nhận thông báo về các vấn đề an toàn</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cài đặt Quyền riêng tư */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Quyền riêng tư</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Eye className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Hiển thị Tiến độ</p>
                  <p className="text-sm text-[#64748b]">Cho phép hiển thị tiến độ học tập với người khác</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Lock className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="font-medium text-[#1e293b]">Chế độ Riêng tư</p>
                  <p className="text-sm text-[#64748b]">Giới hạn thông tin hiển thị với người khác</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cài đặt Khác */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#7c3aed]/5"></div>
        <CardContent className="p-8 relative">
          <h3 className="text-xl font-bold mb-6 text-[#1e293b]">Cài đặt Khác</h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Languages className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <p className="font-medium text-[#1e293b]">Ngôn ngữ</p>
              </div>
              <Select defaultValue="vi">
                <SelectTrigger className="border-2 border-[#e2e8f0] focus:border-[#8b5cf6] transition-all duration-300">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">Tiếng Anh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Volume2 className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <p className="font-medium text-[#1e293b]">Âm thanh</p>
              </div>
              <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <Sun className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <p className="font-medium text-[#1e293b]">Chế độ Sáng/Tối</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex-1 border-2 border-[#e2e8f0] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300 flex items-center justify-center gap-2">
                  <Sun className="h-4 w-4" />
                  Sáng
                </Button>
                <Button variant="outline" className="flex-1 border-2 border-[#e2e8f0] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300 flex items-center justify-center gap-2">
                  <Moon className="h-4 w-4" />
                  Tối
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}