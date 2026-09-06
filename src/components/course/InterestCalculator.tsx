import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatINR } from "../../lib/format";
import styles from "./InterestCalculator.module.css";

export function InterestCalculator() {
  const { i18n } = useTranslation();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(24);
  const [years, setYears] = useState(3);

  const { simpleTotal, compoundTotal, simpleInterest, compoundInterest } = useMemo(() => {
    const r = rate / 100;
    const sInterest = principal * r * years;
    const sTotal = principal + sInterest;
    const cTotal = principal * Math.pow(1 + r, years);
    const cInterest = cTotal - principal;
    return {
      simpleTotal: sTotal,
      compoundTotal: cTotal,
      simpleInterest: sInterest,
      compoundInterest: cInterest,
    };
  }, [principal, rate, years]);

  const diff = compoundTotal - simpleTotal;

  return (
    <div className={styles.wrap}>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label htmlFor="principal">Principal (₹)</label>
          <input
            id="principal"
            type="number"
            min={100}
            step={100}
            value={principal}
            onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
          />
          <input
            type="range"
            min={500}
            max={100000}
            step={500}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="rate">Annual rate (%)</label>
          <input id="rate" type="number" min={0} max={200} value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value)))} />
          <input type="range" min={1} max={120} step={1} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>

        <div className={styles.field}>
          <label htmlFor="years">Years</label>
          <input id="years" type="number" min={1} max={20} value={years} onChange={(e) => setYears(Math.max(1, Number(e.target.value)))} />
          <input type="range" min={1} max={10} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
      </div>

      <div className={styles.results}>
        <div className={`${styles.resultRow} ${styles.simple}`}>
          <span className={styles.resultLabel}>Simple interest total<br />(interest: {formatINR(simpleInterest, i18n.language)})</span>
          <span className={styles.resultValue}>{formatINR(simpleTotal, i18n.language)}</span>
        </div>
        <div className={`${styles.resultRow} ${styles.compound}`}>
          <span className={styles.resultLabel}>Compound interest total<br />(interest: {formatINR(compoundInterest, i18n.language)})</span>
          <span className={styles.resultValue}>{formatINR(compoundTotal, i18n.language)}</span>
        </div>
        <p className={styles.diff}>
          The curve costs {formatINR(diff, i18n.language)} more than the line, on the same loan.
        </p>
      </div>
    </div>
  );
}
