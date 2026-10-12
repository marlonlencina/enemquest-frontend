import { ArrowLeft, MessageCircle, Wrench } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_COMMUNITY_URL } from "../landing/content";
import { Logo } from "../layout/Logo";

export const AuthMaintenance = () => (
  <main className="flex min-h-screen items-center justify-center bg-gray-100-custom px-6 py-12">
    <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-gray-300-custom bg-white-custom shadow-xl">
      <div className="bg-blue-primary-dark px-6 py-7 sm:px-8">
        <Link href="/" aria-label="ENEM Quest — início" className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <Logo height={28} />
        </Link>
      </div>
      <div className="px-6 py-10 sm:px-8">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-primary/10 text-blue-primary">
          <Wrench aria-hidden className="h-7 w-7" />
        </span>
        <p className="mt-6 text-sm12 font-bold uppercase tracking-widest text-blue-primary">Pausa temporária</p>
        <h1 className="mt-3 text-head32 font-extrabold leading-tight text-black-custom">Estamos em manutenção</h1>
        <p className="mt-4 text-body16 leading-relaxed text-slate-600">
          O login e o cadastro estão temporariamente indisponíveis enquanto cuidamos da plataforma. Tente novamente mais tarde.
        </p>
        <p className="mt-3 text-body14 leading-relaxed text-slate-600">
          Acompanhe as novidades e saiba quando o acesso voltar pela nossa comunidade no WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-primary px-4 py-3 text-body14 font-semibold text-white-custom transition-colors hover:bg-blue-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary">
            <MessageCircle aria-hidden className="h-5 w-5" /> Acompanhar novidades
          </a>
          <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gray-300-custom px-4 py-3 text-body14 font-semibold text-black-custom transition-colors hover:bg-gray-100-custom focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  </main>
);
