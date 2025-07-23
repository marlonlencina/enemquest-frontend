"use client";

import { Icon, IconifyIcon } from "@iconify/react";

interface IconButtonProps {
  onClick: () => void;
  iconName: string | IconifyIcon;
  iconClass?: string;
  isFullRounded?: boolean;
}

export default function IconButton({ 
  onClick, 
  iconName, 
  iconClass = "text-gray-500-custom", 
  isFullRounded = false 
}: IconButtonProps) {
  const borderRadius = isFullRounded ? "rounded-full" : "rounded-lg";
  
  return (
    <button 
      onClick={onClick}
      className={`border border-gray-100-custom cursor-pointer h-[40px] w-[40px] ${borderRadius} grid place-content-center hover:bg-gray-100-custom bg-transparent transition-all`}
    >
      <Icon icon={iconName} className={iconClass} />
    </button>
  );
}