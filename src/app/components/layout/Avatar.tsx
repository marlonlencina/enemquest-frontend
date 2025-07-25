import { Icon } from "@iconify/react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function Avatar({
  src,
  alt = "avatar",
  size = 36,
  className = "",
  onClick,
}: AvatarProps) {
  const baseClasses = "rounded-full";
  const combinedClasses = `${baseClasses} ${className}`;

  if (src) {
    return (
      <Image
        width={size}
        height={size}
        alt={alt}
        src={src}
        className={`${combinedClasses} bg-white`}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      className={`shrink-0 rounded-full bg-gray-200-custom flex items-center justify-center cursor-pointer`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Icon
        icon="lucide:user"
        className="text-gray-500-custom"
        width={size * 0.6}
        height={size * 0.6}
      />
    </div>
  );
}
