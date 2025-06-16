'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GamepadIcon, Star, Trophy, Users } from "lucide-react"
import { useParams } from "next/navigation"

export default function GamesPage() {
  const params = useParams();
  const kidId = params.kidId;
  const availableGames = [
    {
      id: 1,
      title: "Math Adventure",
      description: "Solve math problems in a fun adventure game.",
      highScore: 2500,
      stars: 20,
      multiplayer: false,
    },
    {
      id: 2,
      title: "Word Quest",
      description: "Build vocabulary through an exciting word game.",
      highScore: 1800,
      stars: 15,
      multiplayer: true,
    },
    {
      id: 3,
      title: "Science Explorer",
      description: "Learn science concepts through interactive experiments.",
      highScore: 3000,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 4,
      title: "Memory Match",
      description: "Improve memory skills with matching pairs.",
      highScore: 1500,
      stars: 15,
      multiplayer: true,
    },
    {
      id: 5,
      title: "Logic Puzzles",
      description: "Enhance logical thinking with fun puzzles.",
      highScore: 2200,
      stars: 20,
      multiplayer: false,
    },
    {
      id: 6,
      title: "Typing Race",
      description: "Learn typing while racing against friends.",
      highScore: 2800,
      stars: 18,
      multiplayer: true,
    },
    {
      id: 7,
      title: "Phản xạ màu chữ",
      description: "Kiểm tra phản xạ và khả năng nhận biết màu sắc của bạn.",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
  ]
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Learning Games</h1>
          <p className="text-[#6b7280]">Have fun while learning!</p>
        </div>
        <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
          <Link href={`/environment-kid/kid-learning-zone/${kidId}`}>Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {availableGames.map((game, index) => (
          <Card key={index} className="border-none shadow-sm overflow-hidden">
            <div className="h-48 bg-[#d9d9d9] relative">
              <Image
                src={`/placeholder.svg?height=192&width=384`}
                alt={game.title}
                width={384}
                height={192}
                className="w-full h-full object-cover"
              />
              {game.multiplayer && (
                <div className="absolute top-2 right-2 bg-[#83d98c] text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  <Users size={14} />
                  <span>Multiplayer</span>
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <GamepadIcon className="h-5 w-5 text-[#83d98c]" />
                <h3 className="font-semibold text-lg">{game.title}</h3>
              </div>
              <p className="text-[#6b7280] text-sm mb-4">{game.description}</p>
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-[#f59e0b] mr-1" />
                  <span>High Score: {game.highScore}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                  <span>{game.stars} stars available</span>
                </div>
              </div>
              <Button className="w-full bg-[#83d98c] hover:bg-[#6bc275]">
                <Link href={game.id === 7 ? `/environment-kid/kid-learning-zone/${kidId}/games/color-reflex` : `/environment-kid/kid-learning-zone/${kidId}/games/${game.id}`}>
                  {game.id === 7 ? 'Play Now' : 'Play'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

