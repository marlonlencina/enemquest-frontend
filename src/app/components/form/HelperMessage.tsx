"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ErrorMessageProps {
  message: string | null;
  className?: string;
  showIcon?: boolean;
  variant?: "error" | "warning" | "info";
}

export function HelperMessage({
  message,
  className = "",
  showIcon = false,
  variant = "error",
}: ErrorMessageProps) {
  const variantClasses = {
    error: "bg-failed-10 text-failed",
    warning: "bg-warning-10 text-warning",
    info: "bg-success-10 text-success",
  };

  const iconMap = {
    error: "mdi:alert-circle",
    warning: "mdi:alert",
    info: "mdi:information",
  };

  if (!message) {
    return null;
  }
  return (
    <div
      className={`w-full p-6 rounded-lg flex items-center justify-start gap-4 ${variantClasses[variant]} ${className}`}
    >
      {showIcon && (
        <Icon icon={iconMap[variant]} className="text-body18 flex-shrink-0" />
      )}
      <p className="font-body font-normal text-body14 text-start max-w-full">{message}</p>
    </div>
  );
}
