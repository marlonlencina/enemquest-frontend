export interface ButtonOptionToggleProps {
  title: string;
  description: string;
  tip?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ButtonOptionToggle = ({
  title,
  description,
  tip,
  isSelected = false,
  onClick,
  className = "",
}: ButtonOptionToggleProps) => {
  const borderClass = isSelected
    ? "border-blue-primary-light"
    : "border-gray-100-custom hover:border-gray-200-custom";

  return (
    <button
      type="button"
      className={`cursor-pointer flex flex-col items-start p-6 rounded-lg border-2 ${borderClass} bg-white-custom transition-all ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <p className="font-body text-body18 text-black-custom font-medium">
          {title}
        </p>
      </div>
      <p className="text-start font-body text-body14 text-gray-500-custom font-normal mt-2">
        {description}
      </p>
      {tip && (
        <div className="mt-2">
          <span className="font-body text-sm12 font-normal text-blue-primary-dark">
            {tip}
          </span>
        </div>
      )}
    </button>
  );
};
