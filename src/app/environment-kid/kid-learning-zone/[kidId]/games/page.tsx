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
      image: "https://template.canva.com/EAGZa5jXR5w/2/0/1600w-rkrsaNiGy38.jpg",
      description: "Learn typing while racing against friends.",
      highScore: 2800,
      stars: 18,
      multiplayer: true,
    },
    {
      id: 7,
      title: "Phản xạ màu chữ",
      image: "https://media.canva.com/v2/files/uri:ifs%3A%2F%2FS%2F658e9d1b-d8e2-458b-acf9-7ab69d08c30c_00000009_000?csig=AAAAAAAAAAAAAAAAAAAAADCUsbbADoKoor8aemJFj-tJPDkpRakiUiWWnazQa5Gl&exp=1752300086&signer=assistant-rpc&token=AAIAAVMAMTY1OGU5ZDFiLWQ4ZTItNDU4Yi1hY2Y5LTdhYjY5ZDA4YzMwY18wMDAwMDAwOV8wMDAAAAAAAZf9OWRtOJ9S6aIEd8MxEDR5xkmpSOTfpVlhcwpP_qY_c6WTJ-M",
      description: "Kiểm tra phản xạ và khả năng nhận biết màu sắc của bạn.",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 8,
      title: "Xếp hình",
      image: "https://media.canva.com/v2/files/uri:ifs%3A%2F%2FS%2F658e9d1b-d8e2-458b-acf9-7ab69d08c30c_00000016_002?csig=AAAAAAAAAAAAAAAAAAAAABbW0b4klDPXKj4gfyEN7gG3PxNDWEAwszYhZ0NE5b5E&exp=1752300086&signer=assistant-rpc&token=AAIAAVMAMTY1OGU5ZDFiLWQ4ZTItNDU4Yi1hY2Y5LTdhYjY5ZDA4YzMwY18wMDAwMDAxNl8wMDIAAAAAAZf9OWRtoN9pL8Wl9p1qcrgPEkX8Ye_foFzeW0ndoeBbVwprHtM",
      description: "Học xếp hình và giải trí trí tuệ",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 9,
      title: "Phán đoán tình huống",
      image: "https://media.canva.com/v2/files/uri:ifs%3A%2F%2FM%2F92b0ec5d-0f0b-4b49-8c08-dd02e9f8dbb3?csig=AAAAAAAAAAAAAAAAAAAAAHfkKBJmzlQVsLlQwwr5C1GgiXNtmsjfi4yPqt8dH_Hq&exp=1752314325&signer=media-rpc&token=AAIAAU0AJDkyYjBlYzVkLTBmMGItNGI0OS04YzA4LWRkMDJlOWY4ZGJiMwAAAAABl_4SqAgSgBdiDxlp9LPqAZ-QBkeI-4yz7lhghyOqeAnoUMWyag",
      description: "Phán đoán tình huống trong cuộc sống",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 10,
      title: "Tô màu tự do",
      image: "https://media.canva.com/v2/files/uri:ifs%3A%2F%2FS%2F658e9d1b-d8e2-458b-acf9-7ab69d08c30c_00000036_002?csig=AAAAAAAAAAAAAAAAAAAAABvQp29Uo0H0aw6L-Ouzpr7Q2SBts5aY5fBylZh6Aadw&exp=1752300405&signer=assistant-rpc&token=AAIAAVMAMTY1OGU5ZDFiLWQ4ZTItNDU4Yi1hY2Y5LTdhYjY5ZDA4YzMwY18wMDAwMDAzNl8wMDIAAAAAAZf9PkPQaX01W9sXPRubg2hMwBd3GuRAtXdbca1exVan1mHNMUM",
      description:
        "Bảng vẽ online với nhiều màu sắc để phát triển sáng tạo và cảm xúc",
      highScore: 0,
      stars: 30,
      multiplayer: false,
    },
    {
      id: 11,
      title: "Vẽ theo mẫu",
      image: "https://media.canva.com/v2/files/uri:ifs%3A%2F%2FS%2F658e9d1b-d8e2-458b-acf9-7ab69d08c30c_00000057_000?csig=AAAAAAAAAAAAAAAAAAAAAOPbmhz3B2vWdeC8gRi7JUGUH_bxfR4tgpnE7n1kjiM1&exp=1752300545&signer=assistant-rpc&token=AAIAAVMAMTY1OGU5ZDFiLWQ4ZTItNDU4Yi1hY2Y5LTdhYjY5ZDA4YzMwY18wMDAwMDA1N18wMDAAAAAAAZf9QGXBetpmJtS2Dfh_C5dQTUMMKrFSyulE8zka5t2KQGhdu3E",
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
