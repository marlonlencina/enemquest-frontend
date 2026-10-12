import { ArrowDown, Layers, Target } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const MatrixExplainer = () => (
  <section id="competencias-e-habilidades" className="border-y border-gray-300-custom bg-white-custom">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
      <SectionHeading align="left" eyebrow="Entenda os filtros" title="Competência e habilidade: o que isso quer dizer?" description="Pense na competência como um conjunto mais amplo de conhecimentos que você precisa usar. A habilidade é uma ação específica dentro desse conjunto: interpretar, comparar, calcular ou tirar uma conclusão." />
      <Reveal className="rounded-2xl border border-gray-300-custom bg-gray-100-custom p-6 sm:p-8">
        <p className="text-sm12 font-bold uppercase tracking-widest text-blue-primary">Exemplo simplificado · Matemática</p>
        <div className="mt-5 flex gap-3">
          <Layers aria-hidden className="mt-1 h-5 w-5 shrink-0 text-blue-primary" />
          <div><h3 className="text-body18 font-bold">Competência: usar conhecimentos numéricos</h3><p className="mt-2 text-body14 leading-relaxed text-gray-500-custom">É o conjunto mais amplo que você quer praticar.</p></div>
        </div>
        <ArrowDown aria-hidden className="my-4 ml-0.5 h-5 w-5 text-gray-500-custom" />
        <div className="flex gap-3">
          <Target aria-hidden className="mt-1 h-5 w-5 shrink-0 text-pink-primary" />
          <div><h3 className="text-body18 font-bold">Habilidade: resolver um problema com porcentagem</h3><p className="mt-2 text-body14 leading-relaxed text-gray-500-custom">É uma ação mais específica, como calcular o preço de um produto com desconto.</p></div>
        </div>
        <p className="mt-6 border-t border-gray-300-custom pt-5 text-body14 leading-relaxed text-gray-500-custom">Na sua lista, selecione a competência para um treino mais amplo ou refine pelas habilidades disponíveis. Este exemplo explica a ideia; os filtros do painel seguem a Matriz de Referência.</p>
      </Reveal>
    </div>
  </section>
);
