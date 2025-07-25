"use client";

import { QuestionDetails } from "@/app/components/question/QuestionDetails";
import { QuestionFamily } from "@/app/components/question/QuestionFamily";
import { QuestionImage } from "@/app/components/question/QuestionImage";
import { QuestionOptions } from "@/app/components/question/QuestionOptions";

export default function Questao() {
  return (
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
  );
}
