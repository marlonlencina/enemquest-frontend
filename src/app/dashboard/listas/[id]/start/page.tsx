"use client";

import { Button } from "@/app/components/form/Button";
import { Accordion } from "@/app/components/layout/Accordion";
import {
  DialogBody,
  DialogButtonsWrapper,
  DialogTitle,
} from "@/app/components/layout/dialog";
import { NavigationButton } from "@/app/components/layout/NavigationButton";
import { SubjectCode } from "@/app/components/layout/SubjectBadge";
import TextButton from "@/app/components/layout/TextButton";
import { QuestionAnswersList } from "@/app/components/question/QuestionAnswerList";
import { QuestionDetails } from "@/app/components/question/QuestionDetails";
import { QuestionImageWithHighlight } from "@/app/components/question/QuestionImageWithHighlight";
import { QuestionOptions } from "@/app/components/question/QuestionOptions";
import { getListQuestions, submitQuizResults } from "@/server/listRequests";
import { ListQuestao } from "@/types/list";
import { getCompetenciaCode, getHabilidadeCode } from "@/utils/getCode";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import placeholder from "../../../../../assets/placeholder_img_not_found.png";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Answer {
  id: string;
  title: string;
  selectedAlternative: string;
  correctAlternative: string;
  isCorrect: boolean;
}

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
  const [answersList, setAnswersList] = useState<Answer[]>([]);

  const handleOptionSelect = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setQuestionAnswers((prev) => {
      const existingIndex = prev.findIndex(
        (answer) => answer.questionId === currentQuestion.id.toString()
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          questionId: currentQuestion.id.toString(),
          selectedOption: option,
        };
        return updated;
      } else {
        return [
          ...prev,
          { questionId: currentQuestion.id.toString(), selectedOption: option },
        ];
      }
    });
  };
  const getCurrentQuestionAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return undefined;

    return questionAnswers.find(
      (answer) => answer.questionId === currentQuestion.id.toString()
    )?.selectedOption;
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
  };
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex;
    });
  };
  const handleReviewAnswers = () => {
    console.log("Revisar respostas", questionAnswers);
    const answers = questionAnswers.map((answer) => {
      const question = questions.find(
        (q) => q.id.toString() === answer.questionId
      );
      return {
        id: question?.questao.id || "",
        title: `Questão #${question?.questao.ano} - ${question?.questao.prova}`,
        selectedAlternative: answer.selectedOption,
        correctAlternative: question?.questao.gabarito
          ? question?.questao.gabarito
          : "",
        isCorrect:
          answer.selectedOption === question?.questao.gabarito ? true : false,
      };
    });
    setAnswersList(answers);
    setIsDialogOpen(true);
  };

  const handleSubmitResults = async () => {
    try {
      const mappedAnswers = answersList.map((answer) => {
        return {
          questaoId: answer.id,
          alternativaSelecionada: answer.selectedAlternative,
        };
      });
      await submitQuizResults(id, mappedAnswers);
      handleDialogStepChange("review");
    } catch (error) {
      console.error("Erro ao enviar resultados:", error);
    }
  };

  useEffect(() => {
    handleGetQuestions(id);
  }, []);

  return (
    <>
      {questions[currentQuestionIndex] && (
        <>
          <div className="w-full flex-1 bg-gray-100-custom">
            <div className="flex gap-6">
              <div className="flex flex-col gap-6 max-w-[384px] w-full">
                <QuestionDetails
                  title={`Questão #${questions[currentQuestionIndex]?.ordem} de ${questions.length}`}
                  questionNumber={`Questão ${questions[currentQuestionIndex]?.questao.ano} - Prova Amarela`}
                  questionId={`Código identificador #${questions[currentQuestionIndex]?.questao.codigoINEP}`}
                  subjectCode={
                    questions[currentQuestionIndex]?.questao
                      .prova as SubjectCode
                  }
                  actionsDisabled
                />
                <Accordion
                  title="Habilidade e competência"
                  description="Clique para exibir"
                >
                  <div className="flex flex-col gap-6">
                    <div>
                      <h5 className="font-head font-medium text-body16 text-black-custom mt-2">
                        Habilidade{" "}
                        {getHabilidadeCode(
                          questions[currentQuestionIndex]?.questao.habilidade
                            .codigo
                        )}
                      </h5>
                      <p className="font-body text-body16 text-gray-500-custom mt-2 font-normal">
                        {
                          questions[currentQuestionIndex]?.questao.habilidade
                            .descricao
                        }
                      </p>
                    </div>
                    <div>
                      <h5 className="font-head font-medium text-body16 text-black-custom mt-2">
                        Competência{" "}
                        {getCompetenciaCode(
                          questions[currentQuestionIndex]?.questao.habilidade
                            .competencia.codigo
                        )}
                      </h5>
                      <p className="font-body text-body16 text-gray-500-custom mt-2 font-normal">
                        {
                          questions[currentQuestionIndex]?.questao.habilidade
                            .competencia.descricao
                        }
                      </p>
                    </div>
                  </div>
                </Accordion>
                <QuestionOptions
                  selectedOption={getCurrentQuestionAnswer()}
                  onOptionSelect={handleOptionSelect}
                />
              </div>
              <div className="w-full">
                <QuestionImageWithHighlight
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
          </div>
          <div className="mt-6 flex items-center">
            <NavigationButton
              direction="prev"
              label="Anterior"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            />
            {currentQuestionIndex === questions.length - 1 &&
            getCurrentQuestionAnswer() ? (
              <NavigationButton
                direction="next"
                label="Revisar respostas"
                onClick={handleReviewAnswers}
              />
            ) : (
              <NavigationButton
                direction="next"
                label="Próxima Questão"
                onClick={handleNextQuestion}
                disabled={
                  currentQuestionIndex >= questions.length - 1 ||
                  !getCurrentQuestionAnswer()
                }
              />
            )}
          </div>
          <div className="mt-6 w-full grid place-content-center">
            <TextButton text="Sair da lista" onClick={() => {router.push(`/dashboard/listas/${id}`)}}></TextButton>
          </div>
        </>
      )}

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
              <QuestionAnswersList answers={answersList} />
            </div>
            <div className="mt-6">
              <DialogButtonsWrapper>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => handleDialogOpenToggle()}
                  text="Cancelar"
                />
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleSubmitResults()}
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
              <QuestionAnswersList answers={answersList} mode="review" />
            </div>

            <div className="mt-6">
              <DialogButtonsWrapper>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    router.push(`/dashboard/listas/${id}`);
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
