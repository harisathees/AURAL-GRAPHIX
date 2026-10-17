"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "invalid" | "error";

/**
 * The site is a static export, so there is no server to post to. Submissions go
 * straight to whichever form backend you point this at (Formspree, Getform,
 * Basin, a Worker of your own). Must be inlined at build time, hence NEXT_PUBLIC_.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

/** Mirrors the checks the old /api/contact route did, now client-side. */
function validate(data: Record<string, string>) {
  const errors: string[] = [];
  if (data.name.trim().length < 2) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.push("email");
  if (data.phone.replace(/\D/g, "").length < 7) errors.push("phone");
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (validate(data).length) {
      setStatus("invalid");
      return;
    }

    if (!ENDPOINT) {
      console.error("NEXT_PUBLIC_CONTACT_ENDPOINT is not set — nowhere to send this.");
      setStatus("error");
      return;
    }

    
    setStatus("sending");

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          submittedAt: new Date().toISOString(),
        }),
      });

      // A no-cors response cannot confirm server-side success.
      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("Contact submission failed:", error);
      setStatus("error");
    }

  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate={false}>
      <Field id="name" label="Name" required autoComplete="name" />
      <Field id="email" label="Email" type="email" required autoComplete="email" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone" type="tel" required autoComplete="tel" />
        <Field id="company" label="Company" autoComplete="organization" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="t-pretitle">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Write what's on your mind"
          className="w-full resize-y rounded-lg border border-midnight-10 bg-white px-4 py-3 text-[15px] text-midnight outline-none transition-colors placeholder:text-midnight-30 focus:border-brand"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="brand" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send a message"}
        </Button>

        <p role="status" aria-live="polite" className="t-sm">
          {status === "sent" && "Thanks — we'll be in touch shortly."}
          {status === "invalid" && "Please check your name, email and phone number."}
          {status === "error" && "Something went wrong. Please email us directly."}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-pretitle">
        {label}
        {required && <span aria-hidden>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-lg border border-midnight-10 bg-white px-4 text-[15px] text-midnight outline-none transition-colors placeholder:text-midnight-30 focus:border-brand"
      />
    </div>
  );
}
