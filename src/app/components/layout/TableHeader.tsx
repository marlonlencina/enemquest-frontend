import { ReactNode } from "react";

export interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export const TableHeader = ({ children, className = "" }: TableHeaderProps) => {
  return (
    <thead className={`w-full h-[64px] ${className}`}>
      <tr className="w-full">
        {children}
      </tr>
    </thead>
  );
};