"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  optionsSelected: string[];
  optionChange: (values: string[]) => void;
  placeholder?: string;
}

export const MultiSelect = ({ options, optionsSelected, optionChange, placeholder = "Selecione" }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (newValue: string) => {
    let updatedValues: string[];

    if (optionsSelected.includes(newValue)) {
      updatedValues = optionsSelected.filter((v) => v !== newValue);
    } else {
      updatedValues = [...optionsSelected, newValue];
    }

    optionChange(updatedValues);
  };

  const getDisplayText = () => {
    if (optionsSelected.length === 0) return placeholder;
    
    const selectedLabels = optionsSelected.map(value => {
      const option = options.find(o => o.value === value);
      return option?.label || value;
    });
    
    return selectedLabels.join(", ");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between h-full w-full px-6 font-body text-body16 text-black-custom focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <span className="text-black-custom font-body text-body16">
          {getDisplayText()}
        </span>
        <Icon icon="lucide:chevron-down" />
      </button>

      {isOpen && (
        <div className="absolute w-full top-[56px] left-0 right-0 border border-gray-300-custom border-t-0 rounded-lg z-[9999] bg-white max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleValueChange(option.value)}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100-custom ${optionsSelected.includes(option.value) ? "bg-gray-100-custom" : "bg-white-custom"} transition-all`}
            >
              <span className="font-body text-body16 text-black-custom font-normal">
                {option.label}
              </span>
              {optionsSelected.includes(option.value) && (
                <Icon icon="lucide:check" className="mr-2 h-3 w-3" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
