"use client";

import { QuestionDetails } from "@/app/components/question/QuestionDetails";
import { QuestionFamily } from "@/app/components/question/QuestionFamily";
import { QuestionImage } from "@/app/components/question/QuestionImage";
import { QuestionOptions } from "@/app/components/question/QuestionOptions";
import { Container } from "../../../components/container";
import { Header } from "../../../components/header";

export default function Questao() {
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
        </Container>
      </div>
    </div>
  );
}
