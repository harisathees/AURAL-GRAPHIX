import type { LegalPage } from "@/lib/types";

export const legalPages: LegalPage[] = [
  {
    "slug": "privacy-policy",
    "title": "Privacy Policy",
    "updated": "2026-09-20",
    "content": [
      {
        "type": "paragraph",
        "text": "At <strong>Aural Graphix</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services."
      },
      {
        "type": "heading",
        "text": "1. Information we collect"
      },
      {
        "type": "paragraph",
        "text": "We may collect the following types of information:"
      },
      {
        "type": "list",
        "items": [
          "Personal Information (e.g., name, email address, phone number) — provided voluntarily through forms, contact requests, or newsletters.",
          "Project Information — details you share with us regarding your brand, business, or project requirements.",
          "Usage Data — such as IP address, browser type, pages visited, and time spent on the site (collected automatically via cookies or analytics tools)."
        ]
      },
      {
        "type": "heading",
        "text": "2. How we use your information"
      },
      {
        "type": "paragraph",
        "text": "We use the information we collect to:"
      },
      {
        "type": "list",
        "items": [
          "Respond to your inquiries or project requests",
          "Provide and improve our services",
          "Communicate important updates or offers",
          "Analyze website performance and user behavior",
          "Ensure legal compliance and prevent misuse"
        ]
      },
      {
        "type": "heading",
        "text": "3. Sharing your information"
      },
      {
        "type": "paragraph",
        "text": "We <strong>do not sell or trade</strong> your personal data. We may share your information with:"
      },
      {
        "type": "list",
        "items": [
          "Trusted third-party service providers (e.g., hosting, analytics, CRM tools) who assist in operating our business",
          "Law enforcement or government agencies if required by law"
        ]
      },
      {
        "type": "paragraph",
        "text": "All third-party services comply with applicable data protection laws."
      },
      {
        "type": "heading",
        "text": "4. Cookies & tracking technologies"
      },
      {
        "type": "paragraph",
        "text": "Our website uses cookies and similar technologies to enhance user experience and gather usage statistics. You can manage or disable cookies in your browser settings."
      },
      {
        "type": "heading",
        "text": "5. Data security"
      },
      {
        "type": "paragraph",
        "text": "We implement appropriate technical and organizational measures to safeguard your personal data from unauthorized access, alteration, or disclosure."
      },
      {
        "type": "heading",
        "text": "6. Your rights"
      },
      {
        "type": "paragraph",
        "text": "You have the right to:"
      },
      {
        "type": "list",
        "items": [
          "Access or update your personal information",
          "Request the deletion of your data",
          "Withdraw consent or opt out of communications"
        ]
      },
      {
        "type": "heading",
        "text": "7. Third-Party links"
      },
      {
        "type": "paragraph",
        "text": "Our website may contain links to third-party websites. We are not responsible for their content or privacy practices. We encourage you to review their privacy policies before sharing any data."
      },
      {
        "type": "heading",
        "text": "8. Changes to this policy"
      },
      {
        "type": "paragraph",
        "text": "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. We recommend checking back periodically to stay informed."
      },
      {
        "type": "heading",
        "text": "9. Contact us"
      },
      {
        "type": "paragraph",
        "text": "If you have any questions about this Privacy Policy or how we handle your data, please contact us at: Email: <strong>auralgraphix@gmail.com</strong>"
      }
    ]
  }
] as const;

export const getLegalPage = (slug: string) => legalPages.find((p) => p.slug === slug);
