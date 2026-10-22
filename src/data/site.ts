export const site = {
  name: "Aural Graphix",
  legalName: "Aural Graphix Creative Agency",
  tagline: "We design brands that move people",
  description:
    "Aural Graphix is a creative design agency combining strategy, design, and technology to help ambitious brands stand out and create meaningful digital experiences.",
  shortDescription: "Crafting digital solutions that move your business forward.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://auralgraphix.com",
  locale: "en_IN",
  email: "auralgraphix@gmail.com",
  phones: ["+91 86102 76718", "+91 99421 53378"],
  phoneDisplay: "91+ 86102 76718, 99421 53378",
  phoneHref: "tel:+918610276718",
  address: {
    street: "Othakadai",
    city: "Madurai",
    region: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
    postalCode: "625107",
    display: "Othakadai, Madurai, Tamil Nadu, India",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Othakadai+Madurai+Tamil+Nadu+India",
  },
  founded: "2024",
  bookingUrl: "https://cal.com/",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/share/1MpsjsH3td/", icon: "facebook" },
    { name: "Instagram", href: "https://www.instagram.com/auralgraphix?dlrf=MWN3b3Z1MjJidG15cQ==", icon: "instagram" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/aural-graphix-0875b9444?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "linkedin" },
    { name: "X", href: "https://x.com/AURALGRAPHIX", icon: "x" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export const footerLinks = {
  quick: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about-us" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
  secondary: [
    { label: "Contact us", href: "/contact-us" },
    { label: "Privacy Policy", href: "/legal-pages/privacy-policy" },
    { label: "Error 404", href: "/404" },
  ],
} as const;
