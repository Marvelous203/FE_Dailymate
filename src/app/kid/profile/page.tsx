"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Calendar, 
  Star, 
  Trophy, 
  Flame, 
  Gift,
  Settings,
  Shield,
  Crown
} from "lucide-react"

interface KidData {
  data: {
    id: string;
    fullName: string;
    avatar?: string;
    level?: number;
    dateOfBirth?: string;
    gender?: string;
    points?: number;
    streak?: {
      current: number;
      longest: number;
    };
    userId?: {
      id: string;
      email: string;
      isActive?: boolean;
      isVerified?: boolean;
    };
    createAt: string
    unlockedAvatars?: string[];
    achievements?: {
      id: string;
      name: string;
      description?: string;
      points: number;
      icon?: string;
    }[];
  };
}

export default function KidProfilePage() {
  const [kidData, setKidData] = useState<KidData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lấy dữ liệu kid từ localStorage
    const storedKidData = localStorage.getItem('kidData');
    if (storedKidData) {
      try {
        const parsedData = JSON.parse(storedKidData);
        setKidData(parsedData);
      } catch (error) {
        console.error('Error parsing kid data:', error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b981] mx-auto mb-4"></div>
          <p className="text-[#6b7280]">Loading profile...</p>
        </div>
      </div>
    );
  }

  const kid = kidData?.data;
  const user = kid?.userId;

  // Tính tuổi từ dateOfBirth
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Profile */}
      <div className="bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
              {kid?.avatar ? (
                <Image
                  src={`/avatars/${kid.avatar}.png`}
                  alt={kid?.fullName || 'Kid Avatar'}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-white" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#f59e0b] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {kid?.level || 1}
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{kid?.fullName || 'Kid Name'}</h1>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{calculateAge(kid?.dateOfBirth || '')} tuổi</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{kid?.points || 0} điểm</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4" />
                <span>{kid?.streak?.current || 0} ngày liên tiếp</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <Badge className="bg-white/20 text-white border-white/30 mb-2">
              Level {kid?.level || 1}
            </Badge>
            <p className="text-sm text-white/80">Thành viên từ {formatDate(kid?.createAt || '')}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="achievements">Thành tích</TabsTrigger>
          <TabsTrigger value="avatars">Avatar</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6b7280] mb-1">Tổng điểm</p>
                    <p className="text-2xl font-bold text-[#10b981]">{kid?.points || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#ebfdf4] rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#10b981]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6b7280] mb-1">Chuỗi học tập</p>
                    <p className="text-2xl font-bold text-[#f59e0b]">{kid?.streak?.current || 0} ngày</p>
                    <p className="text-xs text-[#6b7280]">Cao nhất: {kid?.streak?.longest || 0} ngày</p>
                  </div>
                  <div className="w-12 h-12 bg-[#fef3c7] rounded-full flex items-center justify-center">
                    <Flame className="h-6 w-6 text-[#f59e0b]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6b7280] mb-1">Cấp độ</p>
                    <p className="text-2xl font-bold text-[#8b5cf6]">{kid?.level || 1}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#f3e8ff] rounded-full flex items-center justify-center">
                    <Crown className="h-6 w-6 text-[#8b5cf6]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Info */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Họ và tên</label>
                  <p className="text-base font-medium">{kid?.fullName || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Giới tính</label>
                  <p className="text-base font-medium">
                    {kid?.gender === 'male' ? 'Nam' : kid?.gender === 'female' ? 'Nữ' : 'Chưa cập nhật'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Ngày sinh</label>
                  <p className="text-base font-medium">{formatDate(kid?.dateOfBirth || '')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Tuổi</label>
                  <p className="text-base font-medium">{calculateAge(kid?.dateOfBirth || '')} tuổi</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Email</label>
                  <p className="text-base font-medium">{user?.email || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Trạng thái tài khoản</label>
                  <div className="flex items-center gap-2">
                    <Badge className={user?.isActive ? 'bg-[#ebfdf4] text-[#10b981]' : 'bg-[#fef2f2] text-[#ef4444]'}>
                      {user?.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </Badge>
                    {user?.isVerified && (
                      <Badge className="bg-[#eff6ff] text-[#3b82f6]">
                        Đã xác thực
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Thành tích đã đạt được
              </h3>
              {kid?.achievements && kid.achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {kid.achievements.map((achievement: { id: string; name: string; description?: string; points: number; icon?: string }, index: number) => (
                    <div key={index} className="bg-[#f8fafc] rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-medium mb-1">{achievement.name}</h4>
                      <p className="text-sm text-[#6b7280]">{achievement.description || 'Không có mô tả'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-16 w-16 text-[#d1d5db] mx-auto mb-4" />
                  <p className="text-[#6b7280]">Chưa có thành tích nào. Hãy tiếp tục học tập để mở khóa!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avatars" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Bộ sưu tập Avatar
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {kid?.unlockedAvatars && kid.unlockedAvatars.length > 0 ? (
                  kid.unlockedAvatars.map((avatar: string, index: number) => (
                    <div 
                      key={index} 
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        kid.avatar === avatar 
                          ? 'border-[#10b981] bg-[#ebfdf4]' 
                          : 'border-[#e5e7eb] hover:border-[#10b981]'
                      }`}
                    >
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-[#f3f4f6]">
                        <Image
                          src={`/avatars/${avatar}.png`}
                          alt={avatar}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center font-medium">{avatar.replace('_', ' ')}</p>
                      {kid.avatar === avatar && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <Gift className="h-16 w-16 text-[#d1d5db] mx-auto mb-4" />
                    <p className="text-[#6b7280]">Chưa có avatar nào. Hoàn thành các thử thách để mở khóa!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Cài đặt tài khoản
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <h4 className="font-medium">Thông báo học tập</h4>
                    <p className="text-sm text-[#6b7280]">Nhận thông báo nhắc nhở học tập hàng ngày</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Bật
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <h4 className="font-medium">Âm thanh</h4>
                    <p className="text-sm text-[#6b7280]">Bật/tắt âm thanh trong game và bài học</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Bật
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <h4 className="font-medium">Chế độ an toàn</h4>
                    <p className="text-sm text-[#6b7280]">Bảo vệ trẻ em với các tính năng an toàn</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#10b981]" />
                    <Badge className="bg-[#ebfdf4] text-[#10b981]">Đã bật</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}