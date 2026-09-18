"use client";

import { motion } from "motion/react";
import { charReveal, inView, stagger } from "@/lib/motion";

interface ScriptTextProps {
  text: string;
  className?: string;
  delay?: number;
  onMount?: boolean;
}

/**
 * The handwritten accent labels ("Schedule a free call now", "Let's get started"…).
 * Reproduces the source text effect: character tokenization, blur-in, 0.7s delay.
 */
export function ScriptText({ text, className = "", delay = 0.7, onMount = false }: ScriptTextProps) {
  const words = text.split(" ");

  return (
    <motion.p
      className={`t-script ${className}`}
      variants={stagger(0.022, delay)}
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible", viewport: inView })}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {[...word].map((char, ci) => (
            <motion.span key={`${char}-${ci}`} variants={charReveal} className="inline-block" aria-hidden>
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.p>
  );
}
