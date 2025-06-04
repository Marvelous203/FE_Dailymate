'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Clock, RefreshCw, ChevronRight } from 'lucide-react';


interface ColorOption {
  name: string;
  color: string;
}

const COLORS: ColorOption[] = [
  { name: 'Red', color: '#ef4444' },
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Green', color: '#22c55e' },
  { name: 'Yellow', color: '#eab308' },
  { name: 'Purple', color: '#a855f7' },
  { name: 'Orange', color: '#f97316' },
  { name: 'Pink', color: '#ec4899' },
  { name: 'Brown', color: '#92400e' },
];

export function ColorReflexGame() {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentColor, setCurrentColor] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<Array<{word: string, color: string, correctAnswer: string}>>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Khởi tạo game
  useEffect(() => {
    // Tải điểm cao từ localStorage
    const savedHighScore = localStorage.getItem('colorReflexHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Tạo bộ cards mới
  const generateCards = (count: number = 10) => {
    const newCards = [];
    
    for (let i = 0; i < count; i++) {
      // Chọn ngẫu nhiên một màu cho text
      const wordIndex = Math.floor(Math.random() * COLORS.length);
      const word = COLORS[wordIndex].name;

      // Chọn ngẫu nhiên một màu cho màu sắc hiển thị
      let colorIndex;
      do {
        colorIndex = Math.floor(Math.random() * COLORS.length);
      } while (level === 1 && colorIndex === wordIndex); // Ở level 1, đảm bảo màu và từ không trùng nhau

      const color = COLORS[colorIndex].color;
      const correctAnswer = COLORS[colorIndex].name;

      newCards.push({
        word,
        color,
        correctAnswer
      });
    }
    
    return newCards;
  };

  // Bắt đầu game
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setGameStarted(true);
    setCurrentCardIndex(0);
    setShowResult(false);
    
    // Tạo bộ cards mới
    const newCards = generateCards(10 + level * 2); // Số lượng card tăng theo level
    setCards(newCards);
    
    // Thiết lập card đầu tiên
    setCurrentWord(newCards[0].word);
    setCurrentColor(newCards[0].color);
    
    // Tạo các lựa chọn
    const correctColorName = newCards[0].correctAnswer;
    const falseAnswer = newCards[0].word; // Đáp án giả - tên của màu sắc hiển thị trong text
    
    // Chọn ngẫu nhiên 2 màu khác (không trùng với màu đúng và đáp án giả)
    const otherColors = COLORS.filter(c => c.name !== correctColorName && c.name !== falseAnswer)
      .map(c => c.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    // Kết hợp màu đúng với đáp án giả và 2 màu khác, sau đó xáo trộn
    const newOptions = shuffleArray([correctColorName, falseAnswer, ...otherColors]);
    setOptions(newOptions);
    
    // Bắt đầu đếm ngược
    setTimeLeft(3);
    startTimer();
  };

  // Bắt đầu đếm ngược
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          handleTimeout();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
  };

  // Xử lý khi hết thời gian
  const handleTimeout = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setShowResult(true);
    setIsCorrect(false);
    
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        nextCard();
      } else {
        endGame();
      }
    }, 1500);
  };

  // Xử lý khi người chơi chọn đáp án
  const handleAnswer = (selectedColor: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const currentCard = cards[currentCardIndex];
    const isAnswerCorrect = selectedColor === currentCard.correctAnswer;
    
    setShowResult(true);
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      // Đáp án đúng - tính điểm dựa trên thời gian còn lại
      const newScore = score + Math.ceil(timeLeft * 10) + level;
      setScore(newScore);
      
      // Cập nhật điểm cao
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('colorReflexHighScore', newScore.toString());
      }
    }
    
    // Chờ 1.5 giây trước khi chuyển sang card tiếp theo
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        nextCard();
      } else {
        endGame();
      }
    }, 1500);
  };

  // Chuyển sang card tiếp theo
  const nextCard = () => {
    const nextIndex = currentCardIndex + 1;
    setCurrentCardIndex(nextIndex);
    setShowResult(false);
    
    // Thiết lập card mới
    setCurrentWord(cards[nextIndex].word);
    setCurrentColor(cards[nextIndex].color);
    
    // Tạo các lựa chọn mới
    const correctColorName = cards[nextIndex].correctAnswer;
    const falseAnswer = cards[nextIndex].word; // Đáp án giả - tên của màu sắc hiển thị trong text
    
    // Chọn ngẫu nhiên 2 màu khác (không trùng với màu đúng và đáp án giả)
    const otherColors = COLORS.filter(c => c.name !== correctColorName && c.name !== falseAnswer)
      .map(c => c.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    // Kết hợp màu đúng với đáp án giả và 2 màu khác, sau đó xáo trộn
    const newOptions = shuffleArray([correctColorName, falseAnswer, ...otherColors]);
    setOptions(newOptions);
    
    // Bắt đầu đếm ngược lại
    setTimeLeft(3);
    startTimer();
  };

  // Kết thúc game
  const endGame = () => {
    setGameOver(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Hàm xáo trộn mảng (Fisher-Yates shuffle)
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Game header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#f59e0b]" />
            <span>Điểm: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b]" />
            <span>Điểm cao: {highScore}</span>
          </div>
        </div>
        {gameStarted && !gameOver && (
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <div className="w-16 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#83d98c] h-2.5 rounded-full transition-all duration-100" 
                style={{ width: `${(timeLeft / 5) * 100}%` }}
              ></div>
            </div>
            <span>{timeLeft.toFixed(1)}s</span>
          </div>
        )}
      </div>

      {/* Game content */}
      <Card className="border-none shadow-xl">
        <CardContent className="p-8">
          {!gameStarted ? (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">Phản xạ màu chữ</h2>
              <p className="text-gray-600">
                Chọn màu sắc của chữ (không phải nội dung văn bản).
                <br />
                Bạn có 3 giây để trả lời mỗi câu hỏi!
              </p>
              <Button 
                className="bg-[#83d98c] hover:bg-[#6bc275] text-lg px-8 py-6 h-auto"
                onClick={startGame}
              >
                Bắt đầu chơi
              </Button>
            </div>
          ) : gameOver ? (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">Kết thúc!</h2>
              <p className="text-xl">Điểm của bạn: {score}</p>
              {score >= highScore && (
                <p className="text-[#f59e0b] font-bold">🏆 Kỷ lục mới! 🏆</p>
              )}
              <div className="flex justify-center gap-4">
                <Button 
                  className="bg-[#83d98c] hover:bg-[#6bc275]"
                  onClick={startGame}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Chơi lại
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-gray-500">Level {level}</h3>
                <h3 className="text-sm text-gray-500">Card {currentCardIndex + 1}/{cards.length}</h3>
              </div>
              
              {/* Card hiển thị */}
              <div className="relative bg-white rounded-xl shadow-lg p-10 flex items-center justify-center">
                {showResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl z-10">
                    <div className={`text-4xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? 'ĐÚNG!' : 'SAI!'}
                    </div>
                  </div>
                )}
                <p 
                  className="text-6xl font-bold transition-all duration-300" 
                  style={{ color: currentColor }}
                >
                  {currentWord}
                </p>
              </div>
              
              {/* Các lựa chọn */}
              <div className="grid grid-cols-2 gap-4">
                {options.slice(0, 4).map((option, index) => {
                  const optionColor = COLORS.find(c => c.name === option)?.color;
                  return (
                    <Button
                      key={index}
                      className="h-16 text-lg font-medium transition-all duration-200 hover:scale-105"
                      style={{ 
                        backgroundColor: 'white', 
                        color: 'black',
                        border: '2px solid #e5e7eb'
                      }}
                      onClick={() => handleAnswer(option)}
                      disabled={showResult}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
              
              {/* Hiển thị nút Next khi đã chọn đáp án */}
              {showResult && currentCardIndex < cards.length - 1 && (
                <div className="flex justify-center">
                  <Button
                    className="bg-[#83d98c] hover:bg-[#6bc275]"
                    onClick={nextCard}
                  >
                    Tiếp theo <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}