import { ReactNode } from "react";

export interface TableHeaderCellProps {
  children: ReactNode;
  className?: string;
}

export const TableHeaderCell = ({ children, className = "" }: TableHeaderCellProps) => {
  return (
    <th className={`w-full px-6 text-left font-body text-sm12 text-gray-500-custom font-medium ${className}`}>
      {children}
    </th>
  );
};