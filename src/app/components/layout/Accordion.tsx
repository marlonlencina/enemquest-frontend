"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import SectionDescription from "./SectionDescription";
import SectionTitle from "./SectionTitle";

interface AccordionProps {
  title: string;
  description: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Accordion({
  title,
  description,
  children,
  defaultOpen = false,
  className = "",
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div
      className={` p-6 w-full bg-white-custom px-6 rounded-lg overflow-hidden transition-all ${className}`}
    >
      <button
        onClick={toggle}
        className="flex flex-row w-full cursor-pointer items-center justify-between gap-4 hover:opacity-60 transition-all"
      >
        <div>
          <SectionTitle className="text-start">{title}</SectionTitle>
          <SectionDescription className="text-start">
            {description}
          </SectionDescription>
        </div>
        <Icon
          icon={"lucide:chevron-right"}
          className={`text-body20 text-gray-500-custom ${
            isOpen ? "rotate-90" : ""
          } transition duration-150`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0.4, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}