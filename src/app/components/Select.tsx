"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function Select({
  options,
  value,
  placeholder = "Selecione uma opção...",
  onChange,
  disabled = false,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full gap-2 px-4 py-2 bg-white-custom border border-gray-200-custom rounded-[4px]
          flex items-center justify-between
          font-body text-body16 text-black-custom
          hover:border-gray-300-custom
          focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-blue-primary
          transition-all h-[56px]
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isOpen ? "border-blue-primary ring-2 ring-blue-primary" : ""}
        `}
      >
        <span
          className={
            selectedOption ? "text-black-custom" : "text-gray-500-custom"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-500-custom transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white-custom border border-gray-200-custom rounded-[4px] shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={`
                w-full px-4 py-2 text-left
                font-body text-body16
                hover:bg-gray-100-custom
                transition-all
                ${
                  option.value === value
                    ? "bg-blue-primary text-white-custom"
                    : "text-black-custom"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
