"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui";

export type GuidedArea = {
  value: string;
  title: string;
  summary: string;
};

type GuidedConsultationProps = {
  areas: GuidedArea[];
  variant?: "embedded" | "page";
  title?: string;
};

type StageValue = "antes" | "decidida" | "conflicto";
type ProfileValue = "empresa" | "particular" | "institucion";

const stageOptions: Array<{ value: StageValue; label: string; hint: string }> = [
  {
    value: "antes",
    label: "Todavía estoy decidiendo",
    hint: "Hay una decisión sobre la mesa, pero aún no está tomada.",
  },
  {
    value: "decidida",
    label: "La decisión está tomada",
    hint: "Necesito ordenar la ejecución jurídica y sus consecuencias.",
  },
  {
    value: "conflicto",
    label: "Ya existe un conflicto",
    hint: "Hay una reclamación, un desacuerdo abierto o un procedimiento en marcha.",
  },
];

const profileOptions: Array<{ value: ProfileValue; label: string; hint: string }> = [
  {
    value: "empresa",
    label: "Empresa o grupo",
    hint: "Sociedad, grupo empresarial o proyecto con estructura societaria.",
  },
  {
    value: "particular",
    label: "Particular o familia",
    hint: "Una persona, una familia o un patrimonio personal.",
  },
  {
    value: "institucion",
    label: "Institución o fondo",
    hint: "Una entidad, un inversor o una estructura sin ánimo de lucro.",
  },
];

const stageCopy: Record<StageValue, string> = {
  antes:
    "El trabajo empieza por delimitar la decisión y las alternativas antes de formalizar cualquier actuación.",
  decidida:
    "Con la decisión tomada, el foco se sitúa en ordenar su ejecución jurídica y anticipar sus consecuencias.",
  conflicto:
    "Si ya existe un conflicto, conviene ordenar hechos, prueba y vías de resolución antes de actuar.",
};

const progressLabels = ["Encuadre", "Momento", "Contexto"];

export function GuidedConsultation({ areas, variant = "embedded", title }: GuidedConsultationProps) {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<string | null>(null);
  const [stage, setStage] = useState<StageValue | null>(null);
  const [profile, setProfile] = useState<ProfileValue | null>(null);
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skipFocusRef = useRef(true);
  const uid = useId().replace(/[:]/g, "");

  useEffect(() => {
    if (skipFocusRef.current) {
      skipFocusRef.current = false;
      return;
    }
    const timer = window.setTimeout(() => headingRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [step, finished]);

  const recommendedSlug =
    area === "todavia-no-se" || !area ? "consultoria-estrategica" : area;
  const recommendedArea =
    areas.find((candidate) => candidate.value === recommendedSlug) ?? areas[0];

  const canContinue =
    !finished &&
    ((step === 1 && Boolean(area)) ||
      (step === 2 && Boolean(stage)) ||
      (step === 3 && Boolean(profile)));

  const goNext = () => {
    if (!canContinue) return;
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }
    setFinished(true);
  };

  const goBack = () => {
    if (finished) {
      setFinished(false);
      return;
    }
    if (step > 1) setStep((current) => current - 1);
  };

  const restart = () => {
    setFinished(false);
    setStep(1);
    setArea(null);
    setStage(null);
    setProfile(null);
  };

  const progress = finished ? 100 : (step / 3) * 100;

  return (
    <div className={cn("guided", variant === "page" && "guided--page")} data-testid="guided-consultation">
      <div className="guided__head">
        <div>
          <p className="guided__kicker">{title ?? "Consulta guiada"}</p>
          <p className="guided__progress" aria-live="polite">
            {finished ? "Resultado orientativo" : `Paso ${String(step).padStart(2, "0")} / 03`}
          </p>
        </div>
        <Link href="/contacto" className="guided__exit">
          Salir
          <Arrow />
        </Link>
      </div>

      <div
        className="guided__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Progreso de la consulta guiada"
      >
        <span className="guided__bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="guided__body">
        {!finished ? (
          <>
            {step === 1 ? (
              <fieldset className="guided__step" aria-labelledby={`${uid}-question-1`}>
                <legend className="sr-only">¿Qué necesita ordenar?</legend>
                <div className="guided__step-top">
                  <span className="guided__count">01</span>
                  <span className="guided__step-label">Encuadre</span>
                </div>
                <h3 className="guided__question" id={`${uid}-question-1`} ref={headingRef} tabIndex={-1}>
                  ¿Qué necesita ordenar?
                </h3>
                <p className="guided__hint">
                  Elija la opción que más se acerque. No necesita conocer la denominación jurídica.
                </p>
                <div className="guided__choices guided__choices--areas">
                  {areas.map((option) => (
                    <label
                      key={option.value}
                      className={cn("choice", area === option.value && "is-checked")}
                    >
                      <input
                        type="radio"
                        name={`area-${uid}`}
                        value={option.value}
                        checked={area === option.value}
                        onChange={() => setArea(option.value)}
                        className="choice__input"
                      />
                      <span className="choice__marker" aria-hidden="true" />
                      <span className="choice__content">
                        <span className="choice__label">{option.title}</span>
                        <span className="choice__hint">{option.summary}</span>
                      </span>
                    </label>
                  ))}
                  <label className={cn("choice", area === "todavia-no-se" && "is-checked")}>
                    <input
                      type="radio"
                      name={`area-${uid}`}
                      value="todavia-no-se"
                      checked={area === "todavia-no-se"}
                      onChange={() => setArea("todavia-no-se")}
                      className="choice__input"
                    />
                    <span className="choice__marker" aria-hidden="true" />
                    <span className="choice__content">
                      <span className="choice__label">Todavía no lo tengo claro</span>
                      <span className="choice__hint">
                        Necesito ordenar la pregunta antes de elegir un área.
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>
            ) : null}

            {step === 2 ? (
              <fieldset className="guided__step" aria-labelledby={`${uid}-question-2`}>
                <legend className="sr-only">¿En qué momento se encuentra?</legend>
                <div className="guided__step-top">
                  <span className="guided__count">02</span>
                  <span className="guided__step-label">Momento</span>
                </div>
                <h3 className="guided__question" id={`${uid}-question-2`} ref={headingRef} tabIndex={-1}>
                  ¿En qué momento se encuentra?
                </h3>
                <p className="guided__hint">
                  El momento condiciona el orden de actuación, no la existencia de una solución.
                </p>
                <div className="guided__choices">
                  {stageOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn("choice", stage === option.value && "is-checked")}
                    >
                      <input
                        type="radio"
                        name={`stage-${uid}`}
                        value={option.value}
                        checked={stage === option.value}
                        onChange={() => setStage(option.value)}
                        className="choice__input"
                      />
                      <span className="choice__marker" aria-hidden="true" />
                      <span className="choice__content">
                        <span className="choice__label">{option.label}</span>
                        <span className="choice__hint">{option.hint}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 3 ? (
              <fieldset className="guided__step" aria-labelledby={`${uid}-question-3`}>
                <legend className="sr-only">¿Con quién vamos a trabajar?</legend>
                <div className="guided__step-top">
                  <span className="guided__count">03</span>
                  <span className="guided__step-label">Contexto</span>
                </div>
                <h3 className="guided__question" id={`${uid}-question-3`} ref={headingRef} tabIndex={-1}>
                  ¿Con quién vamos a trabajar?
                </h3>
                <p className="guided__hint">
                  Nos ayuda a preparar el primer contacto. No se guarda ningún dato en esta
                  secuencia.
                </p>
                <div className="guided__choices">
                  {profileOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn("choice", profile === option.value && "is-checked")}
                    >
                      <input
                        type="radio"
                        name={`profile-${uid}`}
                        value={option.value}
                        checked={profile === option.value}
                        onChange={() => setProfile(option.value)}
                        className="choice__input"
                      />
                      <span className="choice__marker" aria-hidden="true" />
                      <span className="choice__content">
                        <span className="choice__label">{option.label}</span>
                        <span className="choice__hint">{option.hint}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}
          </>
        ) : (
          <div className="guided__result" data-testid="guided-result">
            <div className="guided__step-top">
              <span className="guided__count">◎</span>
              <span className="guided__step-label">Punto de partida</span>
            </div>
            <h3 className="guided__question" ref={headingRef} tabIndex={-1}>
              Un área para empezar a conversar.
            </h3>

            <div className="guided__recommendation">
              <p className="guided__recommendation-label">Orientación</p>
              <p className="guided__recommendation-title">{recommendedArea?.title ?? "Consultoría estratégica"}</p>
              <p className="guided__recommendation-text">
                {recommendedArea?.summary ??
                  "Un primer encuentro permite ordenar el contexto antes de elegir una vía."}
              </p>
            </div>

            {stage ? <p className="guided__reason">{stageCopy[stage]}</p> : null}

            <p className="guided__disclaimer">
              Esta orientación es informativa y no constituye un diagnóstico jurídico ni un
              compromiso de resultado. La conversación con el equipo permitirá confirmar el
              encuadre.
            </p>

            <div className="guided__result-actions">
              <Link
                href={`/contacto?area=${recommendedSlug}#formulario`}
                className="button button--solid"
              >
                <span className="button__label">Continuar al formulario</span>
                <Arrow className="button__arrow" />
              </Link>
              <button type="button" className="text-link" onClick={restart}>
                Cambiar respuestas
              </button>
            </div>
          </div>
        )}
      </div>

      {!finished ? (
        <div className="guided__foot">
          <button
            type="button"
            className="guided__back"
            onClick={goBack}
            disabled={step === 1}
          >
            <span aria-hidden="true">←</span> Volver
          </button>

          <div className="guided__foot-meta">
            <span className="guided__foot-steps" aria-hidden="true">
              {progressLabels.map((label, index) => (
                <span key={label} className={cn(index + 1 <= step && "is-active")}>
                  {label}
                </span>
              ))}
            </span>
            <button
              type="button"
              className="button button--solid guided__next"
              onClick={goNext}
              disabled={!canContinue}
            >
              <span className="button__label">{step === 3 ? "Ver orientación" : "Continuar"}</span>
              <Arrow className="button__arrow" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
