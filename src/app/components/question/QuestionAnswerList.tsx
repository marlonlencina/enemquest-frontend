interface QuestionAnswer {
  id: string;
  title: string;
  selectedAlternative: string;
}

interface QuestionAnswersListProps {
  answers: QuestionAnswer[];
}

export function QuestionAnswersList({ answers }: QuestionAnswersListProps) {
  return (
    <div className="w-full flex flex-col gap-4  ">
      {answers.map((answer, index) => (
        <div
          key={answer.id}
          className={`h-[48px] px-6 flex items-center justify-between ${
            index > 0 ? 'border-t border-gray-100-custom' : ''
          }`}
        >
          <p className="text-body16 text-black-custom font-body font-medium">
            {answer.title}
          </p>
          <p className="text-body16 text-black-custom font-body font-normal">
            Alternativa: <b>{answer.selectedAlternative}</b>
          </p>
        </div>
      ))}
    </div>
  );
}