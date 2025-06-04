'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SequenceItem {
  id: string
  content: string
  order: number
}

interface SequenceGameProps {
  title: string
  items: SequenceItem[]
  onComplete: (isCorrect: boolean) => void
}

function SortableItem({ item }: { item: SequenceItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 bg-white border-2 rounded-lg cursor-move transition-all ${
        isDragging ? 'shadow-lg border-[#83d98c] opacity-50' : 'border-gray-200'
      }`}
    >
      {item.content}
    </div>
  )
}

export function SequenceGame({ title, items, onComplete }: SequenceGameProps) {
  const [currentItems, setCurrentItems] = useState(
    [...items].sort(() => Math.random() - 0.5)
  )
  const [isCompleted, setIsCompleted] = useState(false)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setCurrentItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const checkAnswer = () => {
    const isCorrect = currentItems.every((item, index) => item.order === index + 1)
    setIsCompleted(true)
    onComplete(isCorrect)
  }

  return (
    <Card className="border-none shadow-xl">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold mb-6 text-center">{title}</h3>
        
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={currentItems.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {currentItems.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button 
          onClick={checkAnswer}
          disabled={isCompleted}
          className="w-full mt-6 bg-[#83d98c] hover:bg-[#6bc275]"
        >
          Kiểm tra đáp án
        </Button>
        
        {isCompleted && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-green-800 font-semibold">
              {currentItems.every((item, index) => item.order === index + 1)
                ? "🎉 Chính xác! Bạn đã sắp xếp đúng thứ tự!"
                : "😊 Chưa đúng! Hãy thử lại nhé!"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}