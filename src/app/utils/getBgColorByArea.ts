export function getBgColorByArea(area: string): string {
  const areaColorMap: Record<string, string> = {
    "Ciências Humanas e suas tecnologias": "bg-ch-exam",
    "Matemática e suas tecnologias": "bg-mt-exam",
    "Ciências da Natureza e suas tecnologias": "bg-cn-exam",
    "Linguagens, Códigos e suas tecnologias": "bg-lc-exam",
  };
  
  return areaColorMap[area] || "bg-gray-200";
}