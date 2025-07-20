"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface BackButtonProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function BackButton({ 
  href, 
  children = "Voltar", 
  className = "" 
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleBack}
      className={`flex items-center gap-2 ${className}`}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      {children}
    </Button>
  );
}