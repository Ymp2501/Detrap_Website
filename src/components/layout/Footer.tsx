import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import styles from "./Footer.module.css";

const sections = [
  { id: "guide", key: "guide" },
  { id: "course", key: "course" },
  { id: "reports", key: "reports" },
  { id: "pdc", key: "pdc" },
  { id: "schools", key: "schools" },
  { id: "about", key: "about" },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://detrapinitiative.org";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className={styles.tagline}>{t("footer.tagline")}</p>
          </div>

          <div>
            <span className={styles.colLabel}>{t("footer.links")}</span>
            <ul className={styles.linkList}>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{t(`nav.${s.key}`)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className={styles.colLabel}>{t("footer.contact")}</span>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:hello@detrapinitiative.org">hello@detrapinitiative.org</a>
              </li>
              <li>
                <a href="#schools">{t("nav.cta")}</a>
              </li>
            </ul>
          </div>

          <div className={styles.qrBlock}>
            <div className={styles.qrFrame}>
              <QRCodeSVG value={siteUrl} size={112} bgColor="#faf6ed" fgColor="#181433" level="M" marginSize={2} />
            </div>
            <span className={styles.qrCaption}>{t("footer.qrCaption")}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.rights}>DE-TRAP · {t("footer.rights")}</span>
          <span className={styles.sourcesNote}>{t("footer.sourcesNote")}</span>
        </div>
      </div>
    </footer>
  );
}
