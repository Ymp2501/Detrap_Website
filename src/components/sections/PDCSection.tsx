import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SceneCanvas } from "../three/SceneCanvas";
import { ZoneDialScene } from "../three/ZoneDialScene";
import { Reveal } from "../ui/Reveal";
import { usePrefersReducedMotion } from "../../hooks/useWebGL";
import styles from "./PDCSection.module.css";

const zoneStyle: Record<string, { bg: string; fg: string }> = {
  green: { bg: "#2bbfa0", fg: "#08281f" },
  yellow: { bg: "#f5c518", fg: "#181433" },
  red: { bg: "#ff5c4d", fg: "#2b0703" },
};

function DialFallback({ zone }: { zone: string }) {
  const style = zoneStyle[zone];
  return (
    <div
      style={{
        width: 220,
        height: 220,
        borderRadius: "50%",
        margin: "0 auto",
        border: `10px solid ${style.bg}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-serif)",
        fontSize: "1.1rem",
        color: "var(--paper-100)",
      }}
    >
      PDC
    </div>
  );
}

export function PDCSection() {
  const { t } = useTranslation();
  const [zone, setZone] = useState("green");
  const reduceMotion = usePrefersReducedMotion();
  const zoneKey = zone === "green" ? "zoneGreen" : zone === "yellow" ? "zoneYellow" : "zoneRed";
  const style = zoneStyle[zone];

  return (
    <section id="pdc" className="section section--ink">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t("pdc.eyebrow")}</span>
          <h2>{t("pdc.title")}</h2>
          <p>{t("pdc.description")}</p>
        </div>

        <div className={styles.layout}>
          <div>
            <div className={styles.dialWrap}>
              <SceneCanvas fallback={<DialFallback zone={zone} />} camera={{ position: [0, 0, 4.6], fov: 42 }} className={styles.dialWrap}>
                <ZoneDialScene onZoneChange={setZone} reduceMotion={reduceMotion} />
              </SceneCanvas>
              <div className={styles.zoneReadout}>
                <span className={styles.zoneBadge} style={{ background: style.bg, color: style.fg }}>
                  {t(`pdc.${zoneKey}`)}
                </span>
              </div>
            </div>
            <p className={styles.dragHint} style={{ textAlign: "center" }}>
              {t("pdc.dragHint")}
            </p>
          </div>

          <div className={styles.cards}>
            <Reveal>
              <div className={styles.pdcCard} style={{ borderLeftColor: "var(--teal-500)" }}>
                <h3 className={styles.pdcCardTitle}>{t("pdc.predict")}</h3>
                <p className={styles.pdcCardBody}>{t("pdc.predictBody")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className={styles.pdcCard} style={{ borderLeftColor: "var(--gold-500)" }}>
                <h3 className={styles.pdcCardTitle}>{t("pdc.detect")}</h3>
                <p className={styles.pdcCardBody}>{t("pdc.detectBody")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className={styles.pdcCard} style={{ borderLeftColor: "var(--coral-500)" }}>
                <h3 className={styles.pdcCardTitle}>{t("pdc.correct")}</h3>
                <p className={styles.pdcCardBody}>{t("pdc.correctBody")}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <p className={styles.disclaimer}>{t("pdc.disclaimer")}</p>
      </div>
    </section>
  );
}
