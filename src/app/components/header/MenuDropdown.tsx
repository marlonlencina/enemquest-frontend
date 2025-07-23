"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import IconButton from "../layout/IconButton";

interface MenuDropdownInterface {
  handleMenuDropdownToggle: () => void;
}

export const MenuDropdown = ({
  handleMenuDropdownToggle,
}: MenuDropdownInterface) => {
  const router = useRouter();

  const handleNavigate = (url: string) => {
    router.push(url);
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
        <div onClick={() => handleNavigate("/dashboard/account")}>
          <li className="w-full h-[56px] flex gap-4 items-center px-6 cursor-pointer group hover:bg-gray-200-custom transition-all">
            <div className="flex items-center gap-4">
              <Icon
                icon={"lucide:user"}
                className="text-body18 text-gray-500-custom group-hover:text-blue-primary transition-all"
              />
              <p className="font-button font-medium text-body16 text-black-custom group-hover:text-blue-primary transition-all">
                Minha conta
              </p>
            </div>
          </li>
        </div>
        <div onClick={handleMenuDropdownToggle}>
          <li className="w-full h-[56px] flex gap-4 items-center px-6 cursor-pointer group hover:bg-gray-200-custom transition-all">
            <div className="flex items-center gap-4">
              <Icon
                icon={"lucide:log-out"}
                className="text-body18 text-gray-500-custom group-hover:text-blue-primary transition-all"
              />
              <p className="font-button font-medium text-body16 text-black-custom group-hover:text-blue-primary transition-all">
                Logout
              </p>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
};
