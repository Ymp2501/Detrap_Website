import styles from "./LenderDiagram.module.css";

export function LenderDiagram() {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <div className={`${styles.node} ${styles.you}`}>
          <span className={styles.nodeLabel}>You</span>
          <span className={styles.nodeTitle}>The borrower</span>
          <span className={styles.nodeSub}>Signs up, taps to pay</span>
        </div>
        <div className={`${styles.node} ${styles.app}`}>
          <span className={styles.nodeLabel}>What you see</span>
          <span className={styles.nodeTitle}>The app</span>
          <span className={styles.nodeSub}>Marketing · sign-up · recovery calls</span>
        </div>
        <div className={`${styles.node} ${styles.lender}`}>
          <span className={styles.nodeLabel}>What you don't</span>
          <span className={styles.nodeTitle}>The real lender</span>
          <span className={styles.nodeSub}>A bank or NBFC, licensed by the RBI</span>
        </div>
      </div>
      <div className={styles.arrows}>
        <div className={`${styles.arrowLine} ${styles.arrowMoney}`}>
          Money flows <span className={styles.dash} /> this way
        </div>
        <div className={`${styles.arrowLine} ${styles.arrowBlame}`}>
          Blame flows <span className={styles.dash} /> the other way
        </div>
      </div>
    </div>
  );
}
