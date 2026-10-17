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
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-4 md:pt-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.1 }}
      >
        {/* ── MOBILE NAV (below 768px) ── */}
        <nav
          aria-label="Main"
          className="flex h-12 w-full max-w-[300px] items-stretch overflow-hidden rounded-[16px] bg-[#fdfdfd] shadow-[0_8px_24px_rgba(0,0,0,0.07)] md:hidden"
        >
          {/* Section 1: Logo — flex:1, pl-3, h-28px */}
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center pl-3 transition-opacity hover:opacity-70"
            aria-label={`${site.name} — home`}
          >
            <Image
              src="/assets/aural graphix logo.png"
              alt=""
              width={28}
              height={28}
              priority
              className="h-7 w-auto shrink-0 object-contain"
            />
            <Image
              src="/assets/logo-wordmark.webp"
              alt={site.name}
              width={110}
              height={29}
              priority
              className="ml-1.5 h-[17px] w-auto shrink object-contain"
            />
          </Link>

          {/* Section 2: Hamburger — 48px square, dividers on both sides */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex w-12 shrink-0 items-center justify-center border-x border-[#e6e6e6] transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2f2f]"
          >
            {/* 2 lines: 18px wide, 2px thick, 7px gap */}
            <span className="relative block h-[11px] w-[22px]">
              <motion.span
                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-black"
                animate={open ? { top: 4.5, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
              />
              <motion.span
                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-black"
                animate={open ? { top: 4.5, rotate: -45 } : { top: 9, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
              />
            </span>
          </button>

          {/* Section 3: CTA — h-32px, px-14px, 13px text */}
          <div className="flex items-center px-2">
            <Link
              href="/contact-us"
              className="flex h-8 items-center whitespace-nowrap rounded-[10px] bg-[#2f2f2f] px-[14px] text-[13px] font-medium leading-none text-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-85"
            >
              Get started
            </Link>
          </div>
        </nav>

        {/* ── DESKTOP NAV (768px and above) ── */}
        <nav
          aria-label="Main"
          className="hidden w-fit min-w-0 items-stretch justify-center overflow-hidden rounded-xl border border-white bg-white/90 shadow-[0_10px_30px_-18px_rgb(6_6_18/0.35)] backdrop-blur-xl md:flex"
        >
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 px-4 py-3 transition-opacity hover:opacity-70"
            aria-label={`${site.name} — home`}
          >
            <Image
              src="/assets/aural graphix logo.png"
              alt=""
              width={28}
              height={28}
              priority
              className="h-7 w-auto shrink-0"
            />
            <Image
              src="/assets/logo-wordmark.webp"
              alt={site.name}
              width={110}
              height={29}
              priority
              className="h-[18px] w-auto min-w-0 shrink"
            />
          </Link>

          <div className="flex items-stretch">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid w-14 shrink-0 place-items-center border-x border-midnight-10 transition-colors hover:bg-mist"
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

            <div className="flex shrink-0 items-center px-3">
              <Button
                href="/contact-us"
                variant="dark"
                size="sm"
                className="h-9 px-4 text-[13px]"
              >
                Get started
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Dropdown menu — shared across both navs */}
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
              className="fixed inset-x-4 top-[72px] z-50 mx-auto max-w-[480px] max-h-[calc(100dvh-88px)] overflow-y-auto no-scrollbar rounded-2xl border border-white bg-white shadow-[0_24px_60px_-24px_rgb(6_6_18/0.4)] md:max-w-[390px] md:top-[88px]"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
            >
              <ul className="flex flex-col px-5 pt-2">
                {nav.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                      className="border-b border-dashed border-midnight-10"
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`t-nav flex w-full items-center py-3.5 transition-colors ${
                          active ? "text-slate" : "text-midnight hover:text-brand"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="p-4 md:hidden">
                <Button href="/contact-us" variant="brand" className="w-full">
                  Get started
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-midnight-05 px-5 py-3.5">
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
                          className="grid size-8 place-items-center rounded-lg bg-mist text-midnight transition-colors hover:bg-midnight hover:text-white"
                        >
                          <Icon className="size-4" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <p className="t-sm text-slate">© {new Date().getFullYear()} {site.name}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
