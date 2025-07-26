"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [canvasSize, setCanvasSize] = useState({ width: width, height: height });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (imageRef.current) {
        const img = imageRef.current;
        setCanvasSize({
          width: img.clientWidth,
          height: img.clientHeight
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

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffff00aa";
    ctx.lineWidth = 15;
  }, [canvasSize]);

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

  return (
    <div className="bg-white-custom p-6 w-full h-[800px] rounded-lg overflow-y-auto relative">
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
  );
};
