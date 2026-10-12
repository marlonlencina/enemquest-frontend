"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export const AuthCard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 0, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reducedMotion ? 0.4 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-[552px] bg-white"
    >
      <motion.div
        initial={false}
        animate={reducedMotion ? { y: 0, scale: 1 } : { y: [36, 0], scale: [0.97, 1] }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
