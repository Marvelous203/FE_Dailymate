import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DailyChallengesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" className="p-2">
          <Link href="/environment-kid/kid-learning-zone">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Daily Challenge</h1>
      </div>

      <Card className="border-none shadow-sm bg-gradient-to-r from-[#83d98c] to-[#6bc275] text-white mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Today`s Challenge</h2>
              <p>Complete the puzzle to earn special rewards!</p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-[#f59e0b]" />
              <span className="text-lg font-bold">5 Stars</span>
            </div>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full">
            <div className="bg-white h-2 rounded-full" style={{ width: "0%" }}></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <div className="h-[300px] bg-[#d9d9d9]">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Challenge"
              width={600}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">Problem Solving Puzzle</h3>
            <p className="text-[#4b5563] mb-4">
              Help the character find the best path to reach the goal. Choose your moves wisely!
            </p>
            <Button className="w-full bg-[#83d98c] hover:bg-[#6bc275]">Start Challenge</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Challenge Rules</h3>
              <ul className="space-y-2 text-[#4b5563]">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-6 h-6 bg-[#83d98c] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-[#f3f4f6]">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Your Progress</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-[#6b7280] mb-1">Daily Challenges Completed</p>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-[#f59e0b]" />
                    <span className="font-bold">3/5</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#6b7280] mb-1">Stars Earned This Week</p>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=20&width=20"
                      alt="Star"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="font-bold">15</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const rules = [
  "You have 3 attempts to complete the challenge",
  "Each correct move earns you points",
  "Complete the puzzle within the time limit",
  "Earn bonus stars for efficient solutions",
]