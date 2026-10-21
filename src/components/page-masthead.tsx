import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Ruta de navegación">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 ? (
              <span className="breadcrumbs__sep" aria-hidden="true">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type PageMastheadProps = {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  breadcrumbs?: Crumb[];
  tone?: "light" | "dark";
  className?: string;
};

export function PageMasthead({
  index,
  label,
  title,
  lead,
  aside,
  breadcrumbs,
  tone = "light",
  className,
}: PageMastheadProps) {
  return (
    <section
      className={cn("masthead", tone === "dark" && "masthead--dark", className)}
      aria-labelledby="page-title"
    >
      <div className="container">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}

        <SectionLabel index={index} tone={tone === "dark" ? "light" : "dark"}>
          {label}
        </SectionLabel>

        <div className="masthead__grid">
          <div className="masthead__main">
            <h1 className="masthead__title" id="page-title">
              {title}
            </h1>
          </div>

          {lead || aside ? (
            <div className="masthead__aside">
              {lead ? <p className="masthead__lead">{lead}</p> : null}
              {aside}
            </div>
          ) : null}
        </div>
      </div>

      <div className="masthead__baseline" aria-hidden="true">
        <span />
        <span>V / Estrategia jurídica</span>
      </div>
    </section>
  );
}

export function MetaList({
  items,
  className,
}: {
  items: Array<{ label: string; value: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cn("meta-list", className)}>
      {items.map((item) => (
        <div className="meta-list__item" key={item.label}>
          <dt className="meta-list__label">{item.label}</dt>
          <dd className="meta-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
