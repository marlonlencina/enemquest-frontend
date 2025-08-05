import { useState } from "react";
import { MultiSelect, MultiSelectOption } from "../form/MultiSelect";

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
}: ButtonAreaToggleProps) => {
  const [selectedCompetencias, setSelectedCompetencias] = useState<string[]>([]);
  const [selectedHabilidades, setSelectedHabilidades] = useState<string[]>([]);
  
  const competenciasOptions: MultiSelectOption[] = [
    { value: "competencia1", label: "C1" },
    { value: "competencia2", label: "C2" },
    { value: "competencia3", label: "C3" },
    { value: "competencia4", label: "C4" },
    { value: "competencia5", label: "C5" },
    { value: "competencia6", label: "C6" },
  ];

  const habilidadesOptions: MultiSelectOption[] = [
    { value: "habilidade1", label: "H1" },
    { value: "habilidade2", label: "H2" },
    { value: "habilidade3", label: "H3" },
    { value: "habilidade4", label: "H4" },
    { value: "habilidade5", label: "H5" },
    { value: "habilidade6", label: "H6" },
  ];
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
            optionsSelected={selectedCompetencias}
            optionChange={setSelectedCompetencias}
            placeholder="Selecione competências"
          />
        </div>
      )}

      {allowHability && (
        <div className="border-t-[2px] border-gray-200-custom h-[56px] flex items-center">
          <MultiSelect 
            options={habilidadesOptions}
            optionsSelected={selectedHabilidades}
            optionChange={setSelectedHabilidades}
            placeholder="Selecione habilidades"
          />
        </div>
      )}
    </div>
  );
};
