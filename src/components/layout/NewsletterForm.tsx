"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("done");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoComplete="email"
        className="h-11 w-full max-w-[220px] rounded-lg border border-midnight-10 bg-white px-3.5 text-[14px] text-midnight outline-none transition-colors placeholder:text-midnight-30 focus:border-brand"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand text-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        <ArrowRight className="size-[18px]" />
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {state === "done" ? "Subscribed" : ""}
      </p>
    </form>
  );
}
