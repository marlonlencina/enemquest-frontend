import { Icon } from "@iconify/react/dist/iconify.js";

interface QuestionFamilyProps {
  onClick?: () => void;
}

export const QuestionFamily = ({ onClick }: QuestionFamilyProps) => {
  return (
    <div 
      className="bg-white-custom rounded-lg p-6 w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex items-center justify-between gap-4">
        <p className="font-body text-body16 text-black-custom font-medium">
          Ver habilidade e competência
        </p>
        <Icon
          icon={"mdi:chevron-right"}
          className="text-body18 text-gray-500-custom"
        />
      </div>
    </div>
  );
};