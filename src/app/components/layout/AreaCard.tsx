import Link from "next/link";

interface AreaCardProps {
  href: string;
  bgColor: string;
  title: string;
  subtitle?: string;
}

export default function AreaCard({
  href,
  bgColor,
  title,
  subtitle,
}: AreaCardProps) {
  return (
    <Link
      href={href}
      className={`h-[164px] w-full rounded-lg bg-white-custom p-6 flex items-end justify-start hover:opacity-80 transition-all`}
    >
      <div>
        <h1 className="font-head font-medium text-body20 text-black-custom max-w-[200px]">
          {title}
        </h1>
        {subtitle && (
          <p className="font-head text-body16 text-gray-500-custom max-w-[200px] mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
