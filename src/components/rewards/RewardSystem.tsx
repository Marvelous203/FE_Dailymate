"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Award, Heart, Brain, Shield } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'social' | 'emotional' | 'creative';
  requirement: number;
  progress: number;
  unlocked: boolean;
  dateUnlocked?: string;
}

interface UserStats {
  totalStars: number;
  lessonsCompleted: number;
  gamesPlayed: number;
  streakDays: number;
  skillPoints: {
    problemSolving: number;
    emotionalIntelligence: number;
    creativity: number;
    socialSkills: number;
  };
}

export function RewardSystem() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalStars: 0,
    lessonsCompleted: 0,
    gamesPlayed: 0,
    streakDays: 0,
    skillPoints: {
      problemSolving: 0,
      emotionalIntelligence: 0,
      creativity: 0,
      socialSkills: 0
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-lesson',
      title: 'Người Học Đầu Tiên',
      description: 'Hoàn thành bài học đầu tiên',
      icon: 'book',
      category: 'learning',
      requirement: 1,
      progress: 0,
      unlocked: false
    },
    {
      id: 'emotion-master',
      title: 'Chuyên Gia Cảm Xúc',
      description: 'Đạt 100 điểm kỹ năng cảm xúc',
      icon: 'heart',
      category: 'emotional',
      requirement: 100,
      progress: 0,
      unlocked: false
    },
    {
      id: 'problem-solver',
      title: 'Nhà Giải Quyết Vấn Đề',
      description: 'Hoàn thành 10 game logic',
      icon: 'brain',
      category: 'learning',
      requirement: 10,
      progress: 0,
      unlocked: false
    },
    {
      id: 'social-butterfly',
      title: 'Bạn Thân Thiện',
      description: 'Đạt 50 điểm kỹ năng xã hội',
      icon: 'users',
      category: 'social',
      requirement: 50,
      progress: 0,
      unlocked: false
    }
  ]);

  useEffect(() => {
    // Load user data from localStorage
    loadUserData();
  }, []);

  const loadUserData = () => {
    const savedStats = localStorage.getItem('userStats');
    const savedAchievements = localStorage.getItem('achievements');
    
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'book': return <Award className="h-8 w-8" />;
      case 'heart': return <Heart className="h-8 w-8" />;
      case 'brain': return <Brain className="h-8 w-8" />;
      case 'users': return <Shield className="h-8 w-8" />;
      default: return <Star className="h-8 w-8" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'bg-blue-500';
      case 'emotional': return 'bg-pink-500';
      case 'social': return 'bg-green-500';
      case 'creative': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* User Stats Overview */}
      <Card className="border-none shadow-xl bg-gradient-to-r from-[#83d98c] to-[#6bc275] text-white">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Thành Tích Của Bạn</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Star className="h-12 w-12 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.totalStars}</div>
              <div className="text-sm opacity-90">Tổng Sao</div>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.lessonsCompleted}</div>
              <div className="text-sm opacity-90">Bài Học</div>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.gamesPlayed}</div>
              <div className="text-sm opacity-90">Game Đã Chơi</div>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.streakDays}</div>
              <div className="text-sm opacity-90">Ngày Liên Tiếp</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Points */}
      <Card className="border-none shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-6">Điểm Kỹ Năng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(userStats.skillPoints).map(([skill, points]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {skill === 'problemSolving' ? 'Giải Quyết Vấn Đề' :
                     skill === 'emotionalIntelligence' ? 'Trí Tuệ Cảm Xúc' :
                     skill === 'creativity' ? 'Sáng Tạo' : 'Kỹ Năng Xã Hội'}
                  </span>
                  <span className="font-bold">{points}/100</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div 
                    className="bg-gradient-to-r from-[#83d98c] to-[#6bc275] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(points, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-none shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-6">Huy Hiệu Thành Tích</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'border-[#83d98c] bg-[#83d98c]/10 shadow-lg' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                    achievement.unlocked ? getCategoryColor(achievement.category) : 'bg-gray-400'
                  } text-white`}>
                    {getIconComponent(achievement.icon)}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">{achievement.description}</p>
                  </div>
                  
                  {!achievement.unlocked && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div 
                          className="bg-[#83d98c] h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.min((achievement.progress / achievement.requirement) * 100, 100)}%` 
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.requirement}
                      </p>
                    </div>
                  )}
                  
                  {achievement.unlocked && achievement.dateUnlocked && (
                    <Badge variant="secondary" className="bg-[#83d98c]/20 text-[#83d98c]">
                      Mở khóa: {achievement.dateUnlocked}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}