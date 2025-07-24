import { Icon } from "@iconify/react/dist/iconify.js";

interface QuestionAnswer {
  id: string;
  title: string;
  selectedAlternative: string;
  correctAlternative?: string; // Optional for review answers
}

interface QuestionAnswersListProps {
  answers: QuestionAnswer[];
}

export function QuestionAnswersListReview({ answers }: QuestionAnswersListProps) {
  return (
    <div className="w-full flex flex-col">
      {answers.map((answer, index) => {
        const isCorrect = answer.selectedAlternative === answer.correctAlternative;
        return (
          <div
            key={answer.id}
            className={`h-[56px] px-6 flex items-center justify-between ${
              index > 0 ? "border-t border-gray-100-custom" : ""
            } ${isCorrect ? "bg-success-10" : "bg-failed-10"}`}
          >
            <div className="flex items-center gap-4">
              {isCorrect ? (
                <Icon icon="mdi:check-circle" className="text-success text-body20" />
              ) : (
                <Icon icon="mdi:close-circle" className="text-failed text-body20" />
              )}
              <p className="text-body16 text-black-custom font-body font-medium">
                {answer.title}
              </p>
            </div>
            <p className="text-body16 text-black-custom font-body font-normal">
              Alternativa: <b>{answer.selectedAlternative}</b>
            </p>
            {answer.correctAlternative && (
              <p className="text-body16 text-black-custom font-body font-normal">
                Correta: <b>{answer.correctAlternative}</b>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
