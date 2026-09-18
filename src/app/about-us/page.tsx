import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Counter } from "@/components/ui/Counter";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreValues, stats, team } from "@/data/content";
import { site } from "@/data/site";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { socialIcons } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "About us — the studio behind the work",
  description:
    "Aural Graphix is a multidisciplinary creative agency in Madurai building thoughtful, scalable digital solutions — strategy-led branding, UI/UX design and web development.",
  path: "/about-us",
  keywords: ["about Aural Graphix", "design studio Madurai", "creative team", "brand strategy agency"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About us", path: "/about-us" },
        ])}
      />

      {/* Hero */}
      <section className="relative w-full px-5 pt-[150px] pb-4 sm:pt-[180px] lg:pt-[210px]">
        <div className="container-x mx-auto max-w-[1060px]">
          <SectionHeading preTitle="About us" title="Who we are" as="h1" className="mb-10" />

          <Reveal delay={0.3} className="shell grid gap-5 lg:grid-cols-2">
            <article className="card flex flex-col justify-between gap-8 p-6 lg:p-8">
              <h2 className="t-h4 text-balance-tight">A studio built on clarity, craft and commitment</h2>
              <div className="flex flex-col items-start gap-6">
                <span className="h-px w-full bg-midnight-10" aria-hidden />
                <p className="t-body max-w-[46ch]">
                  We&rsquo;re a multidisciplinary agency creating thoughtful, scalable digital solutions,
                  starting every project with a clear understanding of your goals, audience, and challenges.
                </p>
                <Button href="/contact-us" variant="brand">
                  Start a project
                </Button>
              </div>
            </article>

            <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-mist lg:min-h-[340px]">
              <Image
                src="/assets/team/praveen-gunal.webp"
                alt="The Aural Graphix team"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container-x mx-auto max-w-[1060px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-4">
              <Reveal delay={0.1}>
                <PreTitle>Our mission</PreTitle>
              </Reveal>
              <Reveal as="h2" delay={0.2} className="t-h2 max-w-[18ch] text-balance-tight">
                Designed to elevate brands with meaning
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative overflow-hidden rounded-2xl bg-brand-deep">
              <Image
                src="/assets/mission.webp"
                alt=""
                width={1600}
                height={535}
                sizes="(max-width: 1024px) 100vw, 1060px"
                className="h-full w-full object-cover"
              />

              <div className="inset-y-6 right-6 w-[280px] rounded-xl border border-white bg-white p-5 max-lg:m-5 lg:absolute lg:w-[300px]">
                <h3 className="t-h6">Core Values</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {coreValues.map((value) => (
                    <li key={value} className="flex items-center gap-2.5">
                      <Image src="/assets/check.webp" alt="" width={16} height={16} className="size-4 shrink-0" />
                      <span className="t-sm text-midnight">{value}</span>
                    </li>
                  ))}
                </ul>
                <p className="t-sm mt-5 border-t border-dashed border-midnight-10 pt-4">
                  © {site.legalName}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container-x mx-auto max-w-[1060px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-4">
              <Reveal delay={0.1}>
                <PreTitle>Stats</PreTitle>
              </Reveal>
              <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
                Impact in numbers
              </Reveal>
            </div>

            <Reveal delay={0.3} className="shell grid gap-5 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.title} delay={0.35 + i * 0.07} as="article" className="card flex flex-col gap-5 p-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="t-h6">{stat.title}</h3>
                    <p className="t-sm">{stat.description}</p>
                  </div>
                  <span className="h-px w-full bg-midnight-10" aria-hidden />
                  <div className="flex items-end justify-between gap-3">
                    <p className="t-h2 tabular-nums">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <span className="flex gap-1.5 pb-2" aria-hidden>
                      {Array.from({ length: 3 }).map((_, k) => (
                        <span
                          key={k}
                          className={`size-1.5 rounded-full ${k === 2 ? "bg-midnight" : "bg-midnight-18"}`}
                        />
                      ))}
                    </span>
                  </div>
                </Reveal>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container-x mx-auto max-w-[1060px]">
          <SectionHeading preTitle="Team" title="People behind the work" className="mb-8" />

          <Reveal delay={0.3} className="shell grid gap-5 md:grid-cols-3">
            <div className="flex flex-col gap-5">
              <TeamCard member={team[0]} />
              <TeamCard member={team[2]} />
            </div>
            <TeamCard member={team[1]} featured />
            <div className="flex flex-col gap-5">
              <TeamCard member={team[3]} />
              <TeamCard member={team[4]} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function TeamCard({
  member,
  featured = false,
}: {
  member: (typeof team)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={`card group relative flex overflow-hidden ${
        featured ? "min-h-[320px] flex-col justify-end p-0 md:min-h-full" : "items-center gap-4 p-4"
      }`}
    >
      {featured ? (
        <>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 90vw, 340px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="relative z-2 m-4 rounded-lg border border-white bg-white/95 p-4 backdrop-blur-sm">
            <h3 className="t-h6">{member.name}</h3>
            <p className="t-pretitle mt-1">{member.role}</p>
            <SocialRow name={member.name} />
          </div>
        </>
      ) : (
        <>
          <div className="relative size-[86px] shrink-0 overflow-hidden rounded-md bg-mist">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="86px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="t-h6 truncate">{member.name}</h3>
            <p className="t-pretitle">{member.role}</p>
            <SocialRow name={member.name} />
          </div>
        </>
      )}
    </article>
  );
}

function SocialRow({ name }: { name: string }) {
  const links = site.socials.filter((s) => s.icon !== "facebook");
  return (
    <ul className="mt-3 flex items-center gap-1.5">
      {links.map((s) => {
        const Icon = socialIcons[s.icon];
        return (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on ${s.name}`}
              className="grid size-7 place-items-center rounded-md bg-midnight text-white transition-colors hover:bg-brand"
            >
              <Icon className="size-3.5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
