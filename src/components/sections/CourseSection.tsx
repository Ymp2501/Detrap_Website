import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SceneCanvas } from "../three/SceneCanvas";
import { ModuleTrackScene } from "../course/ModuleTrackScene";
import { InterestCalculator } from "../course/InterestCalculator";
import { LenderDiagram } from "../course/LenderDiagram";
import { DebtMeter } from "../course/DebtMeter";
import { modules, type Concept } from "../../data/modules";
import { usePrefersReducedMotion } from "../../hooks/useWebGL";
import styles from "./CourseSection.module.css";

const accentColors: Record<string, string> = {
  gold: "#f5c518",
  teal: "#2bbfa0",
  coral: "#ff5c4d",
};

function TrackFallback() {
  return null;
}

function renderConceptBody(concept: Concept) {
  const { body, links } = concept;
  if (!links || links.length === 0) return body;
  const escaped = links.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = body.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) => {
    const link = links.find((l) => l.text === part);
    if (!link) return part;
    const external = link.href.startsWith("http");
    return (
      <a
        key={i}
        href={link.href}
        className={styles.conceptLink}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {part}
      </a>
    );
  });
}

export function CourseSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const current = modules[active];
  const colors = modules.map((m) => accentColors[m.accent]);

  return (
    <section id="course" className="section section--ink">
      <div className="container">
        <div className="section-head" style={{ margin: "0 auto 40px", textAlign: "center", alignItems: "center" }}>
          <span className="eyebrow">{t("course.eyebrow")}</span>
          <h2>{t("course.title")}</h2>
          <p>{t("course.description")}</p>
        </div>

        <div className={styles.trackCanvasWrap}>
          <SceneCanvas fallback={<TrackFallback />} camera={{ position: [0, 1.4, 6.2], fov: 38 }} className={styles.trackCanvasWrap}>
            <ModuleTrackScene total={modules.length} activeIndex={active} colors={colors} reduceMotion={reduceMotion} />
          </SceneCanvas>
        </div>

        <div className={styles.pillRow}>
          {modules.map((m, i) => (
            <button
              key={m.id}
              className={`${styles.pill} ${i === active ? styles.pillActive : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.pillNum}>{i + 1}</span>
              <span>{t(`course.modules.${m.i18nKey}.title`)}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={styles.panel}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.panelHead}>
              <span className={styles.panelKicker}>
                {t("course.moduleLabel")} {active + 1} {t("course.of")} {modules.length}
              </span>
            </div>
            <h3 className={styles.panelTitle}>{t(`course.modules.${current.i18nKey}.title`)}</h3>
            <p className={styles.intro}>{current.intro}</p>

            <span className={styles.interactiveLabel} style={{ display: "none" }}>
              {t("course.keyConcepts")}
            </span>
            <div className={styles.conceptGrid}>
              {current.concepts.map((c, i) => (
                <div key={i} className={styles.conceptCard}>
                  <span className={styles.conceptTerm}>{c.term}</span>
                  <span className={styles.conceptBody}>{renderConceptBody(c)}</span>
                </div>
              ))}
            </div>

            {current.interactive !== "none" && (
              <div>
                <span className={styles.interactiveLabel}>{t("course.tryIt")}</span>
                {current.interactive === "interestCalculator" && <InterestCalculator />}
                {current.interactive === "lenderDiagram" && <LenderDiagram />}
                {current.interactive === "debtMeter" && <DebtMeter />}
              </div>
            )}

            <div className={styles.nav}>
              <button
                className="btn btn-ghost"
                disabled={active === 0}
                style={{ opacity: active === 0 ? 0.35 : 1 }}
                onClick={() => setActive((v) => Math.max(0, v - 1))}
              >
                ← Previous
              </button>
              <button
                className="btn btn-primary"
                disabled={active === modules.length - 1}
                style={{ opacity: active === modules.length - 1 ? 0.35 : 1 }}
                onClick={() => setActive((v) => Math.min(modules.length - 1, v + 1))}
              >
                Next →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
