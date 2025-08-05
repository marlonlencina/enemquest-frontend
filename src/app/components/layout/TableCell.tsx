import { ReactNode } from "react";

export interface TableCellProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export const TableCell = ({ 
  children, 
  variant = "secondary",
  className = "" 
}: TableCellProps) => {
  const fontWeight = variant === "primary" ? "font-semibold" : "font-normal";
  
  return (
    <td className={`px-6 font-body ${fontWeight} text-body16 text-black-custom ${className}`}>
      {children}
    </td>
  );
};