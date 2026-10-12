"use client";
import { motion } from "framer-motion";
import { areas } from "./content";
import { Stagger, StaggerItem } from "./Reveal";

export const AreasStrip = () => (
  <section className="relative mx-auto max-w-6xl px-6 pb-24" aria-label="Áreas do conhecimento">
    <p className="text-center text-sm12 font-bold uppercase tracking-[0.18em] text-gray-400-custom">
      Todas as áreas da prova objetiva
    </p>
    <Stagger className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {areas.map((a) => (
        <StaggerItem key={a.code}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative h-full overflow-hidden rounded-xl border border-gray-300-custom bg-white-custom p-4 sm:p-5"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 ${a.color} origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
            />
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${a.color} text-sm14 font-extrabold text-white-custom`}
              >
                {a.code}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-black-custom leading-tight">{a.name}</p>
                <p className="text-sm12 text-gray-500-custom">
                  {a.competencias} competências · 30 habilidades
                </p>
              </div>
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  </section>
);
