import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "brand" | "dark" | "ghost";
type Size = "sm" | "md";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium " +
  "transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.44,0,0.56,1)] " +
  "will-change-transform hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  brand:
    "bg-brand text-white shadow-[0_1px_2px_rgb(6_6_18/0.15),inset_0_1px_0_rgb(255_255_255/0.22)] " +
    "hover:bg-[rgb(98_60_196)] hover:shadow-[0_8px_20px_-6px_rgb(111_70_212/0.55)]",
  dark:
    "bg-graphite text-white shadow-[0_1px_2px_rgb(6_6_18/0.2),inset_0_1px_0_rgb(255_255_255/0.14)] " +
    "hover:bg-midnight hover:shadow-[0_8px_20px_-6px_rgb(6_6_18/0.4)]",
  ghost:
    "bg-white text-midnight border border-midnight-10 hover:border-midnight-18 " +
    "shadow-[0_1px_2px_rgb(6_6_18/0.06)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px] lg:text-[15px]",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  newTab?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: ComponentProps<"button">["onClick"];
  "aria-label"?: string;
}

export function Button({
  children,
  href,
  variant = "brand",
  size = "md",
  newTab = false,
  className = "",
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external || newTab) {
      return (
        <a
          href={href}
          className={cls}
          {...(newTab || external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
