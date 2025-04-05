import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Trophy } from "lucide-react";

export default function KidGamesPage() {
  return (
    <div>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Fun Learning Games</h1>
        <p className="text-[#6b7280]">Play games and earn stars!</p>
      </div>

      {/* Game Categories */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-8 hide-scrollbar">
        <Button className="bg-[#10b981] hover:bg-[#059669] rounded-full">
          All Games
        </Button>
        <Button variant="outline" className="rounded-full">
          Math Games
        </Button>
        <Button variant="outline" className="rounded-full">
          Word Games
        </Button>
        <Button variant="outline" className="rounded-full">
          Science Games
        </Button>
        <Button variant="outline" className="rounded-full">
          Puzzle Games
        </Button>
        <Button variant="outline" className="rounded-full">
          Memory Games
        </Button>
      </div>

      {/* Featured Game */}
      <h2 className="text-xl font-bold mb-4">Featured Game</h2>
      <Card className="border-none shadow-sm overflow-hidden mb-8">
        <div className="h-48 md:h-64 bg-[#d9d9d9] relative">
          <Image
            src={`/placeholder.svg?height=256&width=768`}
            alt="Math Adventure"
            width={768}
            height={256}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <div className="bg-[#10b981] text-white px-3 py-1 rounded-full text-sm w-fit mb-2">
              New Game
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Math Adventure
            </h3>
            <p className="text-white/80 mb-4">
              Solve math puzzles and save the kingdom!
            </p>
            <Button className="bg-white text-[#10b981] hover:bg-white/90 w-fit">
              Play Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Popular Games */}
      <h2 className="text-xl font-bold mb-4">Popular Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {popularGames.map((game, index) => (
          <Card key={index} className="border-none shadow-sm overflow-hidden">
            <div className="h-32 bg-[#d9d9d9] relative">
              <Image
                src={`/placeholder.svg?height=128&width=256`}
                alt={game.title}
                width={256}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{game.title}</h3>
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                  <span>Earn {game.stars} stars</span>
                </div>
                <div className="flex items-center text-[#6b7280]">
                  <Clock size={16} className="mr-1" />
                  <span>{game.duration}</span>
                </div>
              </div>
              <Button className="w-full bg-[#10b981] hover:bg-[#059669]">
                Play Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Game Leaderboard */}
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Players This Week</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {leaderboard.map((player, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-[#fef3c7] text-[#f59e0b]"
                        : index === 1
                        ? "bg-[#f1f5f9] text-[#64748b]"
                        : index === 2
                        ? "bg-[#fef2f2] text-[#ef4444]"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    {index === 0 ? (
                      <Trophy className="h-4 w-4 fill-[#f59e0b]" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#d9d9d9]">
                      <Image
                        src={`/placeholder.svg?height=32&width=32`}
                        alt={player.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b] mr-1" />
                  <span className="font-medium">{player.stars} stars</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const popularGames = [
  {
    title: "Math Blast",
    stars: 10,
    duration: "5 min",
  },
  {
    title: "Word Puzzle",
    stars: 15,
    duration: "10 min",
  },
  {
    title: "Memory Match",
    stars: 8,
    duration: "3 min",
  },
  {
    title: "Science Explorer",
    stars: 12,
    duration: "7 min",
  },
  {
    title: "Spelling Bee",
    stars: 9,
    duration: "5 min",
  },
  {
    title: "Pattern Quest",
    stars: 11,
    duration: "6 min",
  },
];

const leaderboard = [
  {
    name: "Alex J.",
    stars: 156,
  },
  {
    name: "Emma S.",
    stars: 142,
  },
  {
    name: "Noah W.",
    stars: 128,
  },
  {
    name: "Olivia B.",
    stars: 115,
  },
  {
    name: "Liam D.",
    stars: 98,
  },
];
