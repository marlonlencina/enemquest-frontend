import Link from "next/link";
import { Logo } from "../layout/Logo";
import { WHATSAPP_COMMUNITY_URL } from "./content";

const columns = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Dúvidas", href: "#faq" },
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
    links: [{ label: "Grupo no WhatsApp", href: WHATSAPP_COMMUNITY_URL, external: true }],
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
        <span>© {new Date().getFullYear()} ENEM Quest. Todos os direitos reservados.</span>
        <span>
          ENEM é uma avaliação do INEP. O ENEM Quest não possui vínculo com o INEP ou o MEC.
        </span>
      </div>
    </div>
  </footer>
);
