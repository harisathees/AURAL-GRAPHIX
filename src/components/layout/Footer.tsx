import Image from "next/image";
import Link from "next/link";
import { footerLinks, site } from "@/data/site";
import { socialIcons } from "@/components/ui/Icons";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 w-full lg:mt-32">
      <div className="container-x mx-auto max-w-[1060px] pb-10">
        <div className="grid gap-10 border-t border-midnight-10 pt-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 lg:gap-12">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label={`${site.name} — home`} className="w-fit transition-opacity hover:opacity-70">
              <Image src="/assets/logo-black.webp" alt={site.name} width={130} height={87} className="h-14 w-auto" />
            </Link>
            <p className="t-sm max-w-[30ch]">{site.shortDescription}</p>
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-medium tracking-[-0.02em]">Updates that keep you ahead</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="flex flex-col gap-4">
            <h2 className="t-pretitle">Quick links</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <ul className="flex flex-col gap-3">
                {footerLinks.quick.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3">
                {footerLinks.secondary.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="t-pretitle">Get in touch</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={site.phoneHref} className="t-sm text-midnight transition-colors hover:text-brand">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="t-sm text-midnight transition-colors hover:text-brand">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-sm max-w-[22ch] text-midnight transition-colors hover:text-brand"
                >
                  {site.address.display}
                </a>
              </li>
            </ul>

            <h2 className="t-pretitle mt-2">Follow us on</h2>
            <ul className="flex items-center gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="grid size-9 place-items-center rounded-lg bg-midnight text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-dashed border-midnight-10 pt-6 sm:flex-row">
          <p className="t-sm">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <Link href="/legal-pages/privacy-policy" className="t-sm transition-colors hover:text-brand">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="t-sm text-midnight transition-colors hover:text-brand">
      {children}
    </Link>
  );
}
