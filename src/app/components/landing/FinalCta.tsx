"use client";
import { motion } from "framer-motion";
import { CtaLink } from "./CtaLink";
import { Reveal } from "./Reveal";

const letters = ["A", "B", "C", "D", "E"];

export const FinalCta = () => (
  <section className="mx-auto max-w-6xl px-6 py-24">
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-primary via-blue-primary-dark to-[#073f73] px-6 py-20 text-center sm:px-16">
        {/* Letras de alternativa flutuando ao fundo */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {letters.map((l, i) => (
            <motion.span
              key={l}
              className="absolute flex h-14 w-14 items-center justify-center rounded-xl border border-white-custom-25 bg-white-custom-10 text-head24 font-extrabold text-white-custom-40"
              style={{ left: `${8 + i * 20}%`, top: i % 2 === 0 ? "14%" : "68%" }}
              animate={{ y: [0, i % 2 === 0 ? 14 : -14, 0], rotate: [0, i % 2 ? 6 : -6, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {l}
            </motion.span>
          ))}
          <div className="absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-pink-primary/30 blur-[90px]" />
        </div>

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-head32 sm:text-head48 font-extrabold leading-tight tracking-tight text-white-custom">
            Sua próxima questão certa começa agora.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body16 sm:text-body18 text-white/80">
            Crie sua conta gratuita, gere sua primeira lista e descubra hoje onde
            focar seus estudos.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <CtaLink href="/auth/signup" arrow>
              Criar conta grátis
            </CtaLink>
            <CtaLink href="/auth/login" variant="ghost-light">
              Já tenho conta
            </CtaLink>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);
