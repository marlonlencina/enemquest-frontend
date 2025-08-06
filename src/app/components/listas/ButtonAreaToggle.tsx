import { MultiSelect, MultiSelectOption } from "../form/MultiSelect";
import { Competencia, Habilidade } from "@/types/exam";
import { useEffect } from "react";

export interface ButtonAreaToggleProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  isNumberAllowed?: boolean; // Optional prop to allow number input
  allowCompetence?: boolean; // Optional prop to show competence multi-select
  allowHability?: boolean; // Optional prop to show hability multi-select
  onQuantityChange?: (quantity: number) => void; // Callback for quantity changes
  currentQuantity?: number; // Current quantity value
  onCompetenciasChange?: (competencias: string[]) => void; // Callback for competencias changes
  onHabilidadesChange?: (habilidades: string[]) => void; // Callback for habilidades changes
  currentCompetencias?: string[]; // Current competencias selected
  currentHabilidades?: string[]; // Current habilidades selected
  areaCompetencias?: Competencia[]; // Competencias available for this area
  areaHabilidades?: Habilidade[]; // Habilidades available for this area
}

export const AreaSectionOptions = ({
  text,
  isSelected = false,
  onClick,
  className = "",
  isNumberAllowed = true,
  allowCompetence = true,
  allowHability = true,
  onQuantityChange,
  currentQuantity = 0,
  onCompetenciasChange,
  onHabilidadesChange,
  currentCompetencias = [],
  currentHabilidades = [],
  areaCompetencias = [],
  areaHabilidades = [],
}: ButtonAreaToggleProps) => {
  const handleCompetenciasChange = (competencias: string[]) => {
    onCompetenciasChange?.(competencias);
    // Clear habilidades when competencias change
    if (currentHabilidades.length > 0) {
      onHabilidadesChange?.([]);
    }
  };

  const handleHabilidadesChange = (habilidades: string[]) => {
    onHabilidadesChange?.(habilidades);
  };
  
  const competenciasOptions: MultiSelectOption[] = areaCompetencias.map(comp => ({
    value: comp.codigo,
    label: comp.codigo
  }));

  // Filter habilidades based on selected competencias
  const filteredHabilidades = areaHabilidades.filter(hab => {
    // If no competencias selected, show none
    if (!currentCompetencias.length) return false;
    
    // Find the competencia that contains this habilidade
    return areaCompetencias.some(comp => 
      currentCompetencias.includes(comp.codigo) && 
      comp.habilidades?.some(h => h.codigo === hab.codigo)
    );
  });

  const habilidadesOptions: MultiSelectOption[] = filteredHabilidades.map(hab => ({
    value: hab.codigo,
    label: hab.codigo
  }));

  // Check if competencias are selected to enable habilidades dropdown
  const isHabilidadesDisabled = currentCompetencias.length === 0;
  const borderClass = isSelected
    ? "border-gray-300-custom"
    : "border-gray-100-custom hover:border-gray-200-custom";

  const textClass = isSelected
    ? "text-black-custom"
    : "text-gray-500-custom ";

  return (
    <div
      className={`cursor-pointer  border-2 rounded-lg ${borderClass} transition-all ${className}`}
      onClick={onClick}
    >
      <div className="w-full p-6">
        <p
          className={`font-button font-medium text-button16 ${textClass} transition-all`}
        >
          {text}
        </p>
      </div>

      {isNumberAllowed && (
        <div className="border-t-[2px] border-gray-200-custom px-6 h-[56px]">
          <input
            type="number"
            placeholder="Insira o número de questões"
            value={currentQuantity || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onQuantityChange?.(value);
            }}
            className="w-full h-full border-none outline-none font-body text-body16 text-black-custom placeholder:text-gray-400-custom"
          />
        </div>
      )}

      {allowCompetence && (
        <div className="border-t-[2px] border-gray-200-custom h-[56px] flex items-center">
          <MultiSelect 
            options={competenciasOptions}
            optionsSelected={currentCompetencias}
            optionChange={handleCompetenciasChange}
            placeholder="Selecione competências"
          />
        </div>
      )}

      {allowHability && (
        <div className="border-t-[2px] border-gray-200-custom h-[56px] flex items-center">
          <MultiSelect 
            options={habilidadesOptions}
            optionsSelected={currentHabilidades}
            optionChange={handleHabilidadesChange}
            placeholder="Selecione habilidades"
            disabled={isHabilidadesDisabled}
          />
        </div>
      )}
    </div>
  );
};
