import SmallButton from "@/components/commons/Button/SmallButton";

import styles from "./cta.module.scss";

export default function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaTitle}>Would you like to add something?</p>
        <SmallButton active>.yes.</SmallButton>
      </div>
    </section>
  );
}
