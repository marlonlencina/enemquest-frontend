import { Icon } from "@iconify/react/dist/iconify.js";

interface QuestionAnswer {
  id: string;
  title: string;
  selectedAlternative: string;
  correctAlternative?: string;
  isCorrect?: boolean;
}

interface QuestionAnswersListProps {
  answers: QuestionAnswer[];
  mode?: 'confirmation' | 'review';
}

export function QuestionAnswersList({ answers, mode = 'confirmation' }: QuestionAnswersListProps) {
  const isReviewMode = mode === 'review';
  
  return (
    <div className={`w-full flex flex-col ${!isReviewMode ? 'gap-4' : ''}`}>
      {answers.map((answer, index) => {
        const isCorrect = answer.selectedAlternative === answer.correctAlternative;
        const hasCorrectAnswer = answer.correctAlternative !== undefined;
        
        return (
          <div
            key={answer.id}
            className={`px-6 flex items-center justify-between ${
              index > 0 ? 'border-t border-gray-100-custom' : ''
            } ${
              isReviewMode 
                ? `h-[56px] ${isCorrect ? "bg-success-10" : "bg-failed-10"}` 
                : 'h-[48px]'
            }`}
          >
            {isReviewMode ? (
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
            ) : (
              <p className="text-body16 text-black-custom font-body font-medium">
                {answer.title}
              </p>
            )}
            
            <div className="flex gap-4">
              <p className="text-body16 text-black-custom font-body font-normal">
                Alternativa: <b>{answer.selectedAlternative}</b>
              </p>
              {isReviewMode && hasCorrectAnswer && (
                <p className="text-body16 text-black-custom font-body font-normal">
                  Correta: <b>{answer.correctAlternative}</b>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}