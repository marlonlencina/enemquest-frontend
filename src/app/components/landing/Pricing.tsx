import { Check, Sparkles } from "lucide-react";
import { AUTH_MAINTENANCE_ENABLED } from "@/config/maintenance";
import { WHATSAPP_COMMUNITY_URL } from "./content";
import { CtaLink } from "./CtaLink";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { StudyDeviceNotice } from "./StudyDeviceNotice";

const included = [
  "Questões oficiais de provas anteriores do ENEM",
  "Listas personalizadas nas quatro áreas",
  "Filtros por competência e habilidade",
  "Opção de pular questões já respondidas",
  "Revisão das respostas antes do envio",
  "Correção automática e resultado por lista",
];

export const Pricing = () => (
  <section id="planos" className="border-y border-gray-300-custom bg-white-custom">
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="Plano grátis" title="Comece a praticar sem pagar." description="Um único plano para organizar seu treino com questões oficiais. Sem cartão de crédito." />
      <Reveal className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-blue-primary/25 bg-gray-100-custom shadow-[0_20px_60px_-30px_rgba(10,85,153,0.3)]">
        <div className="flex items-center justify-center gap-2 bg-blue-primary-dark px-6 py-3 text-sm14 font-semibold text-white-custom">
          <Sparkles aria-hidden className="h-4 w-4" /> Gratuito durante o beta
        </div>
        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-2 md:items-start">
          <div>
            <h3 className="text-head24 font-extrabold">Grátis</h3>
            <p className="mt-4 flex items-baseline gap-2"><span className="text-head56 font-extrabold tracking-tight">R$ 0</span><span className="text-body14 text-gray-500-custom">durante o beta</span></p>
            <p className="mt-3 text-body14 leading-relaxed text-gray-500-custom">Para quem quer escolher o que treinar e conferir seus acertos ao concluir cada lista.</p>
            <CtaLink href={AUTH_MAINTENANCE_ENABLED ? WHATSAPP_COMMUNITY_URL : "/auth/signup"} external={AUTH_MAINTENANCE_ENABLED} arrow className="mt-6 h-auto min-h-14 w-full px-4 py-3">
              {AUTH_MAINTENANCE_ENABLED ? "Avise-me quando voltar" : "Criar conta grátis"}
            </CtaLink>
            {AUTH_MAINTENANCE_ENABLED && <p className="mt-3 text-sm12 leading-relaxed text-gray-500-custom">Login e cadastro estão em manutenção. Acompanhe o retorno pela comunidade no WhatsApp.</p>}
          </div>
          <div>
            <p className="text-body14 font-bold">O que está incluído</p>
            <ul className="mt-5 space-y-4">
              {included.map((feature) => <li key={feature} className="flex items-start gap-3 text-body14 leading-relaxed text-gray-500-custom"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-blue-primary" /><span>{feature}</span></li>)}
            </ul>
          </div>
          <StudyDeviceNotice className="border-t border-gray-300-custom pt-5 md:col-span-2" />
        </div>
      </Reveal>
    </div>
  </section>
);
