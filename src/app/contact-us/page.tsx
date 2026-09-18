import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { faqs } from "@/data/content";
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact us — start a conversation",
  description:
    "Got an idea worth bringing to life? Talk to Aural Graphix about branding, UI/UX design, web development and digital marketing. Based in Madurai, working worldwide.",
  path: "/contact-us",
  keywords: ["contact Aural Graphix", "hire design agency", "brand design enquiry", "Madurai design studio"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact us", path: "/contact-us" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <section className="relative w-full px-5 pt-[150px] pb-4 sm:pt-[180px] lg:pt-[210px]">
        <div className="container-x mx-auto max-w-[1060px]">
          <SectionHeading preTitle="Let's connect" title="Contact us" as="h1" className="mb-10" />

          <Reveal delay={0.3} className="shell grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            {/* Details */}
            <div className="card flex flex-col justify-between gap-8 p-6">
              <div className="flex flex-col gap-5">
                <h2 className="t-h5">Start a Conversation</h2>
                <dl className="flex flex-col gap-3">
                  <Row label="Call on">
                    <a href={site.phoneHref} className="transition-colors hover:text-brand">
                      {site.phoneDisplay}
                    </a>
                  </Row>
                  <Row label="Email on">
                    <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
                      {site.email}
                    </a>
                  </Row>
                  <Row label="Address">
                    <a
                      href={site.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brand"
                    >
                      {site.address.display}
                    </a>
                  </Row>
                </dl>
              </div>

              <div className="flex flex-col gap-4">
                <span className="h-px w-full border-t border-dashed border-midnight-10" aria-hidden />
                <p className="t-body">
                  Got an idea worth bringing to life? Let&rsquo;s turn it into design that speaks, connects,
                  and stands out. Start a conversation with {site.name}.
                </p>
                <p className="t-pretitle">
                  Praveen Gunal <span className="font-normal normal-case tracking-normal">— Founder</span>
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="card p-6">
              <h2 className="sr-only">Contact form</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
      <CtaBanner />
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <dt className="t-pretitle">{label}:</dt>
      <dd className="text-[15px] font-medium text-midnight">{children}</dd>
    </div>
  );
}
