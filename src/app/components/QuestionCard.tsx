import Image from "next/image";
import Link from "next/link";

interface QuestionCardProps {
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  bgColor?: string;
  link?: string;
}

export default function QuestionCard({
  title,
  subtitle,
  category,
  imageUrl,
  bgColor = "bg-ch-exam",
  link = '/'
}: QuestionCardProps) {
  return (
    <Link href={link} className="group w-full border-gray-200-custom border rounded-[4px] cursor-pointer hover:border-gray-300-custom transition-all">
      <div className="pt-6 px-6">
        <h4 className="font-head text-body18 font-semibold text-black-custom">
          {title}
        </h4>
        <h5 className="font-head text-body16 font-semibold text-black-custom mt-4">
          {subtitle}
        </h5>
        <div className="flex items-center gap-2 mt-2">
          <div className={`rounded-full h-[8px] w-[8px] ${bgColor}`}></div>
          <p className="leading-tight font-medium font-body text-body16 text-gray-500-custom">
            {category}
          </p>
        </div>
      </div>
      <div className="bg-white relative w-full h-[164px] mt-6 border-t border-gray-200-custom overflow-hidden">
        <div className="relative w-full h-[200%] transition-transform duration-[2000ms] ease-in-out group-hover:translate-y-[-50%]">
          <Image
            fill
            alt="Imagem da questão"
            src={imageUrl}
            className="object-cover object-top pt-4 px-4"
          />
        </div>
        <div className={`absolute top-0 bottom-0 right-0 left-0 bg-gray-100 opacity-20 pointer-events-none`}></div>
      </div>
    </Link>
  );
}