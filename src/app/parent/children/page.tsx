"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Trophy, Target, Zap } from "lucide-react";
import { ChildProfile } from "@/components/parent/children/ChildProfile";
import { ChildProgressData } from "@/components/parent/children/types";
import { useEffect, useState } from "react";
import { getKidsByParentId } from "@/lib/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Interface cho child data từ API với đầy đủ thông tin
interface Child {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  points: number;
  level: number;
  avatar: string;
  unlockedAvatars: string[];
  achievements: any[];
  streak: {
    current: number;
    longest: number;
  };
  userId: {
    _id: string;
    email: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    kids: Child[];
    parentInfo: {
      parentId: string;
      parentUserId: string;
      parentFullName: string;
      parentEmail: string;
    };
  };
  message?: string;
}

// Dữ liệu mẫu cho tiến độ học tập
const sampleProgressData: ChildProgressData = {
  subjects: [
    { subject: 'Toán', progress: 65, lastActivity: '2023-06-10', timeSpent: 320, score: 85 },
    { subject: 'Khoa học', progress: 42, lastActivity: '2023-06-08', timeSpent: 180, score: 78 },
    { subject: 'Ngôn ngữ', progress: 78, lastActivity: '2023-06-12', timeSpent: 240, score: 92 },
    { subject: 'Lịch sử', progress: 30, lastActivity: '2023-06-05', timeSpent: 120, score: 70 },
    { subject: 'Nghệ thuật', progress: 55, lastActivity: '2023-06-09', timeSpent: 150, score: 88 },
  ],
  skills: [
    { name: 'Tư duy phản biện', level: 4, progress: 65 },
    { name: 'Giải quyết vấn đề', level: 3, progress: 45 },
    { name: 'Sáng tạo', level: 5, progress: 80 },
    { name: 'Giao tiếp', level: 4, progress: 70 },
  ],
  weeklyActivity: [
    { day: 'CN', minutes: 30 },
    { day: 'T2', minutes: 45 },
    { day: 'T3', minutes: 60 },
    { day: 'T4', minutes: 30 },
    { day: 'T5', minutes: 75 },
    { day: 'T6', minutes: 45 },
    { day: 'T7', minutes: 90 },
  ],
  monthlyProgress: [
    { week: 'Tuần 1', progress: 25 },
    { week: 'Tuần 2', progress: 40 },
    { week: 'Tuần 3', progress: 55 },
    { week: 'Tuần 4', progress: 65 },
  ],
};

export default function ParentChildrenPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Lấy user data từ Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Lấy parentId từ user data
  const parentId = user?.roleData?._id;

  // Function to calculate age from dateOfBirth
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Function to determine grade based on age
  const getGradeFromAge = (age: number): string => {
    if (age < 5) return 'Mầm non';
    if (age < 6) return 'Lớp chuẩn bị';
    if (age >= 6 && age <= 18) return `Lớp ${age - 5}`;
    return 'Đã trưởng thành';
  };

  // Function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Chưa có thông tin';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Function to get status badge color
  const getStatusColor = (isActive: boolean, isVerified: boolean) => {
    if (isActive && isVerified) return 'bg-green-100 text-green-800';
    if (isActive && !isVerified) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Function to get status text
  const getStatusText = (isActive: boolean, isVerified: boolean) => {
    if (isActive && isVerified) return 'Đã xác thực';
    if (isActive && !isVerified) return 'Chưa xác thực';
    return 'Không hoạt động';
  };

  // Fetch children data khi component mount
  useEffect(() => {
    const fetchChildren = async () => {
      if (!parentId) {
        setError('Không tìm thấy thông tin parent');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response: any = await getKidsByParentId(parentId);
        
        console.log('API Response:', response);
        
        if (response.success && response.data) {
          const kidsArray = response.data.kids || [];
          
          if (Array.isArray(kidsArray)) {
            setChildren(kidsArray);
            if (kidsArray.length === 0) {
              setError('Chưa có con nào được thêm vào hệ thống');
            }
          } else {
            console.error('Kids data is not an array:', kidsArray);
            setChildren([]);
            setError('Dữ liệu trả về không đúng định dạng');
          }
        } else {
          setChildren([]);
          setError(response.message || 'Không thể tải danh sách con');
        }
      } catch (err) {
        console.error('Error fetching children:', err);
        setChildren([]);
        setError('Có lỗi xảy ra khi tải danh sách con');
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [parentId]);

  // Tạo màu sắc cho avatar dựa trên index
  const getAvatarColor = (index: number) => {
    const colors = [
      'from-[#fbbf24] to-[#f59e0b]', // Vàng
      'from-[#ec4899] to-[#db2777]', // Hồng
      'from-[#8b5cf6] to-[#7c3aed]', // Tím
      'from-[#06b6d4] to-[#0891b2]', // Xanh dương
      'from-[#10b981] to-[#059669]', // Xanh lá
    ];
    return colors[index % colors.length];
  };

  // Đảm bảo children luôn là array trước khi render
  const safeChildren = Array.isArray(children) ? children : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-[#64748b]">Đang tải danh sách con...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
              Danh Sách Con Em
            </h1>
            <p className="text-[#64748b] mt-1">Quản lý và theo dõi tiến độ học tập của con em</p>
          </div>
          <Button className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Thêm Con
          </Button>
        </div>

        {safeChildren.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#64748b] text-lg mb-4">Chưa có con nào được thêm</p>
            <Button className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9]">
              <Plus className="mr-2 h-4 w-4" /> Thêm con đầu tiên
            </Button>
          </div>
        ) : (
          <Tabs defaultValue={safeChildren[0]?._id} className="mb-8">
            <TabsList className="bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 rounded-xl p-1">
              {safeChildren.map((child, index) => (
                <TabsTrigger 
                  key={child._id} 
                  value={child._id} 
                  className="flex items-center gap-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white transition-all duration-300"
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
                    {child.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <span className="font-medium">{child.fullName || 'Chưa có tên'}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {safeChildren.map((child, index) => {
              const age = calculateAge(child.dateOfBirth);
              const grade = getGradeFromAge(age);
              
              return (
                <TabsContent key={child._id} value={child._id} className="mt-8">
                  {/* Child Overview Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className={`w-20 h-20 bg-gradient-to-br ${getAvatarColor(index)} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                        {child.fullName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      
                      {/* Basic Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-[#1e293b]">{child.fullName || 'Chưa có tên'}</h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(child.userId?.isActive, child.userId?.isVerified)}`}>
                            {getStatusText(child.userId?.isActive, child.userId?.isVerified)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#64748b]" />
                            <span className="text-[#64748b]">Tuổi:</span>
                            <span className="font-medium">{age > 0 ? `${age} tuổi` : 'Chưa có thông tin'}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-[#64748b]" />
                            <span className="text-[#64748b]">Lớp:</span>
                            <span className="font-medium">{grade}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[#64748b]">Giới tính:</span>
                            <span className="font-medium capitalize">{child.gender || 'Chưa có thông tin'}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[#64748b]">Ngày sinh:</span>
                            <span className="font-medium">{formatDate(child.dateOfBirth)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    {/* Points */}
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-yellow-600 text-sm font-medium">Điểm số</p>
                          <p className="text-2xl font-bold text-yellow-700">{child.points || 0}</p>
                        </div>
                      </div>
                    </div>

                    {/* Level */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-purple-600 text-sm font-medium">Cấp độ</p>
                          <p className="text-2xl font-bold text-purple-700">{child.level || 0}</p>
                        </div>
                      </div>
                    </div>

                    {/* Current Streak */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-orange-600 text-sm font-medium">Streak hiện tại</p>
                          <p className="text-2xl font-bold text-orange-700">{child.streak?.current || 0} ngày</p>
                        </div>
                      </div>
                    </div>

                    {/* Longest Streak */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-green-600 text-sm font-medium">Streak dài nhất</p>
                          <p className="text-2xl font-bold text-green-700">{child.streak?.longest || 0} ngày</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements Section */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
                    <h3 className="text-xl font-bold text-[#1e293b] mb-4">Thành tích</h3>
                    {child.achievements && child.achievements.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {child.achievements.map((achievement, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center gap-3">
                              <Trophy className="w-6 h-6 text-blue-600" />
                              <span className="font-medium text-blue-700">{achievement.name || 'Thành tích'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Trophy className="w-12 h-12 text-[#64748b] mx-auto mb-3" />
                        <p className="text-[#64748b]">Chưa có thành tích nào</p>
                        <p className="text-sm text-[#94a3b8]">Hãy khuyến khích con học tập để đạt được thành tích đầu tiên!</p>
                      </div>
                    )}
                  </div>

                  {/* Account Info */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                    <h3 className="text-xl font-bold text-[#1e293b] mb-4">Thông tin tài khoản</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#64748b]">Email:</span>
                        <span className="ml-2 font-medium">{child.userId?.email || 'Chưa có thông tin'}</span>
                      </div>
                      <div>
                        <span className="text-[#64748b]">Vai trò:</span>
                        <span className="ml-2 font-medium capitalize">{child.userId?.role || 'Chưa có thông tin'}</span>
                      </div>
                      <div>
                        <span className="text-[#64748b]">Ngày tạo:</span>
                        <span className="ml-2 font-medium">{formatDate(child.createdAt)}</span>
                      </div>
                      <div>
                        <span className="text-[#64748b]">Cập nhật lần cuối:</span>
                        <span className="ml-2 font-medium">{formatDate(child.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </div>
    </div>
  );
}