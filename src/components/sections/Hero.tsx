import { useTranslation } from "react-i18next";
import { SceneCanvas } from "../three/SceneCanvas";
import { PassbookScene } from "../three/PassbookScene";
import { CountUp } from "../ui/CountUp";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { usePrefersReducedMotion } from "../../hooks/useWebGL";
import styles from "./Hero.module.css";

function Fallback() {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackCard}>
        <div className={styles.fallbackSpine} />
        <div className={styles.fallbackTag}>₹500</div>
        <div className={styles.fallbackLabel}>DE-TRAP</div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t, i18n } = useTranslation();
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const reduceMotion = usePrefersReducedMotion();
  const locale = i18n.language === "hi" ? "hi-IN" : "en-IN";

  const stats = [
    { value: 25, suffix: t("hero.stat1Suffix"), label: t("hero.stat1Label") },
    { value: 6, suffix: t("hero.stat2Suffix"), label: t("hero.stat2Label") },
    { value: 122, suffix: t("hero.stat3Suffix"), label: t("hero.stat3Label") },
  ];

  return (
    <section id="top" ref={ref} className={`${styles.hero} section section--ink`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className={styles.title}>
            {t("hero.title")}
          </h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          <p className={styles.mission}>{t("hero.mission")}</p>

          <div className={styles.actions}>
            <a href="#guide" className="btn btn-primary">
              {t("hero.ctaPrimary")}
            </a>
            <a href="#schools" className="btn btn-ghost">
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <div className={styles.stats}>
            {stats.map((s, i) => (
              <div className={styles.stat} key={i}>
                <span className={styles.statValue}>
                  <CountUp value={s.value} suffix={s.suffix} locale={locale} duration={1.4 + i * 0.2} />
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.canvasWrap}>
          <SceneCanvas className={styles.canvas} fallback={<Fallback />} camera={{ position: [0, 0, 7.2], fov: 42 }}>
            <PassbookScene scrollProgress={progress} reduceMotion={reduceMotion} />
          </SceneCanvas>
        </div>
      </div>
    </section>
  );
}
