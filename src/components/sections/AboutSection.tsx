import { useTranslation } from "react-i18next";
import { team } from "../../data/team";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section section--paper">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2>{t("about.title")}</h2>
          <p>{t("about.description")}</p>
        </div>

        <div className={styles.missionBlock}>
          <span className={styles.missionLabel}>{t("about.mission")}</span>
          <p className={styles.missionBody}>{t("about.missionBody")}</p>
        </div>

        <span className={styles.boardLabel}>{t("about.board")}</span>
        <div className={styles.grid}>
          {team.map((member) => (
            <div key={member.id} className={styles.member}>
              <div className={styles.avatar} />
              <div className={styles.memberName}>{member.name}</div>
              <div className={styles.memberRole}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
