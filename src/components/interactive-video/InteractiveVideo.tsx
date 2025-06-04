"use client";

import { useState, useRef, useEffect, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface VideoInteraction {
  timestamp: number; // seconds
  type: 'question' | 'choice';
  content: {
    question: string;
    options: string[];
    correctAnswer: number;
    feedback: string;
  };
}

interface InteractiveVideoProps {
  videoSrc: string;
  interactions: VideoInteraction[];
  onComplete: (score: number) => void;
}

export function InteractiveVideo({ 
  videoSrc, 
  interactions, 
  onComplete 
}: InteractiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeInteraction, setActiveInteraction] = useState<VideoInteraction | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      
      // Check for interactions
      const interaction = interactions.find(
        int => Math.abs(int.timestamp - time) < 0.5 && !answers[int.timestamp]
      );
      
      if (interaction) {
        video.pause();
        setIsPlaying(false);
        setActiveInteraction(interaction);
      }
    };

    const handleEnded = () => {
      const score = calculateScore();
      onComplete(score);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [interactions, answers]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!activeInteraction) return;
    
    setAnswers(prev => ({ 
      ...prev, 
      [activeInteraction.timestamp]: optionIndex 
    }));
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setActiveInteraction(null);
      videoRef.current?.play();
      setIsPlaying(true);
    }, 2000);
  };

  const calculateScore = () => {
    const correct = interactions.filter(
      int => answers[int.timestamp] === int.content.correctAnswer
    ).length;
    return Math.round((correct / interactions.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="relative">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-auto"
            controls={false}
          />
          
          {/* Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-lg p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <div className="flex-1 mx-4">
              <div className="w-full bg-white/30 h-2 rounded-full">
                <div 
                  className="bg-[#83d98c] h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(currentTime / (videoRef.current?.duration || 1)) * 100}%` 
                  }}
                />
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  setCurrentTime(0);
                }
              }}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Interactive Question Overlay */}
      {activeInteraction && (
        <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {!showFeedback ? (
              <>
                <h3 className="text-xl font-bold mb-6 text-center">
                  {activeInteraction.content.question}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeInteraction.content.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleAnswer(index)}
                      className="p-4 h-auto text-left hover:bg-[#83d98c]/10 hover:border-[#83d98c]"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">
                  {answers[activeInteraction.timestamp] === activeInteraction.content.correctAnswer
                    ? "Chính xác! 🎉"
                    : "Chưa đúng! 😊"
                  }
                </h3>
                <p className="text-lg">{activeInteraction.content.feedback}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}