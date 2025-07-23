import { ReactNode } from "react";

export interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export const TableRow = ({ children, className = "" }: TableRowProps) => {
  return (
    <tr className={`h-[64px] ${className}`}>
      {children}
    </tr>
  );
};