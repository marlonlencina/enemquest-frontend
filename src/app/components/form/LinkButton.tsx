"use client";
import Link from "next/link";
import { forwardRef } from "react";

interface LinkButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: () => void;
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      text,
      href,
      variant = "primary",
      fullWidth = false,
      loading = false,
      className,
      target,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "px-4 cursor-pointer h-[56px] flex items-center justify-center gap-4 rounded-md font-button text-button16 font-semibold no-underline transition-colors";

    const variantClasses = {
      primary:
        "bg-pink-primary border border-pink-primary text-white-custom hover:bg-pink-primary-dark hover:border-pink-primary-dark",
      secondary:
        "bg-transparent border border-gray-200-custom text-gray-500-custom hover:bg-gray-200-custom",
    };

    const isDisabled = loading;

    if (isDisabled) {
      return (
        <span
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${fullWidth ? "w-full" : ""}
            opacity-50 cursor-not-allowed
            ${className || ""}
          `}
        >
          {loading ? "Carregando..." : text}
        </span>
      );
    }

    return (
      <Link
        {...props}
        href={href}
        ref={ref}
        target={target}
        onClick={onClick}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${fullWidth ? "w-full" : ""}
          ${className || ""}
        `}
      >
        {text}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

export { LinkButton };