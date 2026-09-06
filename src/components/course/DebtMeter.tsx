import { useMemo, useState } from "react";
import { debtMeterStatements } from "../../data/modules";
import styles from "./DebtMeter.module.css";

const MAX_SCORE = debtMeterStatements.reduce((sum, s) => sum + s.points, 0);

function bandFor(score: number) {
  if (score <= 2) return { label: "Clear", color: "var(--teal-500)" };
  if (score <= 7) return { label: "Exposed", color: "var(--gold-500)" };
  if (score <= 13) return { label: "Slipping", color: "#e08a2a" };
  return { label: "Trapped", color: "var(--coral-500)" };
}

export function DebtMeter() {
  const [checked, setChecked] = useState<boolean[]>(() => debtMeterStatements.map(() => false));

  const score = useMemo(
    () => checked.reduce((sum, isChecked, i) => sum + (isChecked ? debtMeterStatements[i].points : 0), 0),
    [checked]
  );

  const band = bandFor(score);
  const markerLeft = `${Math.min(100, (score / MAX_SCORE) * 100)}%`;

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        {debtMeterStatements.map((s, i) => (
          <div key={i} className={styles.item} onClick={() => toggle(i)} role="checkbox" aria-checked={checked[i]} tabIndex={0}>
            <span className={`${styles.checkbox} ${checked[i] ? styles.checkboxChecked : ""}`}>
              {checked[i] && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 6" stroke="#181433" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className={styles.itemText}>{s.text}</span>
            <span className={styles.points}>+{s.points}</span>
          </div>
        ))}
      </div>

      <div className={styles.scoreOut}>
        <span>
          My score: <span className={styles.scoreValue}>{score}</span> / {MAX_SCORE}
        </span>
        <span className={styles.bandLabel} style={{ background: band.color, color: "#181433" }}>
          {band.label}
        </span>
      </div>

      <div className={styles.meterWrap}>
        <div className={styles.meterTrack}>
          <div className={styles.marker} style={{ left: markerLeft }} />
        </div>
        <div className={styles.bandRow}>
          <span>0–2 Clear</span>
          <span>3–7 Exposed</span>
          <span>8–13 Slipping</span>
          <span>14–20 Trapped</span>
        </div>
      </div>
    </div>
  );
}
