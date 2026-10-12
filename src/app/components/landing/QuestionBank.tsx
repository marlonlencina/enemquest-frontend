import { BookOpen, Filter, Fingerprint } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const details = [
  { icon: BookOpen, title: "Questões de provas anteriores", description: "Pratique com questões oficiais do ENEM nas quatro áreas: Linguagens, Humanas, Natureza e Matemática." },
  { icon: Fingerprint, title: "Origem identificada", description: "Confira o ano, o caderno, a aplicação e o código INEP de cada questão disponível na plataforma." },
  { icon: Filter, title: "Listas com o seu foco", description: "Escolha áreas, competências e habilidades. Você também pode pular questões que já respondeu." },
];

export const QuestionBank = () => (
  <section id="banco-de-questoes" className="mx-auto max-w-6xl px-6 py-20">
    <SectionHeading eyebrow="Banco de questões" title="Questões oficiais. Prática organizada." description="Use provas anteriores como ponto de partida para montar suas listas de estudo." />
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {details.map(({ icon: Icon, title, description }) => (
        <Reveal key={title} className="h-full rounded-2xl border border-gray-300-custom bg-white-custom p-6">
          <Icon aria-hidden className="h-6 w-6 text-blue-primary" />
          <h3 className="mt-4 text-body20 font-extrabold">{title}</h3>
          <p className="mt-3 text-body16 leading-relaxed text-gray-500-custom">{description}</p>
        </Reveal>
      ))}
    </div>
    <p className="mt-5 text-center text-body14 leading-relaxed text-gray-500-custom">Durante a manutenção, a consulta ao banco está indisponível. A cobertura de anos e aplicações poderá ser conferida no painel quando o acesso voltar.</p>
  </section>
);
