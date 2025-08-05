"use client";

import * as OneTimePasswordField from "@radix-ui/react-one-time-password-field";

interface TokenInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function TokenInput({
  length = 6,
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  label,
}: TokenInputProps) {
  // Base classes following the pattern of other inputs
  const baseInputClasses =
    "font-body font-normal text-body16 text-black-custom outline-0";
  const baseContainerClasses = `h-[56px] border border-gray-200-custom rounded-md ${
    disabled ? "bg-gray-100-custom" : "bg-white-custom"
  } transition-all focus-within:border-blue-primary focus-within:ring-1 focus-within:ring-blue-primary`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="font-body text-sm12 text-gray-500-custom font-normal" htmlFor="token-input">
          {label}
        </label>
      )}
      <OneTimePasswordField.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className="flex gap-2 w-full mt-2"
      >
        {Array.from({ length }, (_, index) => (
          <OneTimePasswordField.Input
            key={index}
            index={index}
            className={`
              flex-1 w-0 text-center text-xl font-bold
              ${baseInputClasses} ${baseContainerClasses}
              ${error ? "border-failed" : ""}
            `}
            aria-label={`Digit ${index + 1} of code`}
          />
        ))}
      </OneTimePasswordField.Root>

      {error && (
        <span className="text-failed text-sm12 font-body mt-1 block">
          {error}
        </span>
      )}

      <p className="text-gray-500-custom text-sm12 font-body mt-2 ">
        Insira o código de 6 dígitos enviado para o seu e-mail cadastrado.
      </p>
    </div>
  );
}
