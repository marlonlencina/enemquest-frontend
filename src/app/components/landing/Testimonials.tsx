import { MessageSquareQuote } from "lucide-react";
import { WHATSAPP_COMMUNITY_URL } from "./content";
import { CtaLink } from "./CtaLink";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const Testimonials = () => (
  <section id="depoimentos" className="mx-auto max-w-4xl px-6 py-20">
    <SectionHeading eyebrow="Experiências de estudantes" title="Já estudou com o ENEM Quest?" description="Queremos conhecer sua experiência: como você usou as listas, o que ajudou no seu treino e o que podemos melhorar." />
    <Reveal className="mt-8 rounded-2xl border border-gray-300-custom bg-white-custom p-8 text-center">
      <MessageSquareQuote aria-hidden className="mx-auto h-8 w-8 text-blue-primary" />
      <p className="mx-auto mt-4 max-w-xl text-body16 leading-relaxed text-gray-500-custom">Estamos reunindo os primeiros depoimentos para publicar aqui, com autorização de quem compartilhar.</p>
      <CtaLink href={WHATSAPP_COMMUNITY_URL} external variant="secondary" className="mt-6 h-auto min-h-14 py-3">Compartilhar minha experiência</CtaLink>
    </Reveal>
  </section>
);
