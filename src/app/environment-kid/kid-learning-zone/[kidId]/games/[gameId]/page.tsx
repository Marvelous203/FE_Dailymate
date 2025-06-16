'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Star, Trophy } from "lucide-react"

export default function GamePage({ params }: { params: { gameId: string } }) {
  const [cards, setCards] = useState<number[]>([])
  const [flipped, setFlipped] = useState<boolean[]>([])
  const [matched, setMatched] = useState<boolean[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const numbers = [...Array(8).keys()].concat([...Array(8).keys()])
    const shuffled = numbers.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped(new Array(16).fill(false))
    setMatched(new Array(16).fill(false))
    setScore(0)
    setMoves(0)
  }

  const handleCardClick = (index: number) => {
    if (matched[index] || flipped[index]) return

    const newFlipped = [...flipped]
    newFlipped[index] = true
    setFlipped(newFlipped)

    const flippedCards = newFlipped.reduce((acc, curr, idx) => 
      curr && !matched[idx] ? [...acc, idx] : acc, [] as number[])

    if (flippedCards.length === 2) {
      setMoves(moves + 1)
      
      if (cards[flippedCards[0]] === cards[flippedCards[1]]) {
        const newMatched = [...matched]
        newMatched[flippedCards[0]] = true
        newMatched[flippedCards[1]] = true
        setMatched(newMatched)
        setScore(score + 10)
        setFlipped(new Array(16).fill(false))
      } else {
        setTimeout(() => {
          const newFlipped = [...newFlipped]
          newFlipped[flippedCards[0]] = false
          newFlipped[flippedCards[1]] = false
          setFlipped(newFlipped)
        }, 1000)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" asChild>
          <Link href="/environment-kid/kid-learning-zone/games" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Back to Games</span>
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#f59e0b]" />
            <span>Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-[#f59e0b]" />
            <span>Moves: {moves}</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <Card
              key={index}
              className={`h-24 cursor-pointer transition-all ${
                flipped[index] || matched[index] ? 'bg-[#83d98c] text-white' : 'bg-white'
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                {(flipped[index] || matched[index]) && card + 1}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="bg-[#83d98c] hover:bg-[#6bc275]" onClick={initializeGame}>
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  )
}