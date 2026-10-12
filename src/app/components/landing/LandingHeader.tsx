"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
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
            className="lg:hidden overflow-hidden bg-white-custom"
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
  );
};
