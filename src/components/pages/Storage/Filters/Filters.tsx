import SmallButton from "@/components/commons/Button/SmallButton";
import { GENRES } from "@/models/tags/constants";

import styles from "./filters.module.scss";

export default function Filters() {
  return (
    <section className={styles.filters}>
      <p className={styles.filtersTitle}>Filter ( 0 )</p>
      <div className={styles.filtersList}>
        {GENRES.map((tag) => (
          <SmallButton key={tag}>{tag}</SmallButton>
        ))}
      </div>
    </section>
  );
}
