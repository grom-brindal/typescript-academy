import styles from "./topBar.module.css";

export default function LanguageIcon({
  language,
}: {
  language: "typescript" | "javascript" | "json";
}) {
  if (language === "javascript") {
    return <span className={styles.JS}>JS</span>;
  } else if (language === "typescript") {
    return <span className={styles.TS}>TS</span>;
  } else {
    return <span className={styles.JSON}>{`{ }`}</span>;
  }
}
