'use client';

import { BlockPuzzleGame } from '@/components/mini-games/BlockPuzzleGame';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { TetrisGame } from '@/components/mini-games/TetrisGame';

export default function BlockPuzzlePage() {
  const params = useParams();
  const kidId = params.kidId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="p-4">
        <Button variant="ghost" asChild>
          <Link href={`/environment-kid/kid-learning-zone/${kidId}/games`} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Quay lại Games
          </Link>
        </Button>
      </div>
      <TetrisGame />
    </div>
  );
}