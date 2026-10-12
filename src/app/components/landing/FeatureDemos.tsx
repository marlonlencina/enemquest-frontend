"use client";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef, useState, type MouseEvent } from "react";

/* -------------------------------------------------------------------------- */
/* Card com efeito "spotlight" que segue o mouse                              */
/* -------------------------------------------------------------------------- */

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export const BentoCard = ({ children, className = "" }: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative h-full overflow-hidden rounded-2xl border border-gray-300-custom bg-white-custom p-6 sm:p-7 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(10,85,153,0.25)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), rgba(246,118,156,0.08), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Demo do gerador de listas                                                  */
/* -------------------------------------------------------------------------- */

const genAreas = [
  { code: "LC", color: "bg-lc-exam" },
  { code: "CH", color: "bg-ch-exam" },
  { code: "CN", color: "bg-cn-exam" },
  { code: "MT", color: "bg-mt-exam" },
];
const strategies = ["Total", "Por área", "Específica"];

const genTimeline = [
  { areas: [] as string[], strategy: 0, skip: false, done: false },
  { areas: ["MT"], strategy: 0, skip: false, done: false },
  { areas: ["MT", "CN"], strategy: 0, skip: false, done: false },
  { areas: ["MT", "CN"], strategy: 1, skip: false, done: false },
  { areas: ["MT", "CN"], strategy: 1, skip: true, done: false },
  { areas: ["MT", "CN"], strategy: 1, skip: true, done: true },
  { areas: ["MT", "CN"], strategy: 1, skip: true, done: true },
];

export const GeneratorDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % genTimeline.length), 1100);
    return () => clearTimeout(t);
  }, [step, inView]);

  const s = genTimeline[step];

  return (
    <div ref={ref} className="rounded-xl border border-gray-200-custom bg-gray-100-custom p-4 sm:p-5">
      <p className="text-sm12 font-bold uppercase tracking-wider text-gray-400-custom">
        Selecione as matérias
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {genAreas.map((a) => {
          const on = s.areas.includes(a.code);
          return (
            <motion.div
              key={a.code}
              animate={{ scale: on ? 1 : 0.97 }}
              className={`flex h-11 items-center justify-center rounded-lg border text-sm14 font-bold transition-colors duration-300 ${
                on
                  ? `${a.color} border-transparent text-white-custom`
                  : "border-gray-300-custom bg-white-custom text-gray-500-custom"
              }`}
            >
              {a.code}
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 text-sm12 font-bold uppercase tracking-wider text-gray-400-custom">
        Quantidade
      </p>
      <div className="relative mt-3 grid grid-cols-3 rounded-lg bg-gray-200-custom p-1">
        {strategies.map((label, i) => (
          <div key={label} className="relative z-10 py-2 text-center text-sm12 sm:text-sm14 font-semibold">
            {s.strategy === i && (
              <motion.div
                layoutId="strategy-pill"
                className="absolute inset-0 -z-10 rounded-md bg-white-custom shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={s.strategy === i ? "text-black-custom" : "text-gray-500-custom"}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-sm14 font-semibold text-black-custom">
          Pular questões já respondidas
        </span>
        <div
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
            s.skip ? "bg-blue-primary" : "bg-gray-300-custom"
          }`}
        >
          <motion.span
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white-custom shadow"
            animate={{ left: s.skip ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <motion.div
          animate={s.done ? { scale: [1, 0.96, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="flex h-11 flex-1 items-center justify-center rounded-lg bg-pink-primary text-sm14 font-bold text-white-custom"
        >
          Gerar questões
        </motion.div>
        <div className="w-36 text-right">
          <AnimatePresence>
            {s.done && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm14 font-bold text-success"
              >
                +20 questões
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Anel de resultado                                                          */
/* -------------------------------------------------------------------------- */

export const ResultRing = ({ percent = 75 }: { percent?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => `${Math.round(v)}%`);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = useTransform(value, (v) => circumference - (v / 100) * circumference);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, percent, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, percent, value]);

  return (
    <div ref={ref} className="flex items-center gap-5">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#eff2f5" strokeWidth="10" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#198754"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset }}
          />
        </svg>
        <motion.span className="absolute inset-0 flex items-center justify-center text-head24 font-extrabold text-black-custom">
          {rounded}
        </motion.span>
      </div>
      <div className="flex flex-col gap-2 text-sm14">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-success" /> 15 acertos
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-failed" /> 5 erros
        </span>
        <span className="flex items-center gap-2 text-gray-500-custom">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300-custom" /> 20 questões
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Grade de revisão de respostas                                              */
/* -------------------------------------------------------------------------- */

const reviewAnswers = ["B", "D", "A", "E", "C", "B", null, "A", "D", "C"];

export const ReviewGrid = () => (
  <div className="grid grid-cols-5 gap-2">
    {reviewAnswers.map((ans, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.05 }}
        className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-center ${
          ans
            ? "border-blue-primary/30 bg-blue-primary/5"
            : "border-dashed border-pink-primary bg-pink-primary/5"
        }`}
      >
        <span className="text-[10px] font-semibold text-gray-400-custom">{i + 1}</span>
        <span className={`text-sm14 font-extrabold ${ans ? "text-blue-primary" : "text-pink-primary"}`}>
          {ans ?? "?"}
        </span>
      </motion.div>
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Mini ranking                                                               */
/* -------------------------------------------------------------------------- */

const rankingRows = [
  { pos: 1, name: "Ana Clara", user: "anaclara", initials: "AC", color: "bg-pink-primary" },
  { pos: 2, name: "João Pedro", user: "jpedro", initials: "JP", color: "bg-blue-primary" },
  { pos: 3, name: "Você", user: "voce", initials: "EU", color: "bg-cn-exam", me: true },
];

export const RankingMock = () => (
  <ul className="flex flex-col gap-2">
    {rankingRows.map((r, i) => (
      <motion.li
        key={r.pos}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 * i, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
          r.me
            ? "border-pink-primary/40 bg-pink-primary/5"
            : "border-gray-200-custom bg-white-custom"
        }`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm12 font-bold text-white-custom ${r.color}`}
        >
          {r.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm14 font-semibold text-black-custom">{r.name}</p>
          <p className="truncate text-sm12 text-blue-primary">@{r.user}</p>
        </div>
        <span className="text-body16 font-extrabold text-pink-primary">#{r.pos}</span>
      </motion.li>
    ))}
  </ul>
);
