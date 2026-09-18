import type { ReactNode } from "react";
import { PreTitle } from "./PreTitle";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  preTitle?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  preTitle,
  title,
  description,
  align = "center",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const Tag = as;

  return (
    <div className={`flex w-full flex-col gap-4 ${alignment} ${className}`}>
      {preTitle && (
        <Reveal delay={0.1}>
          <PreTitle>{preTitle}</PreTitle>
        </Reveal>
      )}
      <Reveal delay={0.2} as={Tag} className={as === "h1" ? "t-h1 text-balance-tight" : "t-h2 text-balance-tight"}>
        {title}
      </Reveal>
      {description && (
        <Reveal delay={0.3} as="p" className="t-medium max-w-[54ch]">
          {description}
        </Reveal>
      )}
    </div>
  );
}
