"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export const Switch = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  name,
  id,
  className = "",
}: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={`w-[44px] h-[24px] bg-gray-200-custom rounded-full relative data-[state=checked]:bg-blue-primary outline-none cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      name={name}
      id={id}
    >
      <SwitchPrimitive.Thumb className="block w-[20px] h-[20px] bg-white-custom rounded-full shadow-sm transition-transform duration-200 translate-x-[2px] will-change-transform data-[state=checked]:translate-x-[22px]" />
    </SwitchPrimitive.Root>
  );
};