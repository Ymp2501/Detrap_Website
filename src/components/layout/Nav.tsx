import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Nav.module.css";

const sections = [
  { id: "guide", key: "guide" },
  { id: "course", key: "course" },
  { id: "reports", key: "reports" },
  { id: "pdc", key: "pdc" },
  { id: "schools", key: "schools" },
  { id: "about", key: "about" },
] as const;

export function Nav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  function changeLang(lng: "en" | "hi") {
    i18n.changeLanguage(lng);
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <a href="#top" className={styles.wordmark}>
        DE<span>-</span>TRAP
      </a>

      <ul className={styles.links}>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{t(`nav.${s.key}`)}</a>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <div className={styles.langToggle}>
          <button className={i18n.language === "en" ? "active" : ""} onClick={() => changeLang("en")}>
            EN
          </button>
          <button className={i18n.language === "hi" ? "active" : ""} onClick={() => changeLang("hi")}>
            हि
          </button>
        </div>
        <a href="#guide" className="btn btn-primary">
          {t("nav.cta")}
        </a>
        <button
          className={styles.burger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobilePanel}>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setMobileOpen(false)}>
              {t(`nav.${s.key}`)}
            </a>
          ))}
          <a href="#guide" onClick={() => setMobileOpen(false)}>
            {t("nav.cta")}
          </a>
        </div>
      )}
    </nav>
  );
}
