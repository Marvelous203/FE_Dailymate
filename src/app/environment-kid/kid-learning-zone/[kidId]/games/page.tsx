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
      image: "https://media.canva.com/v2/image-resize/format:JPG/height:452/quality:92/uri:ifs%3A%2F%2FM%2F50a48f19-7faa-45c3-a597-fca5c3006c0c/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAEoKyUKcdDRthmVh7R8O5nZSH5PPsBy_t6QY9eqnkr7m&exp=1751549268&osig=AAAAAAAAAAAAAAAAAAAAAPSz_Pc0i83cGzTJCdzyaswgGkO3cfpL8CzD_984BDrk&signer=media-rpc&x-canva-quality=screen",
      description: "Kiểm tra phản xạ và khả năng nhận biết màu sắc của bạn.",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 8,
      title: "Xếp hình",
      image: "https://media.canva.com/v2/image-resize/format:JPG/height:452/quality:92/uri:ifs%3A%2F%2FM%2F9dedc566-5c43-4f0c-bca8-c71c2dfc81ae/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAATDaK7fwWZ3PJmnIvJtEPTqkQyQLIqGN4cvS6KEmSTt&exp=1751546974&osig=AAAAAAAAAAAAAAAAAAAAABF0Ly1GbOpbp-hagKck3flJPYfCfBNXTQkKJGTolMsI&signer=media-rpc&x-canva-quality=screen",
      description: "Học xếp hình và giải trí trí tuệ",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 9,
      title: "Phán đoán tình huống",
      image: "https://media.canva.com/v2/image-resize/format:JPG/height:452/quality:92/uri:ifs%3A%2F%2FM%2F425105d1-e246-4853-859e-683433db72fe/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAF1mYt_e1FqmtweMk6-f025Q9KU28BUkP38n5wSeX8ZX&exp=1751547186&osig=AAAAAAAAAAAAAAAAAAAAAPAEv4DgwjBF4LV_ZhfMBP3MfRBSdwyMbNDjH30tFD24&signer=media-rpc&x-canva-quality=screen",
      description: "Phán đoán tình huống trong cuộc sống",
      highScore: 0,
      stars: 25,
      multiplayer: false,
    },
    {
      id: 10,
      title: "Tô màu tự do",
      image: "https://media.canva.com/v2/image-resize/format:JPG/height:452/quality:92/uri:ifs%3A%2F%2FM%2F47770229-3fef-460c-9ee0-99cbb14ba617/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAA5mpt19XNrySDsJoz0ZKcyR7VBvMYoUdYNt2-JG_kDw&exp=1751546863&osig=AAAAAAAAAAAAAAAAAAAAAHQXliwxIDXixgzKU_SYvOMYxmFqi9Z9BAdSsuRI3f-W&signer=media-rpc&x-canva-quality=screen",
      description:
        "Bảng vẽ online với nhiều màu sắc để phát triển sáng tạo và cảm xúc",
      highScore: 0,
      stars: 30,
      multiplayer: false,
    },
    {
      id: 11,
      title: "Vẽ theo mẫu",
      image: "https://media.canva.com/v2/image-resize/format:JPG/height:452/quality:92/uri:ifs%3A%2F%2FM%2F771c536c-e7d4-47eb-aecc-cbbf2e90519f/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAKYbQAIkPdXgtw3Ik7m-TLVSzvn7r3AefcuTqqIlTcwr&exp=1751547212&osig=AAAAAAAAAAAAAAAAAAAAACndWRhG3qocnE_TV3ebzBlFS2PdXSL6Stoaue1E9aKj&signer=media-rpc&x-canva-quality=screen",
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
