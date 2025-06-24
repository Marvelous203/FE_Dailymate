"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Palette,
  PaintBucket,
  Square,
  Circle,
  Minus,
} from "lucide-react";

interface Point {
  x: number;
  y: number;
}

export default function FreeDrawingGame() {
  const params = useParams();
  const router = useRouter();
  const kidId = params.kidId;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"brush" | "eraser" | "fill">("brush");
  const [lastPoint, setLastPoint] = useState<Point | null>(null);

  const colors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#A52A2A",
    "#808080",
    "#FFD700",
    "#90EE90",
    "#87CEEB",
    "#DDA0DD",
    "#F0E68C",
    "#FF6347",
    "#40E0D0",
    "#EE82EE",
    "#98FB98",
    "#F5DEB3",
    "#CD853F",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Fill with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set initial drawing properties
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });

    if (tool === "fill") {
      fillArea(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = tool === "eraser" ? "#000000" : currentColor;
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

  const fillArea = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixelColor(data, x, y, canvas.width);
    const fillColor = hexToRgb(currentColor);

    if (!fillColor || colorsEqual(targetColor, fillColor)) return;

    floodFill(data, x, y, canvas.width, canvas.height, targetColor, fillColor);
    ctx.putImageData(imageData, 0, 0);
  };

  const getPixelColor = (
    data: Uint8ClampedArray,
    x: number,
    y: number,
    width: number
  ) => {
    const index = (y * width + x) * 4;
    return {
      r: data[index],
      g: data[index + 1],
      b: data[index + 2],
      a: data[index + 3],
    };
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 255,
        }
      : null;
  };

  const colorsEqual = (color1: any, color2: any) => {
    return (
      color1.r === color2.r &&
      color1.g === color2.g &&
      color1.b === color2.b &&
      color1.a === color2.a
    );
  };

  const floodFill = (
    data: Uint8ClampedArray,
    x: number,
    y: number,
    width: number,
    height: number,
    targetColor: any,
    fillColor: any
  ) => {
    const stack = [{ x, y }];

    while (stack.length > 0) {
      const point = stack.pop();
      if (!point) continue;

      const { x: px, y: py } = point;
      if (px < 0 || px >= width || py < 0 || py >= height) continue;

      const index = (py * width + px) * 4;
      const currentColor = {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3],
      };

      if (!colorsEqual(currentColor, targetColor)) continue;

      data[index] = fillColor.r;
      data[index + 1] = fillColor.g;
      data[index + 2] = fillColor.b;
      data[index + 3] = fillColor.a;

      stack.push({ x: px + 1, y: py });
      stack.push({ x: px - 1, y: py });
      stack.push({ x: px, y: py + 1 });
      stack.push({ x: px, y: py - 1 });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-800">
              🎨 Tô Màu Tự Do
            </h1>
            <p className="text-gray-600">Hãy sáng tạo với màu sắc!</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={downloadImage} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Tải xuống
            </Button>
            <Button
              onClick={clearCanvas}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Xóa hết
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Tools Panel */}
          <Card className="w-64 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Công cụ vẽ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tool Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Chọn công cụ:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={tool === "brush" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool("brush")}
                    className="flex flex-col items-center p-2 h-auto"
                  >
                    <Minus className="w-4 h-4 mb-1" />
                    Cọ vẽ
                  </Button>
                  <Button
                    variant={tool === "eraser" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool("eraser")}
                    className="flex flex-col items-center p-2 h-auto"
                  >
                    <Square className="w-4 h-4 mb-1" />
                    Tẩy
                  </Button>
                  <Button
                    variant={tool === "fill" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool("fill")}
                    className="flex flex-col items-center p-2 h-auto"
                  >
                    <PaintBucket className="w-4 h-4 mb-1" />
                    Đổ màu
                  </Button>
                </div>
              </div>

              {/* Brush Size */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kích thước: {brushSize}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Chọn màu:
                </label>
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-full h-10 rounded border-2 border-gray-300"
                />
              </div>

              {/* Preset Colors */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Màu có sẵn:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-8 h-8 rounded border-2 ${
                        currentColor === color
                          ? "border-gray-800"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canvas */}
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="bg-white rounded-lg shadow-inner p-4 overflow-auto">
                <canvas
                  ref={canvasRef}
                  className="border border-gray-300 rounded cursor-crosshair"
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
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-3 rounded-full mb-2">
                  <Palette className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">Chọn màu</h3>
                <p className="text-sm text-gray-600">
                  Chọn màu yêu thích từ bảng màu hoặc nhập màu tùy chỉnh
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-2">
                  <PaintBucket className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-1">Vẽ và tô</h3>
                <p className="text-sm text-gray-600">
                  Sử dụng cọ vẽ để vẽ, hoặc đổ màu để tô toàn bộ vùng
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 p-3 rounded-full mb-2">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-1">Lưu tác phẩm</h3>
                <p className="text-sm text-gray-600">
                  Tải xuống bức tranh của bạn để lưu giữ hoặc chia sẻ
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
