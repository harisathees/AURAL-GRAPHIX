"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { socialIcons } from "@/components/ui/Icons";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.1 }}
      >
        <nav
          aria-label="Main"
          className="flex w-full max-w-[400px] min-w-0 items-stretch overflow-hidden rounded-xl border border-white bg-white/85 shadow-[0_10px_30px_-18px_rgb(6_6_18/0.35)] backdrop-blur-xl"
        >
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-1.5 px-3 py-2.5 transition-opacity hover:opacity-70 sm:gap-2 sm:px-4 sm:py-3"
            aria-label={`${site.name} — home`}
          >
            <Image
              src="/assets/logo-mark.webp"
              alt=""
              width={28}
              height={28}
              priority
              className="h-[22px] w-auto shrink-0 sm:h-7"
            />
            <Image
              src="/assets/logo-wordmark.webp"
              alt={site.name}
              width={110}
              height={29}
              priority
              className="h-[13px] w-auto min-w-0 shrink sm:h-[18px]"
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid w-11 shrink-0 place-items-center border-x border-midnight-10 transition-colors hover:bg-mist sm:w-14"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 block h-[1.6px] w-full rounded bg-midnight"
                animate={open ? { top: 5, rotate: 45 } : { top: 1, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
              />
              <motion.span
                className="absolute left-0 block h-[1.6px] w-full rounded bg-midnight"
                animate={open ? { top: 5, rotate: -45 } : { top: 9, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
              />
            </span>
          </button>

          <div className="flex shrink-0 items-center px-2 sm:px-3">
            <Button
              href="/contact-us"
              variant="dark"
              size="sm"
              className="h-8 px-3 text-[12px] sm:h-9 sm:px-4 sm:text-[13px]"
            >
              Get started
            </Button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-midnight/25 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="site-menu"
              className="fixed inset-x-3 top-[70px] z-50 mx-auto max-w-[400px] overflow-hidden rounded-2xl border border-white bg-white shadow-[0_24px_60px_-24px_rgb(6_6_18/0.4)] sm:inset-x-4 sm:top-[88px]"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
            >
              <ul className="flex flex-col p-2">
                {nav.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`t-nav flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors sm:py-3 ${
                          active ? "bg-mist text-brand" : "text-midnight hover:bg-mist"
                        }`}
                      >
                        {item.label}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-30">
                          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between gap-4 border-t border-midnight-10 px-5 py-4">
                <p className="t-sm">© {new Date().getFullYear()} {site.name}</p>
                <ul className="flex items-center gap-1.5">
                  {site.socials.map((s) => {
                    const Icon = socialIcons[s.icon];
                    return (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          className="grid size-8 place-items-center rounded-md border border-midnight-10 text-midnight transition-colors hover:bg-midnight hover:text-white"
                        >
                          <Icon className="size-4" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
