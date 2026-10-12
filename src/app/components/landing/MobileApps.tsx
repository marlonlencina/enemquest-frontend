import { Bell, Smartphone } from "lucide-react";
import { WHATSAPP_COMMUNITY_URL } from "./content";
import { CtaLink } from "./CtaLink";
import { Reveal } from "./Reveal";

export const MobileApps = () => (
  <section id="aplicativos" className="mx-auto max-w-6xl px-6 py-20">
    <Reveal className="relative overflow-hidden rounded-3xl bg-blue-primary-dark px-6 py-12 text-white-custom sm:px-12 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-pink-primary/20 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <p className="text-sm12 font-bold uppercase tracking-widest text-pink-primary-light">Seu treino vai com você</p>
          <h2 className="mt-3 text-head32 font-extrabold leading-tight sm:text-head40">ENEM Quest no celular.<br />Em breve.</h2>
          <p className="mt-5 max-w-xl text-body16 leading-relaxed text-white/85">Os aplicativos para iOS e Android estão a caminho. Acompanhe as novidades na comunidade e saiba quando estiverem disponíveis.</p>
          <CtaLink href={WHATSAPP_COMMUNITY_URL} external variant="light" className="mt-8 h-auto min-h-14 py-3">
            <Bell aria-hidden className="h-4 w-4 shrink-0" /> Acompanhar o lançamento
          </CtaLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[{ platform: "iOS", store: "App Store" }, { platform: "Android", store: "Google Play" }].map(({ platform, store }) => (
            <div key={platform} className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-5">
              <Smartphone aria-hidden className="h-8 w-8 shrink-0 text-white/90" />
              <div className="flex-1"><p className="text-sm12 text-white/75">{platform}</p><p className="text-body20 font-bold">{store}</p></div>
              <span className="rounded-full border border-white/25 px-3 py-1 text-sm12 font-semibold">Em breve</span>
            </div>
          ))}
          <p className="text-sm12 leading-relaxed text-white/75 sm:col-span-2 lg:col-span-1">Ainda não disponíveis para download. Por enquanto, use o painel em um notebook ou tablet.</p>
        </div>
      </div>
    </Reveal>
  </section>
);
