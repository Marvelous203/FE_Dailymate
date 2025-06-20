"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Calendar, Heart, Trophy, Target } from "lucide-react";

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  category: 'self-care' | 'social' | 'responsibility' | 'kindness';
  difficulty: 'easy' | 'medium' | 'hard';
  stars: number;
  icon: string;
  tips: string[];
}

const dailyChallenges: DailyChallenge[] = [
  {
    id: 'tidy-toys',
    title: 'Dọn Đồ Chơi',
    description: 'Hôm nay con hãy giúp bố mẹ dọn đồ chơi sau khi chơi xong',
    category: 'responsibility',
    difficulty: 'easy',
    stars: 3,
    icon: 'toy',
    tips: [
      'Xếp đồ chơi vào đúng chỗ',
      'Nhớ kiểm tra dưới gầm giường',
      'Có thể nhờ bố mẹ giúp nếu cần'
    ]
  },
  {
    id: 'say-thanks',
    title: 'Nói Lời Cảm Ơn',
    description: 'Hãy nói "cảm ơn" khi ai đó giúp đỡ con',
    category: 'social',
    difficulty: 'easy',
    stars: 2,
    icon: 'heart',
    tips: [
      'Nhìn vào mắt người đó khi nói',
      'Nói với giọng chân thành',
      'Có thể thêm nụ cười'
    ]
  },
  {
    id: 'help-friend',
    title: 'Giúp Đỡ Bạn',
    description: 'Tìm cách giúp đỡ một người bạn hôm nay',
    category: 'kindness',
    difficulty: 'medium',
    stars: 5,
    icon: 'helping-hand',
    tips: [
      'Có thể chia sẻ đồ chơi',
      'Giúp bạn làm bài tập',
      'An ủi bạn khi buồn'
    ]
  }
];

export function DailySkillChallenge() {
  const [todayChallenge, setTodayChallenge] = useState<DailyChallenge | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showTips, setShowTips] = useState(false);

  const completeChallenge = () => {
    if (!todayChallenge) return;
    
    const newCompleted = [...completedChallenges, todayChallenge.id];
    setCompletedChallenges(newCompleted);
    setIsCompleted(true);
    
    // Save to localStorage
    localStorage.setItem('completedChallenges', JSON.stringify(newCompleted));
    
    // Add stars to user stats
    const currentStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    const updatedStats = {
      ...currentStats,
      totalStars: (currentStats.totalStars || 0) + todayChallenge.stars,
      streakDays: (currentStats.streakDays || 0) + 1
    };
    localStorage.setItem('userStats', JSON.stringify(updatedStats));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'self-care': return 'from-blue-400 to-blue-600';
      case 'social': return 'from-green-400 to-green-600';
      case 'responsibility': return 'from-orange-400 to-orange-600';
      case 'kindness': return 'from-pink-400 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };
// Fix useEffect dependency
useEffect(() => {
  // Get today's challenge based on date
  const today = new Date().toDateString();
  const savedChallenge = localStorage.getItem(`dailyChallenge_${today}`);
  const completed = localStorage.getItem(`completedChallenges`) || '[]';
  
  setCompletedChallenges(JSON.parse(completed));
  
  if (savedChallenge) {
    const challenge = JSON.parse(savedChallenge);
    setTodayChallenge(challenge);
    setIsCompleted(completedChallenges.includes(challenge.id));
  } else {
    // Select random challenge for today
    const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
    setTodayChallenge(randomChallenge);
    localStorage.setItem(`dailyChallenge_${today}`, JSON.stringify(randomChallenge));
  }
}, [completedChallenges]) // Add completedChallenges to dependencies

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'self-care': return 'Tự Chăm Sóc';
      case 'social': return 'Kỹ Năng Xã Hội';
      case 'responsibility': return 'Trách Nhiệm';
      case 'kindness': return 'Lòng Tốt';
      default: return 'Kỹ Năng Sống';
    }
  };

  if (!todayChallenge) {
    return (
      <Card className="border-none shadow-xl">
        <CardContent className="p-8 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-600">Đang tải thử thách hôm nay...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className={`border-none shadow-xl bg-gradient-to-r ${getCategoryColor(todayChallenge.category)} text-white`}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <Calendar className="h-12 w-12 mx-auto" />
            <h2 className="text-2xl font-bold">Thử Thách Hôm Nay</h2>
            <div className="bg-white/20 rounded-lg p-1 inline-block">
              <span className="text-sm font-medium">{getCategoryName(todayChallenge.category)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{todayChallenge.title}</h3>
              <p className="text-lg text-gray-700 mb-6">{todayChallenge.description}</p>
              
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-bold">{todayChallenge.stars} sao</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  todayChallenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  todayChallenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {todayChallenge.difficulty === 'easy' ? 'Dễ' :
                   todayChallenge.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                </div>
              </div>
            </div>

            {!isCompleted ? (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTips(!showTips)}
                  className="w-full"
                >
                  {showTips ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                </Button>
                
                {showTips && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-bold mb-3">💡 Gợi ý:</h4>
                    <ul className="space-y-2">
                      {todayChallenge.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button
                  onClick={completeChallenge}
                  className={`w-full bg-gradient-to-r ${getCategoryColor(todayChallenge.category)} hover:opacity-90 text-lg py-3`}
                >
                  Tôi đã hoàn thành! 🎉
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                <h4 className="text-xl font-bold text-green-600">Hoàn thành xuất sắc!</h4>
                <p className="text-gray-600">Bạn đã nhận được {todayChallenge.stars} sao!</p>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    Hẹn gặp lại bạn vào ngày mai với thử thách mới! 🌟
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


