import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Medal, Star, Trophy } from "lucide-react"

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Rewards</h1>
          <p className="text-[#6b7280]">Track your achievements and rewards</p>
        </div>
        <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
          <Link href="/environment-kid/kid-learning-zone">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Trophy className="h-8 w-8 text-[#f59e0b]" />
              <div>
                <h2 className="text-xl font-bold">Game Achievements</h2>
                <p className="text-[#6b7280]">Your gaming milestones</p>
              </div>
            </div>
            <div className="space-y-4">
              {gameAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Medal className={`h-6 w-6 ${achievement.completed ? 'text-[#83d98c]' : 'text-[#d1d5db]'}`} />
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-[#6b7280]">{achievement.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{achievement.reward} stars</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Star className="h-8 w-8 text-[#f59e0b]" />
              <div>
                <h2 className="text-xl font-bold">Star Collection</h2>
                <p className="text-[#6b7280]">Your earned rewards</p>
              </div>
            </div>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-[#83d98c]">250</div>
              <p className="text-[#6b7280]">Total Stars Earned</p>
            </div>
            <div className="space-y-4">
              {starRewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{reward.title}</span>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" />
                    <span>{reward.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const gameAchievements = [
  {
    title: "Memory Master",
    description: "Complete Memory Match in under 20 moves",
    reward: 50,
    completed: true,
  },
  {
    title: "Math Wizard",
    description: "Score 1000 points in Math Adventure",
    reward: 30,
    completed: true,
  },
  {
    title: "Word Champion",
    description: "Win 5 multiplayer Word Quest games",
    reward: 40,
    completed: false,
  },
  {
    title: "Science Expert",
    description: "Complete all Science Explorer experiments",
    reward: 60,
    completed: false,
  },
]

const starRewards = [
  { title: "Memory Match", stars: 75 },
  { title: "Math Adventure", stars: 60 },
  { title: "Word Quest", stars: 45 },
  { title: "Daily Challenges", stars: 70 },
]