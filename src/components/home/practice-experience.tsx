"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Practice } from "@/content/practices";
import { cn } from "@/lib/utils";
import { Arrow, SectionLabel } from "@/components/ui";

type PracticeExperienceProps = {
  practices: Practice[];
  variant?: "home" | "index";
  index?: string;
};

export function PracticeExperience({ practices, variant = "home", index = "03" }: PracticeExperienceProps) {
  const [activeSlug, setActiveSlug] = useState(practices[0]?.slug ?? "");
  const active = practices.find((practice) => practice.slug === activeSlug) ?? practices[0];

  if (!active) return null;

  return (
    <section className="practice section section--dark" id="practica" aria-labelledby="practice-title">
      <div className="container">
        <SectionLabel index={index} tone="light">
          Áreas de práctica
        </SectionLabel>

        <div className="practice__head">
          <h2 className="practice__title" id="practice-title">
            Seis formas de ordenar <em>una decisión.</em>
          </h2>
          <div className="practice__intro">
            <p>
              Cada materia tiene su propia lógica. Todas comparten la misma exigencia: entender
              antes de actuar y dejar una estructura que pueda sostenerse.
            </p>
            <p className="practice__note">
              Contenido provisional de demostración. Las áreas y sus servicios deben validarse
              antes de su publicación.
            </p>
          </div>
        </div>

        <div className="practice__stage">
          <div className="practice__list" aria-label="Áreas de práctica">
            {practices.map((practice) => (
              <Link
                key={practice.slug}
                href={`/areas-de-practica/${practice.slug}`}
                className={cn("practice-row", active.slug === practice.slug && "is-active")}
                onMouseEnter={() => setActiveSlug(practice.slug)}
                onFocus={() => setActiveSlug(practice.slug)}
              >
                <span className="practice-row__index" aria-hidden="true">
                  {practice.index}
                </span>
                <span className="practice-row__body">
                  <span className="practice-row__title">{practice.title}</span>
                  <span className="practice-row__summary">{practice.summary}</span>
                </span>
                <span className="practice-row__thumb" aria-hidden="true">
                  <Image
                    src={practice.visual.src}
                    alt=""
                    width={96}
                    height={120}
                    sizes="96px"
                    className="practice-row__thumb-image"
                  />
                </span>
                <span className="practice-row__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>

          <aside className="practice-panel" aria-hidden="true">
            <div className="practice-panel__media" key={active.slug}>
              <Image
                src={active.visual.src}
                alt=""
                fill
                sizes="(max-width: 1100px) 45vw, 460px"
                className="practice-panel__image"
                style={{ objectPosition: active.visual.position }}
              />
              <div className="practice-panel__shade" />
              <span className="practice-panel__number">{active.index}</span>
              <span className="practice-panel__caption">{active.visual.caption}</span>
            </div>

            <div className="practice-panel__meta">
              <span>{active.eyebrow}</span>
              <span>{active.index} / 06</span>
            </div>
            <p className="practice-panel__focus">{active.focus}</p>
            <ul className="practice-panel__services">
              {active.services.slice(0, 3).map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
            <span className="practice-panel__action">Archivo de práctica · {active.index}</span>
          </aside>
        </div>

        {variant === "home" ? (
          <div className="practice__footer">
            <Link href="/areas-de-practica" className="text-link text-link--light">
              Ver todas las áreas y su metodología
            </Link>
            <span className="practice__footer-note">06 áreas · Contenido provisional</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
