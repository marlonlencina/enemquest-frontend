import { Icon } from "@iconify/react/dist/iconify.js";

export interface ButtonStatCardProps {
  text?: string;
  icon?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  iconBackgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  onClick?: () => void;
  className?: string;
}

export const ButtonStatCard = ({
  text,
  icon,
  backgroundColor = "bg-pink-primary",
  hoverBackgroundColor = "hover:bg-pink-primary-dark",
  iconBackgroundColor = "bg-pink-primary-light",
  textColor = "text-white-custom",
  iconColor = "text-white-custom",
  onClick,
  className = "",
}: ButtonStatCardProps) => {
  return (
    <div
      className={`cursor-pointer transition-all ${hoverBackgroundColor} h-[164px] flex flex-col gap-4 justify-center items-center w-full ${backgroundColor} rounded-lg p-6 ${className}`}
      onClick={onClick}
    >
      {icon && (
        <div className={`${iconBackgroundColor} h-12 w-12 rounded-full grid place-content-center`}>
          <Icon
            className={`${iconColor} text-head24`}
            icon={icon}
          />
        </div>
      )}
      {text && (
        <p className={`text-button16 ${textColor} font-button font-semibold text-center`}>
          {text}
        </p>
      )}
    </div>
  );
};