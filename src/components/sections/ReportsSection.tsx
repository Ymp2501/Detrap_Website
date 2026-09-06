import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "../ui/Reveal";
import { reports } from "../../data/reports";
import styles from "./ReportsSection.module.css";

const statusDot: Record<string, string> = {
  active: styles.statusActive,
  shutdown: styles.statusShutdown,
  restricted: styles.statusRestricted,
};

function ReportCard({ report, index }: { report: (typeof reports)[number]; index: number }) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal delay={index * 0.06}>
      <div className={styles.cardOuter} style={{ animationDelay: `${index * 0.4}s` }}>
        <div
          className={`${styles.flipper} ${flipped ? styles.flipped : ""}`}
          onClick={() => setFlipped((v) => !v)}
          role="button"
          tabIndex={0}
          aria-label={`${report.name} report card`}
        >
          <div className={`${styles.face} ${styles.front}`}>
            <div className={styles.statusRow}>
              <span className={styles.category}>{report.category}</span>
              <span className={`${styles.statusDot} ${statusDot[report.status]}`} />
            </div>
            <h3 className={styles.name}>{report.name}</h3>
            <span className={styles.statusLabel}>{report.statusLabel}</span>
            {report.placeholder && <span className={styles.placeholderPill}>{t("reports.suggested")}</span>}
            <p className={styles.summary}>{report.summary}</p>
            <span className={styles.flipHint}>
              {t("reports.flip")}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M4 12a8 8 0 1 1 3 6.2M4 12v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className={`${styles.face} ${styles.back}`}>
            <span className={styles.backName}>{report.name}</span>

            <div className={styles.backSection}>
              <span className={styles.backLabel}>{t("reports.lender")}</span>
              <p className={styles.backText}>{report.lender}</p>
            </div>

            <div className={styles.backSection}>
              <span className={styles.backLabel}>{t("reports.feeStructure")}</span>
              <ul className={styles.backList}>
                {report.feeStructure.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.backSection}>
              <span className={styles.backLabel}>{t("reports.rollover")}</span>
              <ul className={styles.backList}>
                {report.rollover.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.backSection}>
              <span className={styles.backLabel}>{t("reports.status")}</span>
              <p className={styles.backText}>{report.regulatoryStatus}</p>
            </div>

            <p className={styles.source}>{t("reports.flipBack")} · {report.source}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function ReportsSection() {
  const { t } = useTranslation();

  return (
    <section id="reports" className="section section--ink">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t("reports.eyebrow")}</span>
          <h2>{t("reports.title")}</h2>
          <p>{t("reports.description")}</p>
        </div>

        <div className={styles.grid}>
          {reports.map((r, i) => (
            <ReportCard key={r.id} report={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
