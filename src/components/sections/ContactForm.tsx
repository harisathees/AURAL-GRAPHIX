"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
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
