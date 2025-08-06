import { ReactNode } from "react";

export interface DialogButtonsWrapperProps {
  children: ReactNode;
  className?: string;
}

export const DialogButtonsWrapper = ({ 
  children, 
  className = "" 
}: DialogButtonsWrapperProps) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {children}
    </div>
  );
};