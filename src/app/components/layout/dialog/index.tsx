"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export interface SimpleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  showCloseButton?: boolean;
  maxWidth?: string;
}

export const DialogBody = ({
  open,
  onOpenChange,
  children,
  showCloseButton = true,
  maxWidth = "max-w-lg",
}: SimpleDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black-custom opacity-25 z-50" />
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-50 w-full ${maxWidth} -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white-custom`}
        >
          {children}

          {showCloseButton && (
            <Dialog.Close className=" cursor-pointer absolute right-4 top-4 rounded-full p-1 text-gray-500-custom hover:text-black-custom transition-colors">
              <Icon
                icon="lucide:x"
                className="text-body16 text-gray-500-custom"
              />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { DialogTitle, type DialogTitleProps } from "./DialogTitle";
export { DialogDescription, type DialogDescriptionProps } from "./DialogDescription";
export { DialogButtonsWrapper, type DialogButtonsWrapperProps } from "./DialogButtonsWrapper";
