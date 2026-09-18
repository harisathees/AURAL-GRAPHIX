import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8z" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </svg>
);

export const LinkedinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M6.94 8.5H4.1V20h2.84zM5.52 4a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3M20 13.68c0-3.2-1.7-4.69-3.98-4.69-1.83 0-2.65 1.01-3.11 1.72V8.5H10.1c.04.8 0 11.5 0 11.5h2.81v-6.42c0-.26.02-.51.1-.69.2-.5.66-1.03 1.44-1.03 1.02 0 1.43.78 1.43 1.92V20H20z" />
  </svg>
);

export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.2 3h3.3l-7.2 8.24L21.8 21h-6.6l-4.18-5.46L6.2 21H2.9l7.7-8.8L2.5 3h6.77l3.78 5 4.15-5Zm-1.16 16h1.83L8.03 4.9H6.07z" />
  </svg>
);

export const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
} as const;

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path d="M5 12h13m0 0-5.2-5.2M18 12l-5.2 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="m12 2.6 2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.43l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95z" />
  </svg>
);

/** Small line-art glyphs used by the service cards. */
export const ServiceGlyph = ({ name, ...p }: P & { name: string }) => {
  const common = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      {name === "branding" && (
        <>
          <path d="M12 3 4 7.5v9L12 21l8-4.5v-9z" {...common} />
          <path d="M12 12 4 7.5M12 12v9M12 12l8-4.5" {...common} />
        </>
      )}
      {name === "design" && (
        <>
          <path d="M3.5 17.5 13 8l3 3-9.5 9.5H3.5z" {...common} />
          <path d="m14.5 6.5 3 3 2-2a1.5 1.5 0 0 0 0-2.1l-.9-.9a1.5 1.5 0 0 0-2.1 0z" {...common} />
        </>
      )}
      {name === "code" && (
        <>
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" {...common} />
          <path d="M3 9h18M9 12.5 7 14.5l2 2M15 12.5l2 2-2 2" {...common} />
        </>
      )}
      {name === "marketing" && (
        <>
          <path d="M4 10v4h3l5 3.5v-11L7 10z" {...common} />
          <path d="M16.5 9.2a4 4 0 0 1 0 5.6M19 6.8a7.5 7.5 0 0 1 0 10.4" {...common} />
        </>
      )}
    </svg>
  );
};
