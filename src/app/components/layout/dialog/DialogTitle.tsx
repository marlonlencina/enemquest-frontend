import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export const DialogTitle = ({ children, className = "" }: DialogTitleProps) => {
  return (
    <Dialog.Title className={`font-head text-head24 text-black-custom font-semibold ${className}`}>
      {children}
    </Dialog.Title>
  );
};