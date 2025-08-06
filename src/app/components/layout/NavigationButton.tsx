"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

interface NavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "prev" | "next";
  label: string;
  disabled?: boolean;
}

export function NavigationButton({
  direction,
  label,
  disabled = false,
  onClick,
  className = "",
  ...props
}: NavigationButtonProps) {
  const isPrev = direction === "prev";
  const isNext = direction === "next";

  const baseClasses = "flex items-center justify-center gap-4 w-full h-[56px] font-button text-button16 hover:opacity-60 transition-all";
  
  const variantClasses = disabled 
    ? "cursor-not-allowed bg-gray-200-custom text-gray-400-custom"
    : isNext 
      ? "cursor-pointer bg-gray-300-custom text-black-custom"
      : "cursor-pointer bg-gray-300-custom text-black-custom";

  const iconColor = disabled ? "text-gray-400-custom" : "text-gray-500-custom";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isPrev && (
        <Icon
          icon="mdi:chevron-left"
          className={`text-body20 ${iconColor}`}
        />
      )}
      {label}
      {isNext && (
        <Icon
          icon="mdi:chevron-right"
          className={`text-body20 ${iconColor}`}
        />
      )}
    </button>
  );
}