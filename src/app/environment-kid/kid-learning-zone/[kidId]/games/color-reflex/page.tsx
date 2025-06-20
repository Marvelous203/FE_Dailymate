'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react" // Remove Star, Trophy
import { ColorReflexGame } from "@/components/mini-games/ColorReflexGame"

export default function ColorReflexPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" asChild>
          <Link href="/environment-kid/kid-learning-zone/games" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Back to Games</span>
          </Link>
        </Button>
      </div>

      <ColorReflexGame />
    </div>
  )
}