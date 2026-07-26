"use client";

import SmallButton from "@/components/commons/Button/SmallButton";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/models/modal/modalSlice";
import { ModalMode } from "@/models/modal/types";

import styles from "./cta.module.scss";

export default function CTASection() {
  const dispatch = useAppDispatch();

  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaTitle}>Would you like to add something?</p>
        <SmallButton
          variant="active"
          onClick={() => dispatch(openModal({ mode: ModalMode.Add }))}
        >
          .yes.
        </SmallButton>
      </div>
    </section>
  );
}
