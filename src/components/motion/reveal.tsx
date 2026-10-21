"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
  threshold?: number;
  id?: string;
};

/**
 * Revelado al entrar en viewport mediante la Web Animations API.
 *
 * El contenido es visible por defecto: si JavaScript falla, el observer no
 * corre y la página sigue siendo legible. No se usan librerías de animación.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  distance = 18,
  threshold = 0.08,
  id,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.revealed = "true";
      return;
    }

    if (!("IntersectionObserver" in window) || !element.animate) {
      element.dataset.revealed = "true";
      return;
    }

    let animation: Animation | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          element.dataset.revealed = "true";
          animation = element.animate(
            [
              { opacity: 0, transform: `translate3d(0, ${distance}px, 0)` },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 780,
              delay,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "backwards",
            },
          );
          animation.addEventListener("finish", () => {
            animation?.cancel();
          });
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay, distance, threshold]);

  return (
    <div ref={elementRef} className={className} id={id} data-reveal>
      {children}
    </div>
  );
}

export function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}
