"use client";
import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";

const options = [
  { letter: "A", text: "R$ 110,00" },
  { letter: "B", text: "R$ 120,00" },
  { letter: "C", text: "R$ 125,00" },
  { letter: "D", text: "R$ 130,00" },
  { letter: "E", text: "R$ 135,00" },
];
const CORRECT = "B";

export const QuestionDemo = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative rounded-2xl bg-white-custom border border-gray-300-custom shadow-[0_24px_60px_-20px_rgba(10,85,153,0.35)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-md bg-mt-exam px-2 py-1 text-sm12 font-bold text-white-custom">Matemática</span>
        <span className="text-sm12 font-semibold text-gray-500-custom">Demonstração · questão autoral</span>
      </div>
      <p className="mt-4 text-body14 text-gray-500-custom">
        Experimente selecionar uma resposta e enviar. No painel, a correção acontece ao concluir a lista.
      </p>
      <fieldset className="mt-5" disabled={submitted}>
        <legend className="text-body16 font-semibold leading-relaxed text-black-custom">
          Uma loja anuncia 20% de desconto em um tênis que custa R$ 150,00. Qual será o valor pago pelo cliente?
        </legend>
        <div className="mt-4 flex flex-col gap-2">
          {options.map((option) => {
            const correct = submitted && option.letter === CORRECT;
            const wrong = submitted && selected === option.letter && !correct;
            return (
              <label key={option.letter} className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${submitted ? "" : "cursor-pointer"} ${correct ? "border-success bg-success/10" : wrong ? "border-failed bg-failed/10" : selected === option.letter ? "border-blue-primary bg-blue-primary/5" : "border-gray-300-custom"}`}>
                <input type="radio" name="demo-answer" value={option.letter} checked={selected === option.letter} onChange={() => setSelected(option.letter)} className="h-4 w-4 accent-blue-primary" />
                <span className="text-body14 font-medium text-black-custom">{option.letter}. {option.text}</span>
                {correct && <Check aria-label="Gabarito" className="ml-auto h-4 w-4 text-success" />}
                {wrong && <X aria-label="Resposta incorreta" className="ml-auto h-4 w-4 text-failed" />}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div role="status" className="mt-4 text-body14 leading-relaxed text-gray-500-custom">
        {submitted && <p><strong className={selected === CORRECT ? "text-success" : "text-failed"}>{selected === CORRECT ? "Você acertou." : "Você errou."}</strong> Gabarito: B · R$ 120,00.</p>}
      </div>
      <button type="button" disabled={!selected && !submitted} onClick={() => {
        if (submitted) { setSelected(null); setSubmitted(false); }
        else setSubmitted(true);
      }} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-primary px-4 py-3 text-body14 font-semibold text-white-custom hover:bg-blue-primary-dark disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary">
        {submitted ? <><RotateCcw aria-hidden className="h-4 w-4" /> Reiniciar demonstração</> : "Enviar resposta da demonstração"}
      </button>
    </div>
  );
};
