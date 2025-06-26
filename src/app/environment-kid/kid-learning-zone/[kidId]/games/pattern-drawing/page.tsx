"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  RefreshCw,
  Eye,
  CheckCircle,
  Star,
  RotateCcw,
} from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface Pattern {
  id: number;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  points: Point[];
  description: string;
}

export default function PatternDrawingGame() {
  const params = useParams();
  const router = useRouter();
  const kidId = params.kidId;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const patternCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#2563eb");
  const [brushSize, setBrushSize] = useState(3);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [showPattern, setShowPattern] = useState(true);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const patterns: Pattern[] = [
    {
      id: 1,
      name: "Ngôi nhà",
      difficulty: "easy",
      description: "Vẽ một ngôi nhà đơn giản với mái tam giác",
      points: [
        { x: 100, y: 200 },
        { x: 200, y: 200 },
        { x: 200, y: 150 },
        { x: 300, y: 150 },
        { x: 300, y: 200 },
        { x: 400, y: 200 },
        { x: 400, y: 300 },
        { x: 100, y: 300 },
        { x: 100, y: 200 },
        { x: 200, y: 150 },
        { x: 300, y: 150 },
        { x: 250, y: 100 },
        { x: 200, y: 150 },
      ],
    },
    {
      id: 2,
      name: "Hoa tulip",
      difficulty: "medium",
      description: "Vẽ một bông hoa tulip với thân cây",
      points: [
        { x: 200, y: 300 },
        { x: 200, y: 200 },
        { x: 180, y: 150 },
        { x: 160, y: 120 },
        { x: 180, y: 100 },
        { x: 200, y: 90 },
        { x: 220, y: 100 },
        { x: 240, y: 120 },
        { x: 220, y: 150 },
        { x: 200, y: 200 },
        { x: 180, y: 250 },
        { x: 160, y: 260 },
        { x: 180, y: 270 },
        { x: 220, y: 270 },
        { x: 240, y: 260 },
        { x: 220, y: 250 },
      ],
    },
    {
      id: 3,
      name: "Ô tô",
      difficulty: "medium",
      description: "Vẽ một chiếc ô tô với bánh xe",
      points: [
        { x: 80, y: 200 },
        { x: 120, y: 200 },
        { x: 120, y: 180 },
        { x: 200, y: 180 },
        { x: 220, y: 160 },
        { x: 280, y: 160 },
        { x: 300, y: 180 },
        { x: 380, y: 180 },
        { x: 380, y: 200 },
        { x: 420, y: 200 },
        { x: 420, y: 240 },
        { x: 80, y: 240 },
        { x: 80, y: 200 },
      ],
    },
    {
      id: 4,
      name: "Cây thông",
      difficulty: "hard",
      description: "Vẽ một cây thông với nhiều tầng lá",
      points: [
        { x: 200, y: 300 },
        { x: 200, y: 250 },
        { x: 180, y: 200 },
        { x: 160, y: 180 },
        { x: 140, y: 160 },
        { x: 200, y: 120 },
        { x: 260, y: 160 },
        { x: 240, y: 180 },
        { x: 220, y: 200 },
        { x: 200, y: 250 },
        { x: 170, y: 220 },
        { x: 150, y: 200 },
        { x: 200, y: 140 },
        { x: 250, y: 200 },
        { x: 230, y: 220 },
      ],
    },
    {
      id: 5,
      name: "Cá vàng",
      difficulty: "easy",
      description: "Vẽ một con cá vàng đáng yêu",
      points: [
        { x: 150, y: 200 },
        { x: 200, y: 180 },
        { x: 250, y: 160 },
        { x: 300, y: 180 },
        { x: 320, y: 200 },
        { x: 300, y: 220 },
        { x: 250, y: 240 },
        { x: 200, y: 220 },
        { x: 150, y: 200 },
        { x: 100, y: 180 },
        { x: 80, y: 200 },
        { x: 100, y: 220 },
      ],
    },
  ];

  useEffect(() => {
    if (!selectedPattern) {
      setSelectedPattern(patterns[0]);
    }
  }, []);

  useEffect(() => {
    setupCanvas();
    if (selectedPattern) {
      drawPattern();
    }
  }, [selectedPattern]);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const patternCanvas = patternCanvasRef.current;
    if (!canvas || !patternCanvas) return;

    const ctx = canvas.getContext("2d");
    const patternCtx = patternCanvas.getContext("2d");
    if (!ctx || !patternCtx) return;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 400;
    patternCanvas.width = 500;
    patternCanvas.height = 400;

    // Fill with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    patternCtx.fillStyle = "#FFFFFF";
    patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

    // Set drawing properties
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    patternCtx.lineCap = "round";
    patternCtx.lineJoin = "round";
  };

  const drawPattern = () => {
    if (!selectedPattern) return;
    const patternCanvas = patternCanvasRef.current;
    const ctx = patternCanvas?.getContext("2d");
    if (!patternCanvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

    // Draw pattern
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    if (selectedPattern.points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(selectedPattern.points[0].x, selectedPattern.points[0].y);

      for (let i = 1; i < selectedPattern.points.length; i++) {
        ctx.lineTo(selectedPattern.points[i].x, selectedPattern.points[i].y);
      }

      ctx.stroke();
    }

    // Draw circles at key points
    ctx.setLineDash([]);
    ctx.fillStyle = "#f87171";
    selectedPattern.points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Add numbers
      ctx.fillStyle = "#374151";
      ctx.font = "12px Arial";
      ctx.fillText((index + 1).toString(), point.x + 8, point.y - 8);
      ctx.fillStyle = "#f87171";
    });
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setAttempts((prev) => prev + 1);
  };

  const togglePattern = () => {
    setShowPattern(!showPattern);
  };

  const checkDrawing = () => {
    // Simple scoring system
    const newScore = Math.max(0, 100 - attempts * 10);
    setScore((prev) => prev + newScore);

    // Show success message
    alert(`Tuyệt vời! Bạn được ${newScore} điểm!`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Dễ";
      case "medium":
        return "Vừa";
      case "hard":
        return "Khó";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/environment-kid/kid-learning-zone/${kidId}/games`)
            }
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại Games
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">✏️ Vẽ Theo Mẫu</h1>
            <p className="text-gray-600">Quan sát và sao chép hình ảnh!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Điểm</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {attempts}
              </div>
              <div className="text-sm text-gray-600">Lần thử</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Pattern Selection */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Chọn mẫu vẽ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedPattern?.id === pattern.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPattern(pattern)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{pattern.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                        pattern.difficulty
                      )}`}
                    >
                      {getDifficultyText(pattern.difficulty)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{pattern.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Drawing Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={togglePattern}
                      variant={showPattern ? "default" : "outline"}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {showPattern ? "Ẩn mẫu" : "Hiện mẫu"}
                    </Button>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">
                        Kích thước cọ:
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm">{brushSize}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Màu:</label>
                      <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => setCurrentColor(e.target.value)}
                        className="w-8 h-8 rounded border"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={clearCanvas}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Vẽ lại
                    </Button>
                    <Button
                      onClick={checkDrawing}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Kiểm tra
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Canvas Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pattern Canvas */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">🎯 Mẫu vẽ</CardTitle>
                  {selectedPattern && (
                    <p className="text-sm text-gray-600">
                      {selectedPattern.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg shadow-inner p-4">
                    <canvas
                      ref={patternCanvasRef}
                      className={`border border-gray-300 rounded transition-opacity ${
                        showPattern ? "opacity-100" : "opacity-30"
                      }`}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "500px",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Drawing Canvas */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">✏️ Bài vẽ của bạn</CardTitle>
                  <p className="text-sm text-gray-600">Vẽ theo mẫu bên trái</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg shadow-inner p-4">
                    <canvas
                      ref={canvasRef}
                      className="border border-gray-300 rounded cursor-crosshair"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "500px",
                      }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Chọn mẫu</h3>
                    <p className="text-sm text-gray-600">
                      Chọn hình mẫu yêu thích từ danh sách
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 p-3 rounded-full mb-2">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Quan sát</h3>
                    <p className="text-sm text-gray-600">
                      Nhìn kỹ đường nét và điểm số trên mẫu
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-100 p-3 rounded-full mb-2">
                      <RefreshCw className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Vẽ theo</h3>
                    <p className="text-sm text-gray-600">
                      Sao chép hình mẫu trên canvas bên phải
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-100 p-3 rounded-full mb-2">
                      <CheckCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Kiểm tra</h3>
                    <p className="text-sm text-gray-600">
                      Nhấn kiểm tra để nhận điểm thưởng
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
