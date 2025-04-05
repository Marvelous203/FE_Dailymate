import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trophy, Gift, Medal, Crown, Lock } from "lucide-react";

export default function KidRewardsPage() {
  return (
    <div>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">My Rewards</h1>
        <p className="text-[#6b7280]">
          Collect stars and unlock awesome rewards!
        </p>
      </div>

      {/* Star Balance */}
      <Card className="border-none shadow-sm overflow-hidden mb-8 bg-gradient-to-r from-[#10b981] to-[#059669]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Your Star Balance</p>
              <div className="flex items-center">
                <Star className="h-8 w-8 text-white fill-white mr-2" />
                <span className="text-3xl font-bold text-white">123 stars</span>
              </div>
            </div>
            <Button className="bg-white text-[#10b981] hover:bg-white/90">
              Earn More Stars
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <h2 className="text-xl font-bold mb-4">My Achievements</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {achievements.map((achievement, index) => (
          <Card
            key={index}
            className={`border-none shadow-sm ${
              achievement.unlocked ? "bg-white" : "bg-gray-50"
            }`}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                  achievement.unlocked
                    ? achievement.color
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {achievement.unlocked ? (
                  achievement.icon
                ) : (
                  <Lock className="h-6 w-6" />
                )}
              </div>
              <h3
                className={`font-medium mb-1 ${
                  !achievement.unlocked && "text-gray-400"
                }`}
              >
                {achievement.name}
              </h3>
              <p className="text-xs text-[#6b7280] mb-2">
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                  <span className="text-sm">
                    {achievement.stars} stars earned
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rewards Shop */}
      <h2 className="text-xl font-bold mb-4">Rewards Shop</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {rewards.map((reward, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${reward.color}`}
                >
                  {reward.icon}
                </div>
                <div>
                  <h3 className="font-medium">{reward.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                    <span className="text-sm">{reward.cost} stars</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#6b7280] mb-4">
                {reward.description}
              </p>
              <Button
                className={`w-full ${
                  reward.cost <= 123
                    ? "bg-[#10b981] hover:bg-[#059669]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                disabled={reward.cost > 123}
              >
                {reward.cost <= 123 ? "Redeem Reward" : "Not Enough Stars"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Challenges */}
      <h2 className="text-xl font-bold mb-4">Monthly Challenges</h2>
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">May Challenge: Math Master</h3>
              <p className="text-sm text-[#6b7280]">
                Complete all math courses to earn special rewards
              </p>
            </div>
            <div className="bg-[#fef3c7] text-[#f59e0b] px-3 py-1 rounded-full text-sm">
              15 days left
            </div>
          </div>

          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      challenge.completed
                        ? "bg-[#ebfdf4] text-[#10b981]"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    {challenge.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={
                      challenge.completed ? "line-through text-[#6b7280]" : ""
                    }
                  >
                    {challenge.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                  <span>{challenge.stars} stars</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Challenge Progress</span>
              <span>2/5 completed</span>
            </div>
            <div className="w-full bg-[#e5e7eb] h-2 rounded-full">
              <div
                className="bg-[#10b981] h-2 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const achievements = [
  {
    name: "First Steps",
    description: "Complete your first lesson",
    stars: 5,
    unlocked: true,
    color: "bg-[#ebfdf4]",
    icon: <Medal className="h-8 w-8 text-[#10b981]" />,
  },
  {
    name: "Math Whiz",
    description: "Complete all math lessons",
    stars: 20,
    unlocked: true,
    color: "bg-[#ede9fe]",
    icon: <Trophy className="h-8 w-8 text-[#8b5cf6]" />,
  },
  {
    name: "Word Master",
    description: "Learn 50 new words",
    stars: 15,
    unlocked: true,
    color: "bg-[#e0f2fe]",
    icon: <BookIcon className="h-8 w-8 text-[#0ea5e9]" />,
  },
  {
    name: "Science Explorer",
    description: "Complete all science experiments",
    stars: 25,
    unlocked: false,
    color: "",
    icon: null,
  },
  {
    name: "Art Creator",
    description: "Complete all art projects",
    stars: 15,
    unlocked: false,
    color: "",
    icon: null,
  },
  {
    name: "Perfect Score",
    description: "Get 100% on any quiz",
    stars: 10,
    unlocked: true,
    color: "bg-[#fef3c7]",
    icon: <Crown className="h-8 w-8 text-[#f59e0b]" />,
  },
  {
    name: "Fast Learner",
    description: "Complete 5 lessons in one day",
    stars: 15,
    unlocked: false,
    color: "",
    icon: null,
  },
  {
    name: "Consistent",
    description: "Log in for 7 days in a row",
    stars: 20,
    unlocked: false,
    color: "",
    icon: null,
  },
];

const rewards = [
  {
    name: "Digital Sticker Pack",
    description: "Unlock a pack of fun digital stickers for your profile",
    cost: 50,
    color: "bg-[#ebfdf4]",
    icon: <Gift className="h-6 w-6 text-[#10b981]" />,
  },
  {
    name: "Profile Background",
    description: "Unlock a special background for your profile",
    cost: 75,
    color: "bg-[#ede9fe]",
    icon: <ImageIcon className="h-6 w-6 text-[#8b5cf6]" />,
  },
  {
    name: "Avatar Accessory",
    description: "Unlock a special accessory for your avatar",
    cost: 100,
    color: "bg-[#e0f2fe]",
    icon: <User className="h-6 w-6 text-[#0ea5e9]" />,
  },
  {
    name: "Bonus Game",
    description: "Unlock a special bonus game to play",
    cost: 150,
    color: "bg-[#fef3c7]",
    icon: <GamepadIcon className="h-6 w-6 text-[#f59e0b]" />,
  },
  {
    name: "Certificate",
    description: "Get a special digital certificate of achievement",
    cost: 200,
    color: "bg-[#fee2e2]",
    icon: <Award className="h-6 w-6 text-[#ef4444]" />,
  },
  {
    name: "Premium Course",
    description: "Unlock a premium course for free",
    cost: 300,
    color: "bg-[#d1fae5]",
    icon: <BookOpen className="h-6 w-6 text-[#059669]" />,
  },
];

const challenges = [
  {
    name: "Complete 'Addition Basics' lesson",
    stars: 10,
    completed: true,
  },
  {
    name: "Score 90% or higher on Math Quiz",
    stars: 15,
    completed: true,
  },
  {
    name: "Complete 'Multiplication' lesson",
    stars: 20,
    completed: false,
  },
  {
    name: "Play 'Math Blast' game 5 times",
    stars: 15,
    completed: false,
  },
  {
    name: "Complete all Math course lessons",
    stars: 30,
    completed: false,
  },
];

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GamepadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}

function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
