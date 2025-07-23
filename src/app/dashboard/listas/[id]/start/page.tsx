"use client";

import { Container } from "@/app/components/layout/Container";
import { Header } from "@/app/components/header";
import { QuestionDetails } from "@/app/components/question/QuestionDetails";
import { QuestionFamily } from "@/app/components/question/QuestionFamily";
import { QuestionImage } from "@/app/components/question/QuestionImage";
import { QuestionOptions } from "@/app/components/question/QuestionOptions";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ListQuestions() {
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
    </div>
  );
}
