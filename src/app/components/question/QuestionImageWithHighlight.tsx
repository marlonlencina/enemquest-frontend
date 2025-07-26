"use client";

import { useEffect, useRef, useState } from "react";
import TextButton from "../layout/TextButton";

interface QuestionImageProps {
  src: string;
  alt: string;
  questionId?: string;
  exam?: string;
  width?: number;
  height?: number;
  enableZoom?: boolean;
}

export const QuestionImageWithHighlight = ({
  src,
  alt,
  width = 800,
  height = 600,
}: QuestionImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height,
  });
  const [brushSize, setBrushSize] = useState(15);
  const [brushColor, setBrushColor] = useState("#0a66b9");

  useEffect(() => {
    const updateCanvasSize = () => {
      if (imageRef.current) {
        const img = imageRef.current;
        setCanvasSize({
          width: img.clientWidth,
          height: img.clientHeight,
        });
      }
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        updateCanvasSize();
      } else {
        img.onload = updateCanvasSize;
      }
    }
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Salvar o conteúdo atual do canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;

    // Restaurar o conteúdo salvo
    if (imageData.width > 0 && imageData.height > 0) {
      ctx.putImageData(imageData, 0, 0);
    }
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
  }, [brushSize, brushColor]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = size;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <div className="h-[64px] border border-gray-300-custom bg-gray-200-custom rounded-full flex items-center justify-between gap-6 pr-6">
        <div className="flex items-center gap-6">
          <div className="h-[64px] w-[64px] grid place-content-center ">
            <div
              className="relative w-[40px] h-[40px] rounded-full border-2 border-gray-300 cursor-pointer shadow-md hover:scale-105 transition-transform"
              style={{ backgroundColor: brushColor.slice(0, 7) }}
              onClick={() => document.getElementById("color-picker")?.click()}
            >
              <input
                id="color-picker"
                className="absolute top-full left-0 right-0 opacity-0 pointer-events-none"
                type="color"
                value={brushColor.slice(0, 7)}
                onChange={(e) => setBrushColor(e.target.value + "aa")}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm12 text-gray-500-custom font-button">
              Tamanho do Marca texto:
            </span>
            <div className="flex items-center">
              <div
                onClick={() => handleBrushSizeChange(24)}
                className="h-[64px] px-4 grid place-content-center group cursor-pointer"
              >
                <span
                  className={`w-[32px] h-[32px] rounded-full bg-gray-400-custom ${
                    brushSize === 24 ? "bg-gray-500" : "opacity-65"
                  } transition-all`}
                ></span>
              </div>
              <div
                onClick={() => handleBrushSizeChange(16)}
                className="h-[64px] px-4 grid place-content-center group cursor-pointer"
              >
                <span
                  className={`w-[24px] h-[24px] rounded-full bg-gray-400-custom ${
                    brushSize === 16 ? "bg-gray-500" : "opacity-65"
                  } transition-all`}
                ></span>
              </div>
              <div
                onClick={() => handleBrushSizeChange(8)}
                className="h-[64px] px-4 grid place-content-center group cursor-pointer"
              >
                <span
                  className={`w-[16px] h-[16px] rounded-full bg-gray-400-custom ${
                    brushSize === 8 ? "bg-gray-500" : "opacity-65"
                  } transition-all`}
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <TextButton text="Limpar" onClick={clearCanvas} />
        </div>
      </div>
      <div className="mt-6 bg-white-custom p-6 w-full h-[800px] rounded-lg overflow-y-auto relative">
        <div className="w-full bg-blue-500" style={{ position: "relative" }}>
          <img
            ref={imageRef}
            width={width}
            height={height}
            alt={alt}
            src={src}
            className="w-full h-auto object-contain"
            style={{ display: "block" }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              cursor: "crosshair",
              opacity: 0.25,
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </>
  );
};
