"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { forwardRef } from "react";

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

const GoogleButton = forwardRef<HTMLButtonElement, GoogleButtonProps>(
  (
    {
      text,
      fullWidth = false,
      loading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        {...props}
        ref={ref}
        disabled={isDisabled}
        className={`
          bg-white-custom-10 cursor-pointer border border-gray-200-custom h-[56px] flex items-center justify-center gap-4 hover:border-blue-primary-dark transition-all rounded-md font-button text-button16 text-black-custom font-semibold
          ${fullWidth ? "w-full" : ""}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className || ""}
        `}
      >
        {loading ? (
          "Carregando..."
        ) : (
          <>
            {text}
            <Icon icon="logos:google-icon" height={24} />
          </>
        )}
      </button>
    );
  }
);

GoogleButton.displayName = "GoogleButton";

export { GoogleButton };