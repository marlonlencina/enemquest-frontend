import Link from "next/link";

interface AreaCardProps {
  href: string;
  bgColor: string;
  title: string;
  subtitle: string;
}

export default function AreaCard({ href, bgColor, title, subtitle }: AreaCardProps) {
  return (
    <Link href={href} className={`h-[256px] w-full rounded-[4px] ${bgColor} p-6 flex items-end justify-start hover:opacity-95 hover:scale-105 transition-all`}>
      <div>
        <h1 className="font-head text-head24 text-white-custom max-w-[200px]">
          {title}
        </h1>
        <p className="mt-2 font-normal font-body text-body16 text-white-custom opacity-75">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}