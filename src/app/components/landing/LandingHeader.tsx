"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, Wrench, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AUTH_MAINTENANCE_ENABLED } from "@/config/maintenance";
import { WHATSAPP_COMMUNITY_URL } from "./content";
import { Logo } from "../layout/Logo";
import { navLinks } from "./content";
import { CtaLink } from "./CtaLink";

export const LandingHeader = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Trava o scroll do body com o menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      {AUTH_MAINTENANCE_ENABLED && (
        <div role="status" className="border-b border-white/10 bg-blue-primary-dark px-4 py-2 text-white-custom sm:py-3">
          <div className="mx-auto flex max-w-6xl items-start gap-2.5 sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 sm:mt-0 sm:h-auto sm:w-auto sm:bg-transparent">
              <Wrench aria-hidden className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
            <div className="min-w-0 flex-1 sm:flex sm:flex-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3 sm:gap-y-1">
              <p className="text-sm12 leading-relaxed sm:text-body14">
                <strong className="block font-bold sm:inline">Estamos em manutenção.<span className="hidden sm:inline"> </span></strong>
                <span className="text-white/85 sm:hidden">Login e cadastro indisponíveis no momento.</span>
                <span className="hidden sm:inline">Login e cadastro estão temporariamente indisponíveis.</span>
              </p>
              <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="-ml-1 mt-0.5 inline-flex min-h-8 items-center gap-1 rounded px-1 text-sm12 font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:ml-0 sm:mt-0 sm:min-h-0 sm:text-body14">
                <span className="sm:hidden">Novidades no WhatsApp</span>
                <span className="hidden sm:inline">Acompanhe as novidades</span>
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      )}
    <header
      className={`relative w-full transition-all duration-300 ${
        scrolled || open
          ? "bg-white-custom/85 backdrop-blur-md border-b border-gray-300-custom/70 shadow-[0_1px_12px_rgba(9,10,10,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" aria-label="ENEM Quest - início" className="shrink-0">
          <Logo height={28} logoTextColor="#090a0a" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-4 py-2 text-body14 font-semibold text-gray-500-custom transition-colors hover:text-black-custom hover:bg-gray-200-custom/60"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/auth/login"
            className="rounded-md px-4 py-2 text-body14 font-semibold text-black-custom transition-colors hover:bg-gray-200-custom/60"
          >
            Entrar
          </Link>
          <CtaLink href="/auth/signup" size="md" arrow>
            Criar conta grátis
          </CtaLink>
        </div>

        <button
          type="button"
          className="lg:hidden -mr-2 flex h-10 w-10 items-center justify-center rounded-md text-black-custom hover:bg-gray-200-custom"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Barra de progresso de leitura */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-linear-to-r from-pink-primary to-blue-primary"
        style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden max-h-[calc(100dvh-12rem)] overflow-y-auto bg-white-custom"
          >
            <nav className="flex flex-col gap-1 px-6 pt-4 pb-8" aria-label="Menu mobile">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="rounded-md px-3 py-4 text-head24 font-bold text-black-custom border-b border-gray-200-custom"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <CtaLink href="/auth/signup" arrow>
                  Criar conta grátis
                </CtaLink>
                <CtaLink href="/auth/login" variant="secondary">
                  Já tenho conta
                </CtaLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </div>
  );
};
