import SmallButton from "@/components/commons/Button/SmallButton";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main>
      <section className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <p className={styles.notFoundTitle}>{`There's nothing there...`}</p>
          <p className={styles.notFound404}>404</p>
          <SmallButton variant="active" href="/">
            .go back.
          </SmallButton>
        </div>
      </section>
    </main>
  );
}
