import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SchoolsSection.module.css";

const CONTACT_EMAIL = "hello@detrapinitiative.org";

export function SchoolsSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ school: "", contactName: "", email: "", grade: "", message: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Workshop request: ${form.school || "a school"}`);
    const body = encodeURIComponent(
      `School: ${form.school}\nContact: ${form.contactName}\nEmail: ${form.email}\nGrade levels: ${form.grade}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="schools" className="section section--paper">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t("schools.eyebrow")}</span>
          <h2>{t("schools.title")}</h2>
          <p>{t("schools.description")}</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.days}>
            <div className={styles.dayCard}>
              <span className={styles.dayLabel}>{t("schools.day1")}</span>
              <ul className={styles.dayList}>
                <li>[PLACEHOLDER: day 1 morning session agenda]</li>
                <li>[PLACEHOLDER: day 1 afternoon session agenda]</li>
                <li>[PLACEHOLDER: workbook walkthrough details]</li>
              </ul>
            </div>
            <div className={styles.dayCard}>
              <span className={styles.dayLabel}>{t("schools.day2")}</span>
              <ul className={styles.dayList}>
                <li>[PLACEHOLDER: day 2 morning session agenda]</li>
                <li>[PLACEHOLDER: day 2 afternoon session agenda]</li>
                <li>[PLACEHOLDER: closing activity / take-home action]</li>
              </ul>
            </div>
            <div className={styles.provideCard}>
              <h4>{t("schools.provide")}</h4>
              <ul className={styles.provideList}>
                <li>A classroom or hall that seats the participating grade levels</li>
                <li>A projector or screen for both sessions</li>
                <li>Two consecutive school days, or two half-day slots</li>
                <li>One staff coordinator as our point of contact</li>
              </ul>
            </div>
          </div>

          <div className={styles.formCard}>
            <h3>{t("schools.contact")}</h3>
            <p className={styles.formDesc}>{t("schools.contactBody")}</p>
            <form className={styles.formGrid} onSubmit={handleSubmit}>
              <div className={styles.formField}>
                <label htmlFor="school">{t("schools.form.school")}</label>
                <input id="school" required value={form.school} onChange={(e) => update("school", e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="contactName">{t("schools.form.contactName")}</label>
                <input id="contactName" required value={form.contactName} onChange={(e) => update("contactName", e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email">{t("schools.form.email")}</label>
                <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="grade">{t("schools.form.grade")}</label>
                <input id="grade" value={form.grade} onChange={(e) => update("grade", e.target.value)} placeholder="e.g. 9–10" />
              </div>
              <div className={`${styles.formField} ${styles.full}`}>
                <label htmlFor="message">{t("schools.form.message")}</label>
                <textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} />
              </div>
              <div className={styles.submitRow}>
                <button type="submit" className="btn btn-primary">
                  {t("schools.form.submit")}
                </button>
                <span className={styles.emailNote}>[PLACEHOLDER: confirm contact email — currently {CONTACT_EMAIL}]</span>
                {submitted && <span className={styles.successMsg}>Opening your email client…</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
