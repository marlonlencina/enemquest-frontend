export interface AreaKnowledgeButtonProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AreaKnowledgeButton = ({
  text,
  isSelected = false,
  onClick,
  className = "",
}: AreaKnowledgeButtonProps) => {
  const borderColor = isSelected ? "border-blue-primary" : "border-gray-200-custom";
  const textColor = isSelected ? "text-black-custom" : "text-gray-500-custom";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full h-[56px] flex items-center justify-between px-6 border-[2px] ${borderColor} rounded-lg transition-all hover:border-blue-primary ${className}`}
    >
      <p className={`font-button text-body16 ${textColor} font-medium transition-all`}>
        {text}
      </p>
    </div>
  );
};