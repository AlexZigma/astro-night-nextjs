import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerTitle}>.all rights reserved.</p>
        <p className={styles.footerSubtitle}>
          Copyright © 2025 SALT AND PEPPER
        </p>
      </div>
    </footer>
  );
}
