"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ListPlus, PenLine, UserPlus } from "lucide-react";
import { useRef } from "react";
import { steps } from "./content";
import { StudyDeviceNotice } from "./StudyDeviceNotice";
import { CtaLink } from "./CtaLink";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons = [UserPlus, ListPlus, PenLine];

export const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="como-funciona" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Como funciona"
            title="Do cadastro à primeira lista em poucos minutos"
            description="Sem configuração complicada. Você entra, escolhe o que quer treinar e já começa a resolver."
          />
          <Reveal delay={0.1} className="mt-8">
            <CtaLink href="/auth/signup" arrow>
              Criar conta grátis
            </CtaLink>
            <StudyDeviceNotice className="mt-4" />
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          {/* Trilho + progresso */}
          <div aria-hidden className="absolute left-6 top-6 bottom-6 w-[2px] bg-gray-300-custom" />
          <motion.div
            aria-hidden
            className="absolute left-6 top-6 bottom-6 w-[2px] origin-top bg-linear-to-b from-pink-primary to-blue-primary"
            style={{ scaleY: progress }}
          />

          <ol className="flex flex-col gap-10">
            {steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <motion.li
                  key={s.title}
                  className="relative flex gap-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-gray-100-custom bg-blue-primary text-white-custom shadow-lg">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1 rounded-2xl border border-gray-300-custom bg-white-custom p-6">
                      <span className="text-sm12 font-bold text-pink-primary">
                        Passo {i + 1}
                      </span>
                      <h3 className="mt-1 text-body20 font-extrabold text-black-custom">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-body16 leading-relaxed text-gray-500-custom">
                        {s.description}
                      </p>
                    </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
