interface QuestionOptionsProps {
  selectedOption?: string;
  onOptionSelect?: (option: string) => void;
}

export const QuestionOptions = ({ selectedOption, onOptionSelect }: QuestionOptionsProps) => {
  const options = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="bg-gray-200-custom rounded-lg p-6 max-w-[384px] w-full">
      <h4 className="font-head text-body18 font-semibold text-black-custom">
        Selecione a resposta
      </h4>
      <div className="flex items-center justify-around mt-6">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => onOptionSelect?.(option)}
            className={`h-12 w-12 rounded-full grid place-content-center font-button text-body18 font-semibold transition-all cursor-pointer ${
              selectedOption === option
                ? 'bg-pink-primary border border-pink-primary text-white'
                : 'bg-gray-100-custom border border-gray-300-custom hover:border-pink-primary'
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};