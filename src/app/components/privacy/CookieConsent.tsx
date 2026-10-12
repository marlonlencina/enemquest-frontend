"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getMarketingConsent,
  MarketingConsent,
  OPEN_PRIVACY_SETTINGS_EVENT,
  PRIVACY_CONSENT_EVENT,
  PRIVACY_CONSENT_KEY,
} from "@/config/privacyConsent";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getMarketingConsent() === null);
    const reopen = () => setVisible(true);
    const sync = (event: StorageEvent) => {
      if (event.key === PRIVACY_CONSENT_KEY || event.key === null) {
        setVisible(getMarketingConsent() === null);
      }
    };
    window.addEventListener(OPEN_PRIVACY_SETTINGS_EVENT, reopen);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(OPEN_PRIVACY_SETTINGS_EVENT, reopen);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const choose = (consent: MarketingConsent) => {
    try {
      window.localStorage.setItem(PRIVACY_CONSENT_KEY, consent);
    } catch {
      // Still respect the choice in this page when browser storage is blocked.
    }
    window.dispatchEvent(new CustomEvent(PRIVACY_CONSENT_EVENT, { detail: consent }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside aria-labelledby="cookie-consent-title" className="landing-page fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[10000] mx-auto max-h-[calc(100dvh-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-gray-300-custom bg-white-custom p-5 text-black-custom shadow-[0_12px_48px_rgba(9,10,10,0.2)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:mx-0 sm:w-[calc(100%-3rem)] sm:p-6">
      <div className="flex items-center gap-3">
        <ShieldCheck aria-hidden className="h-5 w-5 shrink-0 text-blue-primary" />
        <h2 id="cookie-consent-title" className="text-body18 font-extrabold">Privacidade e anúncios</h2>
      </div>
      <p className="mt-3 text-body14 leading-relaxed text-gray-500-custom">
        Com sua permissão, usamos pixels de marketing para medir visitas e cliques nos botões de download. Você pode recusar sem perder o acesso ao site.
      </p>
      <Link href="/politicas-e-termos#privacidade" className="mt-3 inline-flex min-h-8 items-center text-body14 font-semibold text-blue-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary">Política de Privacidade</Link>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose("rejected")} className="min-h-12 rounded-lg border border-gray-300-custom px-4 py-3 text-body14 font-semibold hover:bg-gray-100-custom focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary">Recusar</button>
        <button type="button" onClick={() => choose("accepted")} className="min-h-12 rounded-lg bg-blue-primary px-4 py-3 text-body14 font-semibold text-white-custom hover:bg-blue-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary">Aceitar cookies</button>
      </div>
    </aside>
  );
};
