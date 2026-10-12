"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { enemNumbers } from "./content";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const Counter = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
};

export const EnemNumbers = () => (
  <section className="relative overflow-hidden bg-blue-primary-dark">
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(246,118,156,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(13,123,223,0.5),transparent_45%)]"
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
    />
    <div className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        dark
        eyebrow="Organizado como o ENEM cobra"
        title="A prova tem uma estrutura. Seu estudo também deveria ter."
        description="O ENEM é construído a partir de uma Matriz de Referência. O ENEM Quest organiza cada questão nessa mesma lógica, para você saber exatamente o que está treinando."
      />
      <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white-custom-10 bg-white-custom-10 lg:grid-cols-4">
        {enemNumbers.map((n) => (
          <StaggerItem key={n.label} className="bg-blue-primary-dark/80 p-6 sm:p-8 text-center backdrop-blur">
            <p className="text-head40 sm:text-head56 font-extrabold text-white-custom tabular-nums">
              <Counter to={n.value} />
            </p>
            <p className="mt-1 text-sm14 sm:text-body16 text-white/70">{n.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
