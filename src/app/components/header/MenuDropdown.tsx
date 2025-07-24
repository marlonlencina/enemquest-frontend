"use client";

import { useAuth } from "@/context/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import IconButton from "../layout/IconButton";
import { MenuDropdownOption } from "./MenuDropdownOption";

interface MenuDropdownInterface {
  handleMenuDropdownToggle: () => void;
}

export const MenuDropdown = ({
  handleMenuDropdownToggle,
}: MenuDropdownInterface) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleNavigate = (url: string) => {
    router.push(url);
    handleMenuDropdownToggle();
  };

  const handleLogout = () => {
    logout();
    handleMenuDropdownToggle();
  };
  return (
    <div className="absolute bg-white-custom w-[348px] top-[48px] right-0 border border-gray-300-custom rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-6 bg-white-custom justify-between">
        <div className="shrink-0 flex items-center gap-4 h-[42px] w-[42px] rounded-full">
          <Image
            width={48}
            height={48}
            className="shrink-0 rounded-full"
            src={"https://github.com/marlonlencina.png"}
            alt="Avatar"
          />
          <div>
            <p className="text-nowrap font-head font-semibold text-black-custom text-body16 leading-tight">
              Marlon Lencina
            </p>
            <span className="font-body font-normal text-blue-primary text-body14 leading-tight">
              @marlon
            </span>
          </div>
        </div>
        <IconButton
          iconName={"lucide:x"}
          onClick={handleMenuDropdownToggle}
          iconClass="text-body18 text-gray-500-custom"
        />
      </div>
      <ul className="w-full bg-WHITE flex flex-col border-t border-gray-200-custom">
        <MenuDropdownOption
          icon="lucide:user"
          label="Minha conta"
          onClick={() => handleNavigate("/dashboard/account")}
        />
        <MenuDropdownOption
          icon="lucide:log-out"
          label="Logout"
          onClick={() => handleLogout()}
        />
      </ul>
    </div>
  );
};
