import { ReactNode } from "react";

export interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export const PageTitle = ({ children, className = "" }: PageTitleProps) => {
  return (
    <h1 className={`font-head text-head24 font-normal text-black-custom ${className}`}>
      {children}
    </h1>
  );
};