import { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) => (
  <Reveal
    className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
  >
    <span
      className={`text-sm12 font-bold uppercase tracking-[0.18em] ${
        dark ? "text-pink-primary-light" : "text-pink-primary"
      }`}
    >
      {eyebrow}
    </span>
    <h2
      className={`mt-3 text-head32 md:text-head40 font-extrabold leading-tight tracking-tight ${
        dark ? "text-white-custom" : "text-black-custom"
      }`}
    >
      {title}
    </h2>
    {description && (
      <p
        className={`mt-4 text-body16 md:text-body18 leading-relaxed ${
          dark ? "text-white/70" : "text-gray-500-custom"
        }`}
      >
        {description}
      </p>
    )}
  </Reveal>
);
