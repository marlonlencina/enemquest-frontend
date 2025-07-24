import { Icon } from "@iconify/react/dist/iconify.js";

interface MenuDropdownOptionProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export const MenuDropdownOption = ({
  icon,
  label,
  onClick,
}: MenuDropdownOptionProps) => {
  return (
    <div onClick={onClick}>
      <li className="w-full h-[56px] flex gap-4 items-center px-6 cursor-pointer group hover:bg-gray-200-custom transition-all">
        <div className="flex items-center gap-4">
          <Icon
            icon={icon}
            className="text-body18 text-gray-500-custom group-hover:text-blue-primary transition-all"
          />
          <p className="font-button font-medium text-body16 text-black-custom group-hover:text-blue-primary transition-all">
            {label}
          </p>
        </div>
      </li>
    </div>
  );
};