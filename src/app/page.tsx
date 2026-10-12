import type { Metadata } from "next";
import { AreasStrip } from "./components/landing/AreasStrip";
import { Community } from "./components/landing/Community";
import { EnemNumbers } from "./components/landing/EnemNumbers";
import { Faq } from "./components/landing/Faq";
import { FeaturesBento } from "./components/landing/FeaturesBento";
import { FinalCta } from "./components/landing/FinalCta";
import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { LandingFooter } from "./components/landing/LandingFooter";
import { LandingHeader } from "./components/landing/LandingHeader";
import { LandingMotion } from "./components/landing/LandingMotion";
import { ProblemSolution } from "./components/landing/ProblemSolution";
import { RedirectIfAuthenticated } from "./components/landing/RedirectIfAuthenticated";

export const metadata: Metadata = {
  title: "ENEM Quest | Treine com questões reais do ENEM",
  description:
    "Monte listas com questões oficiais de provas anteriores do ENEM, filtre por competência e habilidade e acompanhe seu desempenho. Gratuito durante o beta.",
  openGraph: {
    title: "ENEM Quest | Treine com questões reais do ENEM",
    description:
      "Listas personalizadas com questões oficiais do ENEM, filtros pela Matriz de Referência e resultado na hora.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function Home() {
  return (
    <LandingMotion>
      <RedirectIfAuthenticated />
      <div className="min-h-screen w-full overflow-x-clip bg-gray-100-custom text-black-custom">
        <LandingHeader />
        <main>
          <Hero />
          <AreasStrip />
          <ProblemSolution />
          <FeaturesBento />
          <HowItWorks />
          <EnemNumbers />
          <Community />
          <Faq />
          <FinalCta />
        </main>
        <LandingFooter />
      </div>
    </LandingMotion>
  );
}
