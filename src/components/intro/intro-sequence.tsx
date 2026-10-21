"use client";

import { useCallback, useEffect, useRef } from "react";
import { site } from "@/content/site";

const SESSION_KEY = "vertice:intro:v1";
const INTRO_DURATION = 3400;
const EXIT_DURATION = 600;

/**
 * «La geometría de la ley».
 *
 * Secuencia SVG + CSS de ~4 s, sin vídeo ni librerías. Se muestra una vez por
 * sesión. Si JavaScript falla, el CSS la oculta y la portada queda disponible;
 * con prefers-reduced-motion no llega a mostrarse.
 *
 * El estado visual se controla con atributos del DOM en lugar de estado de
 * React: así la portada nunca se vuelve a renderizar durante la secuencia.
 */
export function IntroSequence() {
  const introRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage puede no estar disponible; la intro se omite igualmente.
    }

    document.documentElement.dataset.intro = "done";
    const node = introRef.current;
    if (!node) return;

    node.classList.add("is-leaving");
    exitTimerRef.current = window.setTimeout(() => {
      node.dataset.state = "done";
      node.classList.remove("is-leaving");
    }, EXIT_DURATION);
  }, []);

  useEffect(() => {
    let skip = false;
    let reduced = false;

    try {
      skip = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      skip = false;
    }

    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip || reduced) {
      finishedRef.current = true;
      document.documentElement.dataset.intro = "done";
      if (introRef.current) introRef.current.dataset.state = "done";
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Sin almacenamiento: no hay nada más que hacer.
      }
      return;
    }

    document.documentElement.dataset.intro = "playing";
    const timer = window.setTimeout(finish, INTRO_DURATION);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
      window.removeEventListener("keydown", onKeyDown);
      delete document.documentElement.dataset.intro;
    };
  }, [finish]);

  return (
    <div ref={introRef} className="intro">
      <div className="intro__stage" aria-hidden="true">
        <div className="intro__chrome">
          <div className="intro__identity">
            <span className="intro__mono">V</span>
            <span>
              <span className="intro__brand">{site.name}</span>
              <span className="intro__descriptor">{site.descriptor}</span>
            </span>
          </div>
          <div className="intro__sequence">
            <span>La geometría de la ley</span>
            <span className="intro__counter">Secuencia 01 / 04</span>
          </div>
        </div>

        <div className="intro__drawing">
          <span className="intro__cross intro__cross--tl" />
          <span className="intro__cross intro__cross--tr" />
          <span className="intro__cross intro__cross--bl" />
          <span className="intro__cross intro__cross--br" />

          <svg
            className="intro__svg"
            viewBox="0 0 1200 760"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <defs>
              <radialGradient id="intro-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E9E4DA" stopOpacity="0.85" />
                <stop offset="38%" stopColor="#B08A5F" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#111315" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="intro-slot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E9E4DA" stopOpacity="0" />
                <stop offset="42%" stopColor="#E9E4DA" stopOpacity="0.82" />
                <stop offset="100%" stopColor="#E9E4DA" stopOpacity="0" />
              </linearGradient>
            </defs>

            <circle className="intro__glow" cx="600" cy="380" r="230" fill="url(#intro-glow)" />

            <g className="intro__room">
              <path className="intro-line intro-line--frame" pathLength={1} d="M280 140H920V620H280V140Z" />
              <path
                className="intro-line intro-line--axis"
                pathLength={1}
                d="M600 140V620M280 380H920"
              />
              <path
                className="intro-line intro-line--portal"
                pathLength={1}
                d="M450 260H750V520H450V260Z"
              />
              <path
                className="intro-line intro-line--diagonal"
                pathLength={1}
                d="M280 140 600 380 920 140M280 620 600 380 920 620"
              />
              <path
                className="intro-line intro-line--joist intro-line--detail"
                pathLength={1}
                d="M450 260 600 380 750 260M450 520 600 380 750 520"
              />
              <path
                className="intro-line intro-line--joist intro-line--detail"
                pathLength={1}
                d="M360 210H840M360 550H840"
              />
              <path
                className="intro-line intro-line--ticks intro-line--detail"
                pathLength={1}
                d="M280 120V160M920 120V160M280 600V640M920 600V640"
              />
              <path
                className="intro-line intro-line--leader intro-line--detail"
                pathLength={1}
                d="M600 140H970M600 620H970"
              />
              <rect
                className="intro__slot"
                x="598"
                y="140"
                width="4"
                height="240"
                fill="url(#intro-slot)"
              />
            </g>

            <g className="intro__monogram">
              <path
                className="intro-line intro-line--v"
                pathLength={1}
                d="M450 250 600 545 750 250"
              />
              <path
                className="intro-line intro-line--spine"
                pathLength={1}
                d="M600 238V545"
              />
              <circle className="intro__vertex" cx="600" cy="545" r="3" fill="#B08A5F" />
            </g>

            <g className="intro__annotations">
              <text x="280" y="106" fill="#A8ADA8" fontSize="11" letterSpacing="2.2">
                PLANO 01
              </text>
              <text x="780" y="106" fill="#777C78" fontSize="11" letterSpacing="2.2">
                ESCALA 1:1
              </text>
              <text x="280" y="666" fill="#777C78" fontSize="11" letterSpacing="2.2">
                EJE V / DECISIÓN
              </text>
              <text x="970" y="704" fill="#A8ADA8" fontSize="11" letterSpacing="2.2" textAnchor="end">
                X 04.12 / Y 08.37
              </text>
            </g>
          </svg>
        </div>

        <div className="intro__signature">
          <p className="intro__overline">La geometría de la ley</p>
          <p className="intro__wordmark">{site.name}</p>
          <p className="intro__tagline">{site.tagline}</p>
        </div>

        <div className="intro__foot">
          <span className="intro__location">{site.location}</span>
          <span className="intro__footline" />
          <span className="intro__note">Una composición original</span>
        </div>
      </div>

      <button type="button" className="intro__skip" onClick={finish}>
        <span>Omitir introducción</span>
        <kbd>Esc</kbd>
      </button>
    </div>
  );
}
