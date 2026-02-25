import styles from "./Footer.module.scss";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerTitle}>.all rights reserved.</p>
        <p className={styles.footerSubtitle}>
          Copyright © {date} SALT AND PEPPER
        </p>
      </div>
    </footer>
  );
}
