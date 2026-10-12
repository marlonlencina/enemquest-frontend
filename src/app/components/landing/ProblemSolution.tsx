import { Check, X } from "lucide-react";
import { gains, painPoints } from "./content";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const ProblemSolution = () => (
  <section className="mx-auto max-w-6xl px-6 py-24">
    <SectionHeading
      eyebrow="Por que o ENEM Quest"
      title={
        <>
          Menos tempo organizando. Mais tempo praticando.
        </>
      }
      description="Reúna questões oficiais em uma lista, escolha o que quer treinar e confira o resultado sem corrigir cada resposta à mão."
    />

    <div className="mt-14 grid gap-6 md:grid-cols-2">
      <Reveal>
        <div className="h-full rounded-2xl border border-gray-300-custom bg-gray-200-custom/60 p-7">
          <p className="text-sm14 font-bold text-gray-500-custom">Estudando do jeito antigo</p>
          <Stagger className="mt-5 flex flex-col gap-4">
            {painPoints.map((p) => (
              <StaggerItem key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-failed/10 text-failed">
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-body16 text-gray-500-custom line-through decoration-gray-400-custom/60">
                  {p}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative h-full overflow-hidden rounded-2xl bg-blue-primary-dark p-7 text-white-custom shadow-[0_24px_60px_-24px_rgba(10,85,153,0.7)]">
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-primary/30 blur-3xl"
          />
          <p className="relative text-sm14 font-bold text-pink-primary-light">Com o ENEM Quest</p>
          <Stagger className="relative mt-5 flex flex-col gap-4">
            {gains.map((g) => (
              <StaggerItem key={g} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white-custom">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-body16 font-semibold">{g}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>
    </div>
  </section>
);
