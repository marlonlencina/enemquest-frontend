import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost-light";
  size?: "md" | "lg";
  arrow?: boolean;
  external?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-pink-primary text-white-custom shadow-[0_8px_24px_-8px_rgba(246,118,156,0.8)] hover:bg-pink-primary-dark hover:shadow-[0_12px_28px_-8px_rgba(246,118,156,0.9)]",
  secondary:
    "bg-white-custom text-black-custom border border-gray-300-custom hover:border-gray-400-custom hover:bg-gray-100-custom",
  light: "bg-white-custom text-blue-primary-dark hover:bg-gray-100-custom",
  "ghost-light":
    "bg-white-custom-10 text-white-custom border border-white-custom-25 hover:bg-white-custom-25",
};

const sizes = {
  md: "h-11 px-5 text-body14",
  lg: "h-14 px-7 text-button16",
};

export const CtaLink = ({
  href,
  children,
  variant = "primary",
  size = "lg",
  arrow = false,
  external = false,
  className = "",
}: CtaLinkProps) => {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-lg font-button font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-primary/30 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
};
