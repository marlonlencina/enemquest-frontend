import { getBgColorByArea } from "../../utils/getBgColorByArea";

export type SubjectCode = "MT" | "LC" | "CH" | "CN";

const areaCodeToNameMap = {
  "MT": "Matemática e suas Tecnologias",
  "LC": "Linguagens, Códigos e suas Tecnologias", 
  "CH": "Ciências Humanas e suas Tecnologias",
  "CN": "Ciências da Natureza e suas Tecnologias"
};

interface SubjectBadgeProps {
  codigo: SubjectCode;
  variant?: "default" | "extended";
}

export default function SubjectBadge({ codigo, variant = "default" }: SubjectBadgeProps) {
  const bgColor = getBgColorByArea(codigo);
  const displayText = variant === "extended" ? areaCodeToNameMap[codigo] : codigo;
  
  return (
    <span className={`${bgColor} px-2 py-1 text-sm12 font-button font-bold rounded-full text-white-custom`}>
      {displayText}
    </span>
  );
}