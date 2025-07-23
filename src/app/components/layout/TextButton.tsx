"use client";

interface TextButtonProps {
  onClick: () => void;
  text: string;
  color?: string;
}

export default function TextButton({ onClick, text, color = "text-pink-primary" }: TextButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`rounded-md px-2 h-[40px] hover:bg-gray-100-custom cursor-pointer font-button text-button16 ${color} font-semibold bg-transparent transition-all`}
    >
      {text}
    </button>
  );
}