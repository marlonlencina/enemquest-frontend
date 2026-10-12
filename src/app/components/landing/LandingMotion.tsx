"use client";
import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/** Respeita a preferência do sistema por menos movimento (prefers-reduced-motion). */
export const LandingMotion = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
