import { Button } from "@/app/components/form/Button";
import {
  DialogBody,
  DialogButtonsWrapper,
  DialogTitle,
} from "./index";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ConfirmationActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationActionDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: ConfirmationActionDialogProps) {
  return (
    <DialogBody open={open} onOpenChange={onOpenChange}>
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </div>
        <div className="mt-6">
          <DialogButtonsWrapper>
            <Button
              fullWidth
              text={cancelText}
              variant="secondary"
              onClick={onCancel}
            />
            <Button
              fullWidth
              text={confirmText}
              variant="primary"
              onClick={onConfirm}
            />
          </DialogButtonsWrapper>
        </div>
      </div>
    </DialogBody>
  );
}