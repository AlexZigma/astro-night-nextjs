import SmallButton from "@/components/commons/Button/SmallButton";
import Header from "@/components/commons/Header/Header";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <>
      <Header className={styles.notFoundHeader} />
      <main>
        <section className={styles.notFound}>
          <div className={styles.notFoundContent}>
            <p className={styles.notFoundTitle}>{`There's nothing there...`}</p>
            <p className={styles.notFound404}>404</p>
            <SmallButton active href="/">
              .go back.
            </SmallButton>
          </div>
        </section>
      </main>
    </>
  );
}
