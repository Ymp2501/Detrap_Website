import { useTranslation } from "react-i18next";
import { TiltCard } from "../ui/TiltCard";
import { Reveal } from "../ui/Reveal";
import { guides } from "../../data/guides";
import styles from "./GuideLibrary.module.css";

const tabClass = {
  gold: styles.tabGold,
  teal: styles.tabTeal,
  coral: styles.tabCoral,
};

export function GuideLibrary() {
  const { t } = useTranslation();

  return (
    <section id="guide" className="section section--paper">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t("guide.eyebrow")}</span>
          <h2>{t("guide.title")}</h2>
          <p>{t("guide.description")}</p>
        </div>

        <div className={styles.grid}>
          {guides.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.08}>
              <TiltCard maxTilt={7} lift={10} floatDelay={i * 0.7}>
                <div className={styles.card}>
                  <span className={`${styles.tab} ${tabClass[g.accent]}`}>{t(`guide.items.${g.key}.tag`)}</span>
                  <h3 className={styles.cardTitle}>{t(`guide.items.${g.key}.title`)}</h3>
                  <p className={styles.cardDesc}>{t(`guide.items.${g.key}.description`)}</p>
                  <div className={styles.meta}>
                    <span className={styles.pages}>
                      {g.pages ? `${g.pages} ${t("guide.pages")}` : "[PLACEHOLDER: page count]"}
                    </span>
                    <a href={g.fileHref} className={styles.downloadBtn} download>
                      {t("guide.downloadLabel")}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                  {g.fileIsPlaceholder && (
                    <span className={styles.placeholderNote}>[PLACEHOLDER: final PDF file to be supplied]</span>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
