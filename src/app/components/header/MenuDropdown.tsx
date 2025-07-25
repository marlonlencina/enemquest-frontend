"use client";

import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import IconButton from "../layout/IconButton";
import { MenuDropdownOption } from "./MenuDropdownOption";
import { Avatar } from "../Avatar";

interface MenuDropdownInterface {
  handleMenuDropdownToggle: () => void;
}

export const MenuDropdown = ({
  handleMenuDropdownToggle,
}: MenuDropdownInterface) => {
  const router = useRouter();
  const { user } = useAuth();
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
          <Avatar
            src={user?.avatar}
            alt="avatar"
            className="rounded-full bg-white"
            onClick={handleMenuDropdownToggle}
            size={44}
          />
          <div>
            <p className="text-nowrap font-head font-semibold text-black-custom text-body16 leading-tight">
              {user?.nome} {user?.sobrenome}
            </p>
            <span className="font-body font-normal text-blue-primary text-body14 leading-tight">
              @{user?.usuario}
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
