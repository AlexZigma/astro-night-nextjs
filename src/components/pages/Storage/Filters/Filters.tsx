import SmallButton from "@/components/commons/Button/SmallButton";
import { TAGS } from "@/models/tags/consts";

import styles from "./filters.module.scss";

export default function Filters() {
  return (
    <section className={styles.filters}>
      <p className={styles.filtersTitle}>Filter ( 0 )</p>
      <div className={styles.filtersList}>
        {TAGS.map((tag) => (
          <SmallButton key={tag}>{tag}</SmallButton>
        ))}
      </div>
    </section>
  );
}
