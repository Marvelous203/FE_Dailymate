'use client'

import { useRewardStore } from '@/store/rewardStore'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Trophy, Flame } from 'lucide-react'

export function RewardDisplay() {
  const { stars, badges, skillPoints, streakDays } = useRewardStore()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Stars */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4 text-center">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{stars}</p>
          <p className="text-sm text-gray-600">Ngôi sao</p>
        </CardContent>
      </Card>
      
      {/* Streak */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4 text-center">
          <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{streakDays}</p>
          <p className="text-sm text-gray-600">Ngày liên tiếp</p>
        </CardContent>
      </Card>
      
      {/* Badges */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4 text-center">
          <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{badges.length}</p>
          <p className="text-sm text-gray-600">Huy hiệu</p>
        </CardContent>
      </Card>
      
      {/* Recent Badges */}
      {badges.length > 0 && (
        <Card className="border-none shadow-sm md:col-span-3">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Huy hiệu gần đây</h3>
            <div className="flex flex-wrap gap-2">
              {badges.slice(-5).map((badge) => (
                <Badge key={badge.id} variant="secondary" className="p-2">
                  <span className="mr-1">{badge.icon}</span>
                  {badge.title}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}