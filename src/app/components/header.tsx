'use client';

import Image from "next/image";
import Link from "next/link";
import IconButton from "./IconButton";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

export const Header = ({
  variant = "default",
}: {
  variant?: "colored" | "default";
}) => {
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
              <NavLink href="/dashboard">
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/listas">
                Listas
              </NavLink>
            </div>
            <div className="flex items-center gap-6 h-full">
              <IconButton isFullRounded iconName={"lucide:bell"} onClick={() => {}} />
              <div className="cursor-pointer transition-all">
                <Image
                  width={36}
                  height={36}
                  alt="avatar"
                  src={"https://github.com/marlonlencina.png"}
                  className="rounded-full bg-white"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
