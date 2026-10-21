import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";

type ArrowProps = {
  className?: string;
  direction?: "up-right" | "right" | "down";
};

export function Arrow({ className, direction = "up-right" }: ArrowProps) {
  const rotation =
    direction === "right" ? "rotate(0 12 12)" : direction === "down" ? "rotate(90 12 12)" : undefined;

  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 19 19 5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8.5 5H19v10.5" stroke="currentColor" strokeWidth="1.1" transform={rotation} />
    </svg>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 5 18 30.5 32.5 5" stroke="currentColor" strokeWidth="1.15" />
      <path d="M18 12.5v16.6" stroke="currentColor" strokeWidth="0.85" opacity="0.62" />
      <circle cx="18" cy="30.5" r="1.4" fill="var(--bronze-bright, #b08a5f)" />
      <path d="M7.2 5h21.6" stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  href?: string;
  descriptor?: boolean;
  onNavigate?: () => void;
};

export function Wordmark({ className, href = "/", descriptor = true, onNavigate }: WordmarkProps) {
  return (
    <Link
      href={href}
      className={["wordmark", className].filter(Boolean).join(" ")}
      aria-label={`${site.name}, ${site.descriptor}. Ir al inicio`}
      onClick={onNavigate}
    >
      <Monogram className="wordmark__mark" />
      <span className="wordmark__body">
        <span className="wordmark__name">{site.name}</span>
        {descriptor ? <span className="wordmark__descriptor">{site.descriptor}</span> : null}
      </span>
    </Link>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "quiet" | "inverse";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  prefetch?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  arrow = true,
  onClick,
  prefetch,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={["button", `button--${variant}`, className].filter(Boolean).join(" ")}
      onClick={onClick}
      prefetch={prefetch}
    >
      <span className="button__label">{children}</span>
      {arrow ? <Arrow className="button__arrow" /> : null}
    </Link>
  );
}

export function SectionLabel({
  index,
  children,
  tone = "dark",
  className,
}: {
  index: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p className={["section-label", `section-label--${tone}`, className].filter(Boolean).join(" ")}>
      <span className="section-label__index">{index}</span>
      <span className="section-label__rule" aria-hidden="true" />
      <span className="section-label__text">{children}</span>
    </p>
  );
}

export function Rule({ className }: { className?: string }) {
  return <span className={["rule", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
