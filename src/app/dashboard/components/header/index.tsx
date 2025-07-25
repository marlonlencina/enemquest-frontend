"use client";

import { useAuth } from "@/context/useAuth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "../Avatar";
import { Logo } from "../layout/Logo";
import { MenuDropdown } from "./MenuDropdown";
import { NavLink } from "./NavLink";

export const Header = ({
  variant = "default",
}: {
  variant?: "colored" | "default";
}) => {
  const { user } = useAuth();
  const menuDropdownRef = useRef<HTMLDivElement | null>(null);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const handleMenuDropdownToggle = () => {
    setIsMenuDropdownOpen(!isMenuDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      isMenuDropdownOpen &&
      menuDropdownRef.current &&
      !menuDropdownRef.current.contains(target)
    ) {
      setIsMenuDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuDropdownOpen]);

  return (
    <header className={`h-[72px] w-full`}>
      <div className=" w-full fixed top-0 left-0 right-0 z-50">
        <div className="container h-[72px] flex items-center justify-between bg-gray-200-custom">
          <div className="flex items-center gap-6 bg-white-custom h-full px-6">
            <Link href={"/dashboard"}>
              <Logo logoTextColor="#090A0A" />
            </Link>
          </div>
          <div className="w-full h-full flex items-center justify-between pr-6 gap-4 bg-white-custom">
            <div className="flex items-center h-full">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/dashboard/listas">Listas</NavLink>
            </div>
            <div className="flex items-center gap-6 h-full">
              {/* <IconButton
                isFullRounded
                iconName={"lucide:bell"}
                onClick={() => {}}
              /> */}
              <div
                ref={menuDropdownRef}
                className="relative cursor-pointer transition-all"
              >
                <Avatar
                  src={user?.avatar}
                  alt="avatar"
                  className="rounded-full bg-white"
                  onClick={handleMenuDropdownToggle}
                />
                {isMenuDropdownOpen && (
                  <MenuDropdown
                    handleMenuDropdownToggle={handleMenuDropdownToggle}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
