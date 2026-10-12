import { Monitor } from "lucide-react";

export const StudyDeviceNotice = ({ className = "", dark = false }: { className?: string; dark?: boolean }) => (
  <p className={`flex items-start gap-2 text-body14 leading-relaxed ${dark ? "text-white/90" : "text-gray-500-custom"} ${className}`}>
    <Monitor aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
    <span>Para estudar, use um notebook ou tablet. O painel ainda não está disponível no celular.</span>
  </p>
);
