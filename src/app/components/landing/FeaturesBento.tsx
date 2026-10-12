import { BadgeCheck, ClipboardCheck, Filter, PieChart, Trophy, Wand2 } from "lucide-react";
import { ReactNode } from "react";
import {
  BentoCard,
  GeneratorDemo,
  RankingMock,
  ResultRing,
  ReviewGrid,
} from "./FeatureDemos";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const CardTitle = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <div>
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-primary/10 text-blue-primary">
      {icon}
    </span>
    <h3 className="mt-4 text-body20 font-extrabold text-black-custom">{title}</h3>
    <p className="mt-2 text-body14 leading-relaxed text-gray-500-custom">{description}</p>
  </div>
);

const matrixChips = [
  { label: "Competência 1", active: true },
  { label: "Competência 3", active: false },
  { label: "Competência 5", active: true },
  { label: "H3", active: true },
  { label: "H12", active: false },
  { label: "H21", active: true },
  { label: "H25", active: false },
];

export const FeaturesBento = () => (
  <section
    id="funcionalidades"
    className="scroll-mt-20 border-y border-gray-300-custom bg-white-custom"
  >
    <div className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Funcionalidades"
        title="Escolha o que treinar. Confira como foi."
        description="Ferramentas pensadas para quem leva o ENEM a sério, sem complicação."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {/* Gerador */}
        <Reveal className="lg:col-span-2 h-full">
          <BentoCard className="bg-linear-to-br from-white-custom to-gray-100-custom">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <CardTitle
                icon={<Wand2 className="h-5 w-5" />}
                title="Gerador de listas sob medida"
                description="Escolha as matérias e como distribuir as questões: um total geral, uma quantidade por área ou um número específico para cada uma. Ative a opção de pular o que você já respondeu e pronto."
              />
              <GeneratorDemo />
            </div>
          </BentoCard>
        </Reveal>

        {/* Questões oficiais */}
        <Reveal delay={0.05} className="h-full">
          <BentoCard>
            <CardTitle
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Questões oficiais"
              description="Questões de provas anteriores do ENEM, cada uma com sua origem identificada."
            />
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200-custom bg-gray-200-custom text-sm14">
              {[
                ["Ano", "ENEM 2023"],
                ["Caderno", "Amarelo"],
                ["Aplicação", "Regular"],
                ["Código", "INEP"],
              ].map(([k, v]) => (
                <div key={k} className="bg-white-custom p-3">
                  <dt className="text-sm12 text-gray-400-custom">{k}</dt>
                  <dd className="font-bold text-black-custom">{v}</dd>
                </div>
              ))}
            </dl>
          </BentoCard>
        </Reveal>

        {/* Matriz */}
        <Reveal className="h-full">
          <BentoCard>
            <CardTitle
              icon={<Filter className="h-5 w-5" />}
              title="Filtre pela Matriz de Referência"
              description="Vá direto ao ponto: selecione competências e habilidades específicas para treinar suas maiores dificuldades."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {matrixChips.map((c) => (
                <span
                  key={c.label}
                  className={`rounded-full border px-3 py-1 text-sm12 font-semibold transition-colors ${
                    c.active
                      ? "border-blue-primary bg-blue-primary text-white-custom"
                      : "border-gray-300-custom text-gray-500-custom group-hover:border-gray-400-custom"
                  }`}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </BentoCard>
        </Reveal>

        {/* Revisão */}
        <Reveal delay={0.05} className="h-full">
          <BentoCard>
            <CardTitle
              icon={<ClipboardCheck className="h-5 w-5" />}
              title="Revise antes de confirmar"
              description="Navegue entre as questões, veja o que ficou em branco e só envie quando tiver certeza."
            />
            <div className="mt-6">
              <ReviewGrid />
            </div>
          </BentoCard>
        </Reveal>

        {/* Resultado */}
        <Reveal delay={0.1} className="h-full">
          <BentoCard>
            <CardTitle
              icon={<PieChart className="h-5 w-5" />}
              title="Resultado na hora"
              description="Correção automática com acertos, erros e aproveitamento de cada lista."
            />
            <div className="mt-6">
              <ResultRing percent={75} />
            </div>
          </BentoCard>
        </Reveal>

        {/* Ranking */}
        <Reveal className="lg:col-span-3 h-full">
          <BentoCard className="bg-linear-to-r from-white-custom via-white-custom to-pink-primary/5">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <CardTitle
                  icon={<Trophy className="h-5 w-5" />}
                  title="Ranking entre estudantes"
                  description="Cada questão respondida conta. Acompanhe sua posição, compare com outros estudantes e use a competição a seu favor."
                />
                <span className="mt-4 inline-block rounded-full bg-pink-primary/10 px-3 py-1 text-sm12 font-bold text-pink-primary-dark">
                  Novidade do beta
                </span>
              </div>
              <RankingMock />
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </div>
  </section>
);
