"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GamepadIcon, Star, Trophy, Users } from "lucide-react";
import { useParams } from "next/navigation";

export default function GamesPage() {
  const params = useParams();
  const kidId = params.kidId;
  const availableGames = [
    {
      id: 6,
      title: "Typing Race",
      image: "https://images.unsplash.com/photo-1730091500672-d74549d1119a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Learn typing while racing against friends.",
      highScore: 2800,
      stars: 18,
      multiplayer: true,
    },
    {
      id: 7,
      title: "Phản xạ màu chữ",
      image: "https://images.unsplash.com/photo-1593791718814-b720d7979607?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbG9yZnVsJTIwdGV4dCUyMGFiY3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Kiểm tra phản xạ và khả năng nhận biết màu sắc của bạn.",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 8,
      title: "Xếp hình",
      image: "https://images.unsplash.com/photo-1575364289437-fb1479d52732?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxwdXp6bGUlMjBraWR8ZW58MHx8MHx8fDA%3D",
      description: "Học xếp hình và giải trí trí tuệ",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 9,
      title: "Phán đoán tình huống",
      image: "https://images.unsplash.com/photo-1641439927222-6138ce56f90d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxnYW1lJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
      description: "Phán đoán tình huống trong cuộc sống",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 10,
      title: "Tô màu tự do",
      image: "https://images.unsplash.com/photo-1583156944293-8951639522fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGFydCUyMHN1cHBsaWVzJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Bảng vẽ online với nhiều màu sắc để phát triển sáng tạo và cảm xúc",
      highScore: 0,
      stars: 30,
      multiplayer: false,
    },
    {
      id: 11,
      title: "Vẽ theo mẫu",
      image: "https://images.unsplash.com/photo-1616627981431-ed306bb11ac0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJhd2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Quan sát và sao chép hình ảnh để phát triển kỹ năng quan sát",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Learning Games</h1>
          <p className="text-[#6b7280]">Have fun while learning!</p>
        </div>
        <Button className="bg-[#83d98c] hover:bg-[#6bc275]">
          <Link href={`/environment-kid/kid-learning-zone/${kidId}`}>
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {availableGames.map((game, index) => (
          <Card key={index} className="border-none shadow-sm overflow-hidden">
            <div className="h-48 bg-[#d9d9d9] relative">
              <Image
                src={game.image}
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
                <Link
                  href={
                    game.id === 7
                      ? `/environment-kid/kid-learning-zone/${kidId}/games/color-reflex`
                      : game.id === 8
                        ? `/environment-kid/kid-learning-zone/${kidId}/games/block-puzzle`
                        : game.id === 9
                          ? `/environment-kid/kid-learning-zone/${kidId}/games/decision-making`
                          : game.id === 10
                            ? `/environment-kid/kid-learning-zone/${kidId}/games/free-drawing`
                            : game.id === 11
                              ? `/environment-kid/kid-learning-zone/${kidId}/games/pattern-drawing`
                              : `/environment-kid/kid-learning-zone/${kidId}/games/${game.id}`
                  }
                >
                  {game.id === 7 ? "Play Now" : "Play"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
