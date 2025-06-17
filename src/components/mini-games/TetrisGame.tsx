import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, RotateCcw, Home, Play, Pause, ArrowDown, ArrowLeft, ArrowRight, RotateCw, Clock, Target, Zap } from 'lucide-react';

// Định nghĩa các khối Tetromino
const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00f0f0'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#a000f0'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00f000'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#f00000'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000f0'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#f0a000'
  }
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 25;

// Định nghĩa các chế độ chơi
type GameMode = 'classic' | 'speed' | 'challenge';

interface GameModeConfig {
  name: string;
  description: string;
  icon: any;
  initialDropTime: number;
  timeLimit?: number; // giây
  targetScore?: number;
  targetLines?: number;
  speedMultiplier: number;
}

const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    name: 'Chế độ Cổ điển',
    description: 'Chơi không giới hạn thời gian, tốc độ tăng dần theo level',
    icon: Play,
    initialDropTime: 600,
    speedMultiplier: 1
  },
  speed: {
    name: 'Chế độ Tốc độ',
    description: 'Chơi trong 3 phút với tốc độ cao',
    icon: Zap,
    initialDropTime: 300,
    timeLimit: 180, // 3 phút
    speedMultiplier: 2
  },
  challenge: {
    name: 'Chế độ Thử thách',
    description: 'Đạt 50 hàng để thắng',
    icon: Target,
    initialDropTime: 800,
    targetLines: 50,
    speedMultiplier: 1.5
  }
};

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  color: string;
  position: Position;
}

export function TetrisGame() {
  // Game mode selection
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [showModeSelection, setShowModeSelection] = useState<boolean>(true);
  
  // Game state
  const [board, setBoard] = useState<string[][]>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(''))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lines, setLines] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [dropTime, setDropTime] = useState<number>(1000);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastDropTime = useRef<number>(0);

  // Tạo khối Tetromino ngẫu nhiên
  const createRandomPiece = useCallback((): Piece => {
    const tetrominoKeys = Object.keys(TETROMINOS) as Array<keyof typeof TETROMINOS>;
    const randomKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
    const tetromino = TETROMINOS[randomKey];
    
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2), y: 0 }
    };
  }, []);

  // Kiểm tra va chạm
  const checkCollision = useCallback((piece: Piece, board: string[][], dx = 0, dy = 0): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.position.x + x + dx;
          const newY = piece.position.y + y + dy;
          
          // Kiểm tra biên
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }
          
          // Kiểm tra va chạm với khối đã đặt
          if (newY >= 0 && board[newY][newX] !== '') {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  // Xoay khối
  const rotatePiece = useCallback((piece: Piece): Piece => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    
    return {
      ...piece,
      shape: rotated
    };
  }, []);

  // Di chuyển khối
  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver || gameWon || isPaused) return;
    
    const newPiece = {
      ...currentPiece,
      position: {
        x: currentPiece.position.x + dx,
        y: currentPiece.position.y + dy
      }
    };
    
    if (!checkCollision(newPiece, board)) {
      setCurrentPiece(newPiece);
    } else if (dy > 0) {
      // Khối chạm đất, đặt vào board
      placePiece();
    }
  }, [currentPiece, board, gameOver, gameWon, isPaused, checkCollision]);

  // Xoay khối
  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver || gameWon || isPaused) return;
    
    const rotatedPiece = rotatePiece(currentPiece);
    
    if (!checkCollision(rotatedPiece, board)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, board, gameOver, gameWon, isPaused, rotatePiece, checkCollision]);

  // Đặt khối vào board
  const placePiece = useCallback(() => {
    if (!currentPiece) return;
    
    const newBoard = board.map(row => [...row]);
    
    // Đặt khối vào board
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }
    
    setBoard(newBoard);
    
    // Kiểm tra và xóa hàng đầy
    clearLines(newBoard);
    
    // Tạo khối mới
    setCurrentPiece(nextPiece);
    setNextPiece(createRandomPiece());
    
    // Kiểm tra game over
    if (nextPiece && checkCollision(nextPiece, newBoard)) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [currentPiece, nextPiece, board, createRandomPiece, checkCollision]);

  // Xóa hàng đầy
  const clearLines = useCallback((board: string[][]) => {
    const newBoard = board.filter(row => row.some(cell => cell === ''));
    const linesCleared = BOARD_HEIGHT - newBoard.length;
    
    if (linesCleared > 0) {
      // Thêm hàng trống vào đầu
      const emptyRows = Array(linesCleared).fill(null).map(() => Array(BOARD_WIDTH).fill(''));
      const finalBoard = [...emptyRows, ...newBoard];
      
      setBoard(finalBoard);
      setLines(prev => {
        const newLines = prev + linesCleared;
        
        // Kiểm tra điều kiện thắng cho challenge mode
        if (selectedMode === 'challenge' && newLines >= GAME_MODES.challenge.targetLines!) {
          setGameWon(true);
          setIsPlaying(false);
        }
        
        return newLines;
      });
      
      // Tính điểm với bonus theo mode
      const basePoints = [0, 40, 100, 300, 1200][linesCleared] * level;
      const modeMultiplier = selectedMode ? GAME_MODES[selectedMode].speedMultiplier : 1;
      const points = Math.floor(basePoints * modeMultiplier);
      setScore(prev => prev + points);
      
      // Tăng level
      const newLevel = Math.floor((lines + linesCleared) / 10) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        const modeConfig = selectedMode ? GAME_MODES[selectedMode] : GAME_MODES.classic;
        const newDropTime = Math.max(50, modeConfig.initialDropTime - (newLevel - 1) * 50);
        setDropTime(newDropTime);
      }
    }
  }, [level, lines, selectedMode]);

  // Game loop
  const gameLoop = useCallback(() => {
    const now = Date.now();
    if (now - lastDropTime.current > dropTime) {
      movePiece(0, 1);
      lastDropTime.current = now;
    }
  }, [movePiece, dropTime]);

  // Timer cho speed mode
  const updateTimer = useCallback(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        setGameOver(true);
        setIsPlaying(false);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  // Xử lý phím
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Ngăn chặn scroll mặc định của trình duyệt
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      event.preventDefault();
    }
    
    if (!isPlaying) return;
    
    // Cho phép tạm dừng/tiếp tục ngay cả khi đang pause
    if (event.key === 'p' || event.key === 'P') {
      setIsPaused(prev => !prev);
      return;
    }
    
    if (isPaused) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        movePiece(0, 1);
        break;
      case 'ArrowUp':
      case ' ':
        rotatePieceHandler();
        break;
    }
  }, [isPlaying, isPaused, movePiece, rotatePieceHandler]);

  // Effects
  useEffect(() => {
    if (isPlaying && !isPaused && !gameOver && !gameWon) {
      gameLoopRef.current = setInterval(gameLoop, 16);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, isPaused, gameOver, gameWon, gameLoop]);

  useEffect(() => {
    if (selectedMode === 'speed' && isPlaying && !isPaused && !gameOver && !gameWon) {
      timerRef.current = setInterval(updateTimer, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [selectedMode, isPlaying, isPaused, gameOver, gameWon, updateTimer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Chọn chế độ chơi
  // Chọn chế độ chơi
  const selectMode = (mode: GameMode) => {
  // Reset game state trước khi chọn chế độ mới
  setIsPlaying(false);
  setIsPaused(false);
  setGameOver(false);
  setGameWon(false);
  setCurrentPiece(null);
  setNextPiece(null);
  setScore(0);
  setLevel(1);
  setLines(0);
  setTimeLeft(0);
  setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill('')));
  
  // Clear any running timers
  if (gameLoopRef.current) {
    clearInterval(gameLoopRef.current);
    gameLoopRef.current = null;
  }
  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
  
  // Chọn chế độ mới
  setSelectedMode(mode);
  setShowModeSelection(false);
};

  // Bắt đầu game
  const startGame = () => {
    if (!selectedMode) return;
    
    const firstPiece = createRandomPiece();
    const secondPiece = createRandomPiece();
    const modeConfig = GAME_MODES[selectedMode];
    
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill('')));
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setGameWon(false);
    setIsPaused(false);
    setIsPlaying(true);
    setDropTime(modeConfig.initialDropTime);
    
    // Thiết lập timer cho speed mode
    if (selectedMode === 'speed') {
      setTimeLeft(modeConfig.timeLimit!);
    }
    
    lastDropTime.current = Date.now();
  };

  // Reset game
  const resetGame = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setGameOver(false);
    setGameWon(false);
    setCurrentPiece(null);
    setNextPiece(null);
    setShowModeSelection(true);
    setSelectedMode(null);
  };

  // Render board với khối hiện tại
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Vẽ khối hiện tại
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }
    
    return displayBoard;
  };

  // Render khối tiếp theo
  const renderNextPiece = () => {
    if (!nextPiece) return null;
    
    return (
      <div className="grid gap-1 p-4 bg-gray-100 rounded">
        {nextPiece.shape.map((row, y) => (
          <div key={y} className="flex gap-1">
            {row.map((cell, x) => (
              <div
                key={x}
                className="border"
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: cell ? nextPiece.color : 'transparent',
                  borderColor: cell ? '#000' : '#ccc'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Format thời gian
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render mode selection
  if (showModeSelection) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <Card className="mb-6">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">Chọn Chế độ Chơi</h1>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(GAME_MODES).map(([mode, config]) => {
                const IconComponent = config.icon;
                return (
                  <Card 
                    key={mode} 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
                    onClick={() => selectMode(mode as GameMode)}
                  >
                    <CardContent className="p-6 text-center">
                      <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-xl font-bold mb-2">{config.name}</h3>
                      <p className="text-gray-600 mb-4">{config.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        {config.timeLimit && (
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Thời gian: {config.timeLimit / 60} phút</span>
                          </div>
                        )}
                        {config.targetLines && (
                          <div className="flex items-center justify-center gap-2">
                            <Target className="w-4 h-4" />
                            <span>Mục tiêu: {config.targetLines} hàng</span>
                          </div>
                        )}
                        <div className="text-blue-600 font-semibold">
                          Tốc độ: x{config.speedMultiplier}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-800">Tetris Game</h1>
              <p className="text-gray-600">{selectedMode && GAME_MODES[selectedMode].name}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Điểm</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{lines}</div>
                <div className="text-sm text-gray-600">Hàng</div>
              </div>
              {selectedMode === 'speed' && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-gray-600">Thời gian</div>
                </div>
              )}
              {selectedMode === 'challenge' && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {GAME_MODES.challenge.targetLines! - lines}
                  </div>
                  <div className="text-sm text-gray-600">Còn lại</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 mb-4">
            {!isPlaying ? (
              <Button onClick={startGame} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Bắt đầu
              </Button>
            ) : (
              <Button onClick={() => setIsPaused(!isPaused)} className="flex items-center gap-2">
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              </Button>
            )}
            <Button onClick={resetGame} variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Chọn chế độ khác
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        {/* Game Board */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <div 
              className="inline-block border-4 border-gray-800 relative bg-black"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${CELL_SIZE}px)`,
                gap: '1px'
              }}
            >
              {renderBoard().map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${y}-${x}`}
                    className="border border-gray-700"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      backgroundColor: cell || '#111'
                    }}
                  />
                ))
              )}
            </div>
            
            {isPaused && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 text-center shadow-2xl max-w-sm mx-4">
                  <Pause className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Tạm Dừng</h2>
                  <p className="text-gray-600 mb-6">Nhấn nút bên dưới hoặc phím P để tiếp tục</p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setIsPaused(false)} 
                      className="w-full flex items-center justify-center gap-2"
                      size="lg"
                    >
                      <Play className="w-5 h-5" />
                      Tiếp tục chơi
                    </Button>
                    
                    <Button 
                      onClick={resetGame} 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      size="lg"
                    >
                      <Home className="w-5 h-5" />
                      Về menu chính
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Phím tắt: <kbd className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">P</kbd> để tạm dừng/tiếp tục
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Side Panel */}
        <div className="w-80 space-y-4">
          {/* Next Piece */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Khối tiếp theo</h3>
              {renderNextPiece()}
            </CardContent>
          </Card>

          {/* Mode Info */}
          {selectedMode && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Thông tin chế độ</h3>
                <div className="space-y-2 text-sm">
                  <div>Chế độ: {GAME_MODES[selectedMode].name}</div>
                  <div>Tốc độ: x{GAME_MODES[selectedMode].speedMultiplier}</div>
                  {selectedMode === 'speed' && (
                    <div className="text-red-600 font-semibold">
                      Thời gian còn lại: {formatTime(timeLeft)}
                    </div>
                  )}
                  {selectedMode === 'challenge' && (
                    <div className="text-orange-600 font-semibold">
                      Cần xóa: {GAME_MODES.challenge.targetLines! - lines} hàng nữa
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Điều khiển</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <ArrowRight className="w-4 h-4" />
                  <span>Di chuyển trái/phải</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4" />
                  <span>Rơi nhanh</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  <span>Xoay (↑ hoặc Space)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-gray-200 px-1 rounded">P</span>
                  <span>Tạm dừng</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Controls */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Điều khiển di động</h3>
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <Button 
                  size="sm" 
                  onClick={rotatePieceHandler}
                  disabled={!isPlaying || isPaused}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                <div></div>
                
                <Button 
                  size="sm" 
                  onClick={() => movePiece(-1, 0)}
                  disabled={!isPlaying || isPaused}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => movePiece(0, 1)}
                  disabled={!isPlaying || isPaused}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => movePiece(1, 0)}
                  disabled={!isPlaying || isPaused}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <div className="space-y-2 mb-6">
                <div className="text-lg">Chế độ: <span className="font-bold">{selectedMode && GAME_MODES[selectedMode].name}</span></div>
                <div className="text-lg">Điểm cuối: <span className="font-bold text-blue-600">{score}</span></div>
                <div className="text-lg">Level đạt được: <span className="font-bold text-green-600">{level}</span></div>
                <div className="text-lg">Hàng đã xóa: <span className="font-bold text-purple-600">{lines}</span></div>
              </div>
              <div className="flex gap-2">
                <Button onClick={startGame} className="flex-1">
                  Chơi lại
                </Button>
                <Button onClick={resetGame} variant="outline" className="flex-1">
                  Chọn chế độ khác
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Game Won Modal */}
      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-green-600">Chúc mừng! Bạn đã thắng!</h2>
              <div className="space-y-2 mb-6">
                <div className="text-lg">Chế độ: <span className="font-bold">{selectedMode && GAME_MODES[selectedMode].name}</span></div>
                <div className="text-lg">Điểm cuối: <span className="font-bold text-blue-600">{score}</span></div>
                <div className="text-lg">Level đạt được: <span className="font-bold text-green-600">{level}</span></div>
                <div className="text-lg">Hàng đã xóa: <span className="font-bold text-purple-600">{lines}</span></div>
              </div>
              <div className="flex gap-2">
                <Button onClick={startGame} className="flex-1">
                  Chơi lại
                </Button>
                <Button onClick={resetGame} variant="outline" className="flex-1">
                  Chọn chế độ khác
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}