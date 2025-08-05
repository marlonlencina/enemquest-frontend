import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const DialogDescription = ({ children, className = "" }: DialogDescriptionProps) => {
  return (
    <Dialog.Description className={`font-body text-body16 text-gray-500-custom font-normal ${className}`}>
      {children}
    </Dialog.Description>
  );
};