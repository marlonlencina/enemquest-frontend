import { Bug, Lightbulb, MessageCircle, Rocket } from "lucide-react";
import { WHATSAPP_COMMUNITY_URL } from "./content";
import { CtaLink } from "./CtaLink";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const perks = [
  {
    icon: Lightbulb,
    title: "Sugira funcionalidades",
    description: "Suas ideias entram direto na fila do que vamos construir.",
  },
  {
    icon: Bug,
    title: "Reporte bugs",
    description: "Achou algo estranho? Avise e a gente corrige rápido.",
  },
  {
    icon: Rocket,
    title: "Teste primeiro",
    description: "Receba as novidades em primeira mão, como a versão mobile.",
  },
];

export const Community = () => (
  <section id="comunidade" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-24">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <SectionHeading
          align="left"
          eyebrow="Construído com estudantes"
          title="Estude com a gente e acompanhe as novidades"
          description="Entre na comunidade para acompanhar atualizações, tirar dúvidas sobre a plataforma e compartilhar sugestões para seus estudos."
        />
        <Reveal delay={0.1} className="mt-8 flex flex-col sm:flex-row gap-3">
          <CtaLink href={WHATSAPP_COMMUNITY_URL} external variant="secondary">
            <MessageCircle className="h-5 w-5 text-success" />
            Entrar na comunidade
          </CtaLink>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-3 text-sm12 text-gray-400-custom">
            Você será redirecionado para nosso grupo no WhatsApp.
          </p>
        </Reveal>
      </div>

      <Stagger className="grid gap-4">
        {perks.map((p) => (
          <StaggerItem key={p.title}>
            <div className="flex items-start gap-4 rounded-2xl border border-gray-300-custom bg-white-custom p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-primary/40 hover:shadow-md">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-primary/10 text-pink-primary-dark">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-body16 font-extrabold text-black-custom">{p.title}</h3>
                <p className="mt-1 text-body14 text-gray-500-custom">{p.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
