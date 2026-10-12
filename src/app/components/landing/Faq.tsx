"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "./content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-gray-300-custom bg-white-custom">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="Ficou alguma pergunta?"
        />
        <Reveal className="mt-12">
          <ul className="divide-y divide-gray-300-custom border-y border-gray-300-custom">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const id = `faq-panel-${i}`;
              return (
                <li key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-body16 sm:text-body18 font-bold text-black-custom">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-pink-primary text-white-custom"
                          : "bg-gray-200-custom text-black-custom"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-body16 leading-relaxed text-gray-500-custom">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
