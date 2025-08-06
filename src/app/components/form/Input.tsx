"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { forwardRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  prefix?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      showPasswordToggle,
      type,
      className,
      prefix,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      showPasswordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    const baseInputClasses = `font-body font-normal text-body16 placeholder:text-gray-400-custom text-black-custom outline-0`;
    const baseContainerClasses = `w-full h-[56px] border border-gray-200-custom rounded-md ${
      props.disabled ? "bg-gray-100-custom" : "bg-white-custom"
    } transition-all focus-within:border-blue-primary focus-within:ring-1 focus-within:ring-blue-primary`;

    return (
      <div>
        {label && (
          <label
            className="font-body text-sm12 text-gray-500-custom font-normal"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        {prefix ? (
          <div
            className={`flex items-center gap-4 px-4 ${baseContainerClasses} ${
              label ? "mt-1" : ""
            } ${containerClassName || ""}`}
          >
            <span className="font-body text-body16 font-semibold text-blue-primary">
              {prefix}
            </span>
            <input
              {...props}
              ref={ref}
              type={inputType}
              className={`h-full w-full ${baseInputClasses} ${className || ""}`}
            />
          </div>
        ) : showPasswordToggle && type === "password" ? (
          <div
            className={`flex items-center gap-3 px-4 ${baseContainerClasses} ${
              label ? "mt-1" : ""
            }`}
          >
            <input
              {...props}
              ref={ref}
              type={inputType}
              className={`w-full h-full ${baseInputClasses} ${className || ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="h-full pl-4 cursor-pointer"
            >
              <Icon
                icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                className="text-body18 text-blue-primary"
              />
            </button>
          </div>
        ) : (
          <input
            {...props}
            ref={ref}
            type={inputType}
            className={`${baseInputClasses} px-4 ${baseContainerClasses} ${
              label ? "mt-1" : ""
            } ${className || ""}`}
          />
        )}
        {error && (
          <span className="text-failed text-sm12 font-body mt-1 block">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
