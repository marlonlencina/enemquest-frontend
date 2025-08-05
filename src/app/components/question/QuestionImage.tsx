"use client";

import Image from "next/image";

interface QuestionImageProps {
  src: string;
  alt: string;
  questionId?: string;
  exam?: string;
  width?: number;
  height?: number;
  enableZoom?: boolean;
}

export const QuestionImage = ({
  src,
  alt,
  questionId,
  exam,
  width = 800,
  height = 600,
  enableZoom = true,
}: QuestionImageProps) => {
  return (
    <div className="bg-white rounded-lg h-full w-full max-h-[800px] overflow-auto relative">
      <div className="p-16">
        <Image
          width={width}
          height={height}
          alt={alt}
          src={src}
          className="w-full h-auto object-contain "
        />
      </div>
    </div>
  );
};
