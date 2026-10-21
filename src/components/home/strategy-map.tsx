"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { MethodStage } from "@/content/firm";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui";

type StrategyMapProps = {
  stages: MethodStage[];
};

export function StrategyMap({ stages }: StrategyMapProps) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const selectTab = (index: number, focus = false) => {
    const normalized = (index + stages.length) % stages.length;
    setActive(normalized);
    if (focus) {
      window.requestAnimationFrame(() => tabsRef.current[normalized]?.focus());
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectTab(index + 1, true);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectTab(index - 1, true);
        break;
      case "Home":
        event.preventDefault();
        selectTab(0, true);
        break;
      case "End":
        event.preventDefault();
        selectTab(stages.length - 1, true);
        break;
      default:
        break;
    }
  };

  return (
    <section className="strategy section section--stone" id="metodologia" aria-labelledby="strategy-title">
      <div className="container">
        <SectionLabel index="04">Metodología</SectionLabel>

        <div className="strategy__head">
          <h2 className="strategy__title" id="strategy-title">
            La estrategia no es una intuición.
            <br />
            <em>Es un proceso.</em>
          </h2>
          <div className="strategy__intro">
            <p>
              Ordenamos el trabajo en cinco etapas. No son una garantía de resultado: son la
              disciplina con la que reducimos la improvisación y hacemos visibles las decisiones.
            </p>
            <div className="strategy__map-label" aria-hidden="true">
              <span>Mapa de estrategia</span>
              <span>05 etapas / 01 proceso</span>
            </div>
          </div>
        </div>

        <div className="strategy__machine">
          <div className="strategy__tabs" role="tablist" aria-label="Etapas de la metodología">
            {stages.map((stage, index) => (
              <button
                key={stage.index}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`strategy-tab-${index}`}
                aria-selected={active === index}
                aria-controls={`strategy-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                className={cn("strategy-tab", active === index && "is-active")}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="strategy-tab__node" aria-hidden="true">
                  <span />
                </span>
                <span className="strategy-tab__index">{stage.index}</span>
                <span className="strategy-tab__title">{stage.title}</span>
                <span className="strategy-tab__short">{stage.short}</span>
              </button>
            ))}
          </div>

          <div className="strategy__panels">
            {stages.map((stage, index) => (
              <div
                key={stage.index}
                role="tabpanel"
                id={`strategy-panel-${index}`}
                aria-labelledby={`strategy-tab-${index}`}
                hidden={active !== index}
                tabIndex={0}
                className="strategy-panel"
              >
                <span className="strategy-panel__number" aria-hidden="true">
                  {stage.index}
                </span>
                <div className="strategy-panel__main">
                  <p className="strategy-panel__eyebrow">Etapa {stage.index} — {stage.short}</p>
                  <h3 className="strategy-panel__title">{stage.title}</h3>
                  <p className="strategy-panel__description">{stage.description}</p>
                </div>
                <div className="strategy-panel__question">
                  <span className="mono-label">Pregunta de trabajo</span>
                  <p>{stage.question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="strategy__disclaimer">
          La metodología describe un proceso de trabajo. No anticipa, promete ni garantiza
          resultados jurídicos o judiciales.
        </p>
      </div>
    </section>
  );
}
