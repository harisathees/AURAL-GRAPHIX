interface PreTitleProps {
  children: string;
  boxed?: boolean;
  className?: string;
}

/** The "› CREATIVE DESIGN AGENCY ‹" eyebrow used above every section heading. */
export function PreTitle({ children, boxed = false, className = "" }: PreTitleProps) {
  return (
    <p
      className={`t-pretitle inline-flex items-center gap-2 ${
        boxed ? "rounded-md border border-midnight-10 bg-white/70 px-3 py-2" : ""
      } ${className}`}
    >
      <Chevron className="rotate-180" />
      <span>{children}</span>
      <Chevron />
    </p>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      width="7"
      height="10"
      viewBox="0 0 7 10"
      fill="none"
      aria-hidden
      className={`shrink-0 opacity-45 ${className}`}
    >
      <path d="M1.5 1 5.5 5l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
