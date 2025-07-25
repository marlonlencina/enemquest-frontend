"use client";

import { Button } from "@/app/components/form/Button";
import {
  DialogBody,
  DialogButtonsWrapper,
  DialogTitle,
} from "@/app/components/layout/dialog";
import StatCard from "@/app/components/layout/StatCard";
import { SubjectCode } from "@/app/components/layout/SubjectBadge";
import { QuestionAnswersList } from "@/app/components/question/QuestionAnswerList";
import { QuestionAnswersListReview } from "@/app/components/question/QuestionAnswerListReview";
import { QuestionDetails } from "@/app/components/question/QuestionDetails";
import { QuestionFamily } from "@/app/components/question/QuestionFamily";
import { QuestionImage } from "@/app/components/question/QuestionImage";
import { QuestionOptions } from "@/app/components/question/QuestionOptions";
import { getListQuestions } from "@/server/listRequests";
import { ListQuestao } from "@/types/list";
import { NavigationButton } from "@/app/components/layout/NavigationButton";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import placeholder from "../../../../../assets/placeholder_img_not_found.png";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const answers = [
  {
    id: "1",
    title: "Questão #1 - ENEM 2024 (Físico)",
    selectedAlternative: "A",
  },
  {
    id: "2",
    title: "Questão #2 - ENEM 2024 (Físico)",
    selectedAlternative: "B",
  },
  {
    id: "3",
    title: "Questão #3 - ENEM 2024 (Físico)",
    selectedAlternative: "D",
  },
];

const answersReview = [
  {
    id: "1",
    title: "Questão #1 - ENEM 2024 (Físico)",
    selectedAlternative: "A",
    correctAlternative: "A",
  },
  {
    id: "2",
    title: "Questão #2 - ENEM 2024 (Físico)",
    selectedAlternative: "B",
    correctAlternative: "B",
  },
  {
    id: "3",
    title: "Questão #3 - ENEM 2024 (Físico)",
    selectedAlternative: "D",
    correctAlternative: "C",
  },
];

interface QuestionAnswer {
  questionId: string;
  selectedOption: string;
}

export default function ListQuestions({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpenToggle = () => {
    setIsDialogOpen((state) => !state);
  };
  const [dialogStep, setDialogStep] = useState("confirm");
  const handleDialogStepChange = (step: string) => {
    setDialogStep(step);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<ListQuestao[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
  
  const handleOptionSelect = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setQuestionAnswers(prev => {
      const existingIndex = prev.findIndex(answer => answer.questionId === currentQuestion.id.toString());
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId: currentQuestion.id.toString(), selectedOption: option };
        return updated;
      } else {
        return [...prev, { questionId: currentQuestion.id.toString(), selectedOption: option }];
      }
    });
  };

  const getCurrentQuestionAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return undefined;
    
    return questionAnswers.find(answer => answer.questionId === currentQuestion.id.toString())?.selectedOption;
  };
  const handleGetQuestions = async (listId: string) => {
    try {
      const response = await getListQuestions(listId);
      console.log("Questões obtidas:", response);

      if (response.success && response.data) {
        if (response.data.length < 1) {
          router.push(`/dashboard/listas/${id}`);
        } else {
          setQuestions(response.data!);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
    }
  };
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex >= 0 ? nextIndex : 0;
    });
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex;
    });
  };

  const handleReviewAnswers = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    handleGetQuestions(id);
  }, []);

  return (
    <>
      {questions[currentQuestionIndex] && (
        <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
          <div className="flex items-start gap-6">
            <div className="flex flex-col gap-6 max-w-[384px] w-full">
              <div>
                <p>{currentQuestionIndex + 1} de {questions.length}</p>
              </div>
              <QuestionDetails
                title={`${questions[currentQuestionIndex]?.id}`}
                questionNumber={`Questão ${questions[currentQuestionIndex]?.questao.ano} - Amarela`}
                questionId={`${questions[currentQuestionIndex]?.questao.codigoINEP}`}
                subjectCode={
                  questions[currentQuestionIndex]?.questao.prova as SubjectCode
                }
                actionsDisabled
              />
              <QuestionFamily />
              <QuestionOptions 
                selectedOption={getCurrentQuestionAnswer()}
                onOptionSelect={handleOptionSelect}
              />
            </div>
            <QuestionImage
              src={
                questions[currentQuestionIndex]?.questao.imagemUrl
                  ? questions[currentQuestionIndex]?.questao.imagemUrl
                  : placeholder.src
              }
              alt={`Questão ${questions[currentQuestionIndex]?.questao.codigoINEP}`}
              questionId={`${questions[currentQuestionIndex]?.questao.codigoINEP}`}
            />
          </div>
        </div>
      )}
      <div className="flex items-center">
        <NavigationButton 
          direction="prev"
          label="Anterior"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        />
        {currentQuestionIndex === questions.length - 1 && getCurrentQuestionAnswer() ? (
          <NavigationButton 
            direction="next"
            label="Revisar respostas"
            onClick={handleReviewAnswers}
          />
        ) : (
          <NavigationButton 
            direction="next"
            label="Próxima"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex >= questions.length - 1 || !getCurrentQuestionAnswer()}
          />
        )}
      </div>
      <DialogBody
        showCloseButton={false}
        maxWidth="max-w-[696px]"
        open={isDialogOpen}
        onOpenChange={handleDialogOpenToggle}
      >
        {dialogStep === "confirm" ? (
          <div className="p-6">
            <div className="flex flex-col gap-2">
              <DialogTitle>Confirme as respostas</DialogTitle>
              <DialogDescription>
                Por favor, confirme suas respostas antes de enviar.
              </DialogDescription>
            </div>
            <div className="mt-6">
              <QuestionAnswersList answers={answers} />
            </div>
            <div className="mt-6">
              <DialogButtonsWrapper>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {}}
                  text="Cancelar"
                />
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleDialogStepChange("review")}
                  text="Confirmar"
                />
              </DialogButtonsWrapper>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col gap-2">
              <DialogTitle>Aqui está seu desempenho</DialogTitle>
            </div>
            <div className="mt-6">
              <QuestionAnswersListReview answers={answersReview} />
            </div>
            <div className="mt-6 ">
              <div className="w-full grid grid-cols-2 gap-[2px] bg-gray-100-custom p-[2px] overflow-hidden">
                <StatCard
                  height="124px"
                  rounded={false}
                  text="Questões"
                  number="5"
                />
                <StatCard
                  height="124px"
                  text="Acertos"
                  rounded={false}
                  number="3"
                  icon="mdi:check-circle"
                  iconColor="text-success"
                />
                <StatCard
                  height="124px"
                  rounded={false}
                  text="Erros"
                  number="2"
                  icon="mdi:close-circle"
                  iconColor="text-failed"
                />
                <StatCard
                  height="124px"
                  rounded={false}
                  text="Aproveitamento"
                  number="60%"
                />
              </div>
            </div>
            <div className="mt-6">
              <DialogButtonsWrapper>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    router.push("/dashboard/listas/123");
                  }}
                  text="Ir para o início"
                />
              </DialogButtonsWrapper>
            </div>
          </div>
        )}
      </DialogBody>
    </>
  );
}
