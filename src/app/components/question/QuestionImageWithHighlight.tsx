"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
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
  const [brushSize, setBrushSize] = useState(16);
  const [brushColor, setBrushColor] = useState("#0a66b9");
  const [activeMode, setActiveMode] = useState<"highlighter" | "eraser">(
    "highlighter"
  );

  useEffect(() => {
    const updateCanvasSize = () => {
      const container = document.querySelector(".canvas-container");
      const imageContainer = document.querySelector(".image-container");

      if (container && imageContainer) {
        const containerMaxHeight = 800 - 48; // altura fixa menos padding
        const imageHeight = imageContainer.scrollHeight;

        // Se a imagem é menor que o container, usar altura da imagem
        // Se é maior, usar altura máxima do container
        const adaptiveHeight =
          imageHeight < containerMaxHeight ? imageHeight : containerMaxHeight;

        setCanvasSize({
          width: container.clientWidth - 48,
          height: Math.max(adaptiveHeight, imageHeight),
        });

        // Ajustar altura do container dinamicamente
        const containerElement = container as HTMLElement;
        if (imageHeight < containerMaxHeight) {
          containerElement.style.height = `${imageHeight + 48}px`;
        } else {
          containerElement.style.height = "800px";
        }
      }
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        setTimeout(updateCanvasSize, 100); // delay para DOM atualizar
      } else {
        img.onload = () => setTimeout(updateCanvasSize, 100);
      }
    }

    window.addEventListener("resize", updateCanvasSize);

    // Limpar canvas quando a imagem muda
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Resetar scroll do container quando a imagem muda
    const container = document.querySelector(".canvas-container");
    if (container) {
      container.scrollTop = 0;
      container.scrollLeft = 0;
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
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
    ctx.lineWidth = brushSize;

    if (activeMode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = brushColor;
    }

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

    if (activeMode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = brushColor;
    }
  }, [brushSize, brushColor, activeMode]);

  const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getMousePosition(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getMousePosition(e);

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
      <div className="h-[64px] border border-gray-300-custom bg-gray-200-custom rounded-t-lg flex items-center justify-between gap-6 pr-6">
        <div className="flex items-center ">
          {/* <div className="h-[64px] w-[64px] grid place-content-center ">
            <div
              className="relative w-[48px] h-[48px] rounded-full border-2 border-gray-300 cursor-pointer  transition-transform"
              style={{
                backgroundColor: brushColor.slice(0, 7),
                opacity: activeMode === "eraser" ? 0.5 : 1,
                cursor: activeMode === "eraser" ? "not-allowed" : "pointer",
              }}
              onClick={() => document.getElementById("color-picker")?.click()}
            >
              <input
                id="color-picker"
                className="absolute top-full left-0 right-0 opacity-0 pointer-events-none"
                type="color"
                value={brushColor.slice(0, 7)}
                onChange={(e) => setBrushColor(e.target.value + "aa")}
                disabled={activeMode === "eraser"}
              />
            </div>
          </div> */}
          <div className="flex items-center">
            <div
              onClick={() => setBrushColor("#0a66b9")}
              className={`w-[64px] h-[64px] grid place-content-center transition-all cursor-pointer ${brushColor === "#0a66b9" ? "" : "opacity-45"}`}
            >
              <span className="h-[40px] w-[40px] rounded-full bg-blue-baby"></span>
            </div>
            <div
              onClick={() => setBrushColor("#f86992")}
              className={`w-[64px] h-[64px] grid place-content-center transition-all cursor-pointer ${brushColor === "#f86992" ? "" : "opacity-45"}`}
            >
              <span className="h-[40px] w-[40px] rounded-full bg-pink-primary-light"></span>
            </div>
            <div className="h-[64px] w-[64px] grid place-content-center">
              <button
                onClick={() => setActiveMode("highlighter")}
                className={`bg-white-custom transition-all w-[48px] h-[48px] rounded-full border-2 border-gray-300-custom grid place-content-center cursor-pointer ${
                  activeMode === "highlighter"
                    ? "opacity-100  border-gray-500-custom"
                    : "opacity-45"
                }`}
              >
                <Icon
                  icon="lucide:highlighter"
                  className={`w-6 h-6 ${
                    activeMode === "highlighter"
                      ? "text-black-custom"
                      : "text-gray-500-custom"
                  } tracking-all`}
                />
              </button>
            </div>
            <div className="h-[64px] w-[64px] grid place-content-center">
              <button
                onClick={() => setActiveMode("eraser")}
                className={`bg-white-custom  transition-all w-[48px] h-[48px] rounded-full border-2 border-gray-300-custom grid place-content-center cursor-pointer ${
                  activeMode === "eraser"
                    ? "opacity-100 border-gray-500-custom"
                    : "opacity-45"
                }`}
              >
                <Icon
                  icon="lucide:eraser"
                  className={`w-6 h-6 ${
                    activeMode === "eraser"
                      ? "text-black-custom"
                      : "text-gray-500-custom"
                  } transition-all`}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm12 text-gray-500-custom font-button">
            Tamanho:
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
        <div>
          <TextButton text="Limpar" onClick={clearCanvas} />
        </div>
      </div>
      <div className="bg-white-custom  p-6 w-full h-[800px] rounded-lg overflow-y-auto relative canvas-container">
        <div className="w-full relative min-h-full image-container">
          <img
            ref={imageRef}
            width={width}
            height={height}
            alt={alt}
            src={src}
            className="w-full h-auto object-contain pointer-events-none"
            style={{ display: "block" }}
          />
        </div>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            zIndex: 10,
            cursor: "crosshair",
            opacity: 0.35,
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </>
  );
};
