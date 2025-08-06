"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
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
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-40 bg-black-custom opacity-45 "
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
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
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export {
  DialogButtonsWrapper,
  type DialogButtonsWrapperProps,
} from "./DialogButtonsWrapper";
export {
  DialogDescription,
  type DialogDescriptionProps,
} from "./DialogDescription";
export { DialogTitle, type DialogTitleProps } from "./DialogTitle";
