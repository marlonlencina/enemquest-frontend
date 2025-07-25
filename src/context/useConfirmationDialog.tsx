"use client";
import { ConfirmationActionDialog } from "@/app/components/layout/dialog/confirmationActionDialog";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ConfirmationOptions {
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
}

interface ConfirmationContextType {
  confirm: (options: ConfirmationOptions) => Promise<boolean>;
  isOpen: boolean;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined
);

interface ConfirmationProviderProps {
  children: ReactNode;
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationOptions, setConfirmationOptions] = useState<ConfirmationOptions>({
    title: "",
    description: "",
    cancelText: "Cancelar",
    confirmText: "Confirmar",
  });
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const confirm = (options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmationOptions({
        cancelText: "Cancelar",
        confirmText: "Confirmar",
        ...options,
      });
      setResolvePromise(() => resolve);
      setIsOpen(true);
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  const value: ConfirmationContextType = {
    confirm,
    isOpen,
  };

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
      <ConfirmationActionDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={confirmationOptions.title}
        description={confirmationOptions.description}
        cancelText={confirmationOptions.cancelText || "Cancelar"}
        confirmText={confirmationOptions.confirmText || "Confirmar"}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = (): ConfirmationContextType => {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error("useConfirmation deve ser usado dentro de um ConfirmationProvider");
  }
  return context;
};