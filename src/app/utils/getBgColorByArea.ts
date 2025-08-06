export function getBgColorByArea(area: string): string {
  const areaColorMap: Record<string, string> = {
    "CH": "bg-ch-exam",
    "MT": "bg-mt-exam",
    "CN": "bg-cn-exam",
    "LC": "bg-lc-exam",
  };
  
  return areaColorMap[area] || "bg-gray-200";
}