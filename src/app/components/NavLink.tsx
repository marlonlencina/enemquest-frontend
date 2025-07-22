'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: string;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`min-w-[112px] cursor-pointer w-full flex items-center justify-center px-4 h-full border-b ${isActive ? `border-blue-primary` : `border-transparent`}`}
    >
      <p 
        className={`font-head text-body18 ${
          isActive 
            ? "font-semibold text-black-custom" 
            : "font-medium text-gray-500-custom"
        }`}
      >
        {children}
      </p>
    </Link>
  );
};