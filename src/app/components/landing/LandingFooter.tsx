import Link from "next/link";
import { Smartphone } from "lucide-react";
import { Logo } from "../layout/Logo";
import { WHATSAPP_COMMUNITY_URL } from "./content";

const columns = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "/#funcionalidades" },
      { label: "Como funciona", href: "/#como-funciona" },
      { label: "Plano grátis", href: "/#planos" },
      { label: "Dúvidas", href: "/#faq" },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Criar conta", href: "/auth/signup" },
      { label: "Entrar", href: "/auth/login" },
      { label: "Esqueci minha senha", href: "/auth/forgot-password" },
    ],
  },
  {
    title: "Comunidade",
    links: [
      { label: "Grupo no WhatsApp", href: WHATSAPP_COMMUNITY_URL, external: true },
      { label: "X · @enemquest", href: "https://x.com/enemquest", external: true },
      { label: "suporte@enemquest.com.br", href: "mailto:suporte@enemquest.com.br", external: true },
    ],
  },
];

export const LandingFooter = () => (
  <footer className="bg-black-custom text-white-custom">
    <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <div>
        <Logo height={28} />
        <p className="mt-4 max-w-xs text-body14 leading-relaxed text-white/60">
          Plataforma de estudos para o ENEM com questões oficiais organizadas
          por área, competência e habilidade.
        </p>
        <Link href="/#aplicativos" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-body14 text-white/85 transition-colors hover:border-white/40 hover:text-white-custom focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <Smartphone aria-hidden className="h-5 w-5 shrink-0" />
          <span><span className="block font-semibold">Apps iOS e Android</span><span className="block text-sm12 text-white/70">Em breve na App Store e Google Play</span></span>
        </Link>
      </div>
      {columns.map((c) => (
        <div key={c.title}>
          <p className="text-sm12 font-bold uppercase tracking-[0.18em] text-white/40">
            {c.title}
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {c.links.map((l) => (
              <li key={l.label}>
                {"external" in l && l.external ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body14 text-white/70 transition-colors hover:text-white-custom"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="text-body14 text-white/70 transition-colors hover:text-white-custom"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm12 text-white/50">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <span>© {new Date().getFullYear()} ENEM Quest. Todos os direitos reservados.</span>
          <Link href="/politicas-e-termos" className="text-white/80 underline underline-offset-4 hover:text-white-custom">Política de privacidade e termos de uso</Link>
        </div>
        <span>
          ENEM é uma avaliação do INEP. O ENEM Quest não possui vínculo com o INEP ou o MEC.
        </span>
      </div>
    </div>
  </footer>
);
