"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const baseClasses =
    "cursor-pointer rounded-[4px] font-body font-semibold transition-all focus:outline-none focus:ring-2";

  const variantClasses = {
    primary:
      "bg-blue-primary text-white-custom hover:bg-blue-primary/90 focus:ring-blue-primary/50",
    secondary:
      "bg-gray-200-custom text-black-custom hover:bg-gray-300-custom focus:ring-gray-300-custom/50",
    light:
      "bg-white-custom text-black-custom hover:bg-gray-100-custom focus:ring-gray-200-custom/50",
    link: "text-blue-primary bg-transparent hover:underline focus:ring-blue-primary/50",
  };

  const sizeClasses = {
    sm: "px-4 h-[56px]  text-sm",
    md: "px-4 h-[56px]  text-body16",
    lg: "px-4 h-[56px] text-body18",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={onClick}
      disabled={isDisabled}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}
