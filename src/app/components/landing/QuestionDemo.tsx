"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

// Questão ilustrativa (autoral), no formato das questões do app.
const options = [
  { letter: "A", text: "R$ 110,00" },
  { letter: "B", text: "R$ 120,00" },
  { letter: "C", text: "R$ 125,00" },
  { letter: "D", text: "R$ 130,00" },
  { letter: "E", text: "R$ 135,00" },
];
const CORRECT = "B";

// Sequência da animação: tentativa errada -> tentativa certa -> reinicia.
type Phase = { selected: string | null; revealed: boolean };
const timeline: { phase: Phase; duration: number }[] = [
  { phase: { selected: null, revealed: false }, duration: 1400 },
  { phase: { selected: "D", revealed: false }, duration: 900 },
  { phase: { selected: "D", revealed: true }, duration: 1800 },
  { phase: { selected: null, revealed: false }, duration: 700 },
  { phase: { selected: "B", revealed: false }, duration: 900 },
  { phase: { selected: "B", revealed: true }, duration: 2600 },
];

export const QuestionDemo = () => {
  const [step, setStep] = useState(0);
  const { selected, revealed } = timeline[step].phase;

  useEffect(() => {
    const t = setTimeout(
      () => setStep((s) => (s + 1) % timeline.length),
      timeline[step].duration
    );
    return () => clearTimeout(t);
  }, [step]);

  const isCorrect = selected === CORRECT;

  return (
    <div className="relative rounded-2xl bg-white-custom border border-gray-300-custom shadow-[0_24px_60px_-20px_rgba(10,85,153,0.35)] p-5 sm:p-6">
      {/* Cabeçalho da questão */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-mt-exam px-2 py-1 text-sm12 font-bold text-white-custom">
            MT
          </span>
          <span className="text-sm12 font-semibold text-gray-500-custom">
            Competência 1 · H3
          </span>
        </div>
        <span className="text-sm12 font-semibold text-gray-400-custom">Questão 7 de 20</span>
      </div>

      <div className="mt-3 h-1.5 w-full rounded-full bg-gray-200-custom overflow-hidden">
        <div className="h-full w-[35%] rounded-full bg-blue-primary" />
      </div>

      <p className="mt-5 text-body16 font-semibold leading-relaxed text-black-custom">
        Uma loja anuncia 20% de desconto em um tênis que custa R$ 150,00. Qual
        será o valor pago pelo cliente?
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {options.map((o) => {
          const isSelected = selected === o.letter;
          const showCorrect = revealed && o.letter === CORRECT && isCorrect;
          const showWrong = revealed && isSelected && !isCorrect;

          let style = "border-gray-200-custom bg-white-custom";
          if (isSelected && !revealed) style = "border-blue-primary bg-blue-primary/5";
          if (showCorrect) style = "border-success bg-success/10";
          if (showWrong) style = "border-failed bg-failed/10";

          return (
            <motion.li
              key={o.letter}
              layout
              animate={showWrong ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-300 ${style}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm12 font-bold transition-colors duration-300 ${
                  showCorrect
                    ? "bg-success text-white-custom"
                    : showWrong
                    ? "bg-failed text-white-custom"
                    : isSelected
                    ? "bg-blue-primary text-white-custom"
                    : "bg-gray-200-custom text-gray-500-custom"
                }`}
              >
                {showCorrect ? (
                  <Check className="h-4 w-4" />
                ) : showWrong ? (
                  <X className="h-4 w-4" />
                ) : (
                  o.letter
                )}
              </span>
              <span className="text-body14 font-medium text-black-custom">{o.text}</span>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-4 h-6">
        <AnimatePresence mode="wait">
          {revealed && (
            <motion.p
              key={isCorrect ? "ok" : "fail"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`text-sm14 font-semibold ${isCorrect ? "text-success" : "text-failed"}`}
            >
              {isCorrect ? "Resposta correta! Gabarito: B" : "Quase! Tente de novo."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <span className="absolute -bottom-6 right-2 text-[11px] text-gray-400-custom">
        Questão ilustrativa
      </span>
    </div>
  );
};
