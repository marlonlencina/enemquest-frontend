import { ReactNode } from "react";

export interface DataTableProps {
  children: ReactNode;
  className?: string;
}

export const DataTable = ({ children, className = "" }: DataTableProps) => {
  return (
    <table className={`w-full table-auto overflow-x-auto whitespace-nowrap border-collapse border-spacing-[32px] ${className}`}>
      {children}
    </table>
  );
};