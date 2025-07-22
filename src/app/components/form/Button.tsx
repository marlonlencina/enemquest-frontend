"use client";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      variant = "primary",
      fullWidth = false,
      loading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "px-4 cursor-pointer h-[56px] flex items-center justify-center gap-4 rounded-md font-button text-button16 font-semibold";

    const variantClasses = {
      primary: "bg-pink-primary border border-pink-primary text-white-custom",
      secondary:
        "bg-transparent border border-gray-200-custom text-gray-500-custom",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        {...props}
        ref={ref}
        disabled={isDisabled}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${fullWidth ? "w-full" : ""}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className || ""}
        `}
      >
        {loading ? "Carregando..." : text}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
