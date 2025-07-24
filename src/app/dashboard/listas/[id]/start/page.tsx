"use client";

import { Button } from "@/app/components/form/Button";
import { Header } from "@/app/components/header";
import { Container } from "@/app/components/layout/Container";
import {
  DialogBody,
  DialogButtonsWrapper,
  DialogTitle,
} from "@/app/components/layout/dialog";
import StatCard from "@/app/components/layout/StatCard";
import { QuestionAnswersList } from "@/app/components/question/QuestionAnswerList";
import { QuestionAnswersListReview } from "@/app/components/question/QuestionAnswerListReview";
import { QuestionDetails } from "@/app/components/question/QuestionDetails";
import { QuestionFamily } from "@/app/components/question/QuestionFamily";
import { QuestionImage } from "@/app/components/question/QuestionImage";
import { QuestionOptions } from "@/app/components/question/QuestionOptions";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function ListQuestions() {
  const router = useRouter();
  const [dialogStep, setDialogStep] = useState("confirm");
  const handleDialogStepChange = (step: string) => {
    setDialogStep(step);
  };

  return (
    <div className=" bg-gray-200-custom w-full min-h-screen">
      <Header />
      <div>
        <Container>
          <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
            <div className="flex items-start gap-6">
              <div className="flex flex-col gap-6 max-w-[384px] w-full">
                <QuestionDetails
                  title="ENEM 2024 (Físico)"
                  questionNumber="Questão 45 - Amarela"
                  questionId="140571"
                  subjectCode="MT"
                  actionsDisabled
                />
                <QuestionFamily />
                <QuestionOptions />
              </div>
              <QuestionImage
                src="https://pub-cd01baa955d3448daf6505f3e316fa38.r2.dev/questions/140576.png"
                alt="Questão 140571"
                questionId="140571"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center gap-4 cursor-not-allowed w-full bg-gray-200-custom  h-[56px] font-button text-button16 text-gray-400-custom">
              <Icon
                icon="mdi:chevron-left"
                className="text-body20 text-gray-400-custom"
              />
              Anterior
            </div>
            <div className="flex items-center justify-center gap-4 cursor-pointer w-full bg-gray-300-custom  h-[56px] font-button text-button16 text-black-custom">
              Próxima
              <Icon
                icon="mdi:chevron-right"
                className="text-body20 text-gray-500-custom"
              />
            </div>
          </div>
        </Container>
      </div>
      <DialogBody
        showCloseButton={false}
        maxWidth="max-w-[696px]"
        open
        onOpenChange={() => {}}
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
    </div>
  );
}
