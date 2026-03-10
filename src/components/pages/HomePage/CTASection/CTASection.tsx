"use client";

import SmallButton from "@/components/commons/Button/SmallButton";
import { openModal } from "@/lib/features/modal/modalSlice";
import { useAppDispatch } from "@/lib/hooks";

import styles from "./cta.module.scss";

export default function CTASection() {
  const dispatch = useAppDispatch();

  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaTitle}>Would you like to add something?</p>
        <SmallButton variant="active" onClick={() => dispatch(openModal())}>
          .yes.
        </SmallButton>
      </div>
    </section>
  );
}
