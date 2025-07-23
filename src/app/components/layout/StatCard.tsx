import { Icon } from "@iconify/react";

interface StatCardProps {
  number: string;
  text: string;
  icon?: string;
  iconColor?: string;
}

export default function StatCard({ number, text, icon, iconColor = "text-gray-500-custom" }: StatCardProps) {
  return (
    <div className="h-[164px] flex flex-col justify-between w-full bg-white-custom rounded-lg p-6">
      <div className="flex items-center gap-2">
        {icon && <Icon className={iconColor} icon={icon} />}
        <span className="font-body text-body16 text-black-custom font-medium">
          {text}
        </span>
      </div>
      <p className="text-head32 text-black-custom font-head font-semibold">
        {number}
      </p>
    </div>
  );
}