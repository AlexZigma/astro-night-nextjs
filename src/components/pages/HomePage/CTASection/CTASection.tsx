import { useModal } from "@/app/(main)/ModalProvider";
import SmallButton from "@/components/commons/Button/SmallButton";

import styles from "./cta.module.scss";

export default function CTASection() {
  const { openModal } = useModal();
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaTitle}>Would you like to add something?</p>
        <SmallButton variant="active" onClick={() => openModal()}>
          .yes.
        </SmallButton>
      </div>
    </section>
  );
}
