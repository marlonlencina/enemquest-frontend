"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ListChecks, Sparkles, Trophy } from "lucide-react";
import { CtaLink } from "./CtaLink";
import { QuestionDemo } from "./QuestionDemo";

const ease = [0.22, 1, 0.36, 1] as const;

const headline = ["Treine", "com", "questões", "reais", "do", "ENEM."];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Fundo: grade + manchas de cor animadas */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dee1e3_1px,transparent_1px),linear-gradient(to_bottom,#dee1e3_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-60" />
        <motion.div
          className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-pink-primary/25 blur-[100px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 -right-24 h-[460px] w-[460px] rounded-full bg-blue-primary/20 blur-[110px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-16 md:pb-32 grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.a
            href="#comunidade"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="group inline-flex items-center gap-2 rounded-full border border-gray-300-custom bg-white-custom/80 backdrop-blur py-1 pl-1 pr-4 text-sm14 font-semibold text-black-custom shadow-sm hover:border-pink-primary/50 transition-colors"
          >
            <span className="flex items-center gap-1 rounded-full bg-pink-primary px-2.5 py-0.5 text-sm12 font-bold text-white-custom">
              <Sparkles className="h-3 w-3" /> Beta
            </span>
            Venha construir com a gente
          </motion.a>

          <h1 className="mt-6 text-head40 sm:text-head56 lg:text-head64 font-extrabold leading-[1.05] tracking-tight text-black-custom">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="relative inline-block bg-linear-to-r from-pink-primary via-pink-primary-dark to-blue-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
            >
              Do seu jeito.
              <motion.svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 9 C 80 2, 220 2, 298 7"
                  fill="none"
                  stroke="#f6769c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-body18 leading-relaxed text-gray-500-custom"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease }}
          >
            Monte listas com questões oficiais de provas anteriores, filtre por
            competência e habilidade e descubra exatamente onde você precisa
            melhorar.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease }}
          >
            <CtaLink href="/auth/signup" arrow>
              Começar a treinar
            </CtaLink>
            <CtaLink href="#como-funciona" variant="secondary">
              Ver como funciona
            </CtaLink>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm14 font-medium text-gray-500-custom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {["Grátis durante o beta", "Login com Google", "Sem cartão de crédito"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <QuestionDemo />

          {/* Cartões flutuantes */}
          <motion.div
            className="absolute -left-6 sm:-left-12 top-10 hidden sm:flex items-center gap-3 rounded-xl bg-white-custom border border-gray-300-custom px-4 py-3 shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-primary/10 text-blue-primary">
              <ListChecks className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm12 text-gray-500-custom">Lista gerada</p>
              <p className="text-sm14 font-bold text-black-custom">20 questões</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-4 sm:-right-10 -bottom-10 hidden sm:flex items-center gap-3 rounded-xl bg-white-custom border border-gray-300-custom px-4 py-3 shadow-lg"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-primary/15 text-pink-primary-dark">
              <Trophy className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm12 text-gray-500-custom">Seu aproveitamento</p>
              <p className="text-sm14 font-bold text-black-custom">
                85% <span className="text-success font-semibold">de acertos</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
