"use client";

import clsx from "clsx";
import { useState } from "react";

import styles from "./movieModal.module.scss";

export default function StarsRange({
  id,
  maxLength = 10,
}: {
  id: string;
  maxLength?: number;
}) {
  const [value, setValue] = useState(0.0);

  const active = Math.trunc(value);
  const half = Number(value % 1 > 0);
  const inactive = maxLength - active - half;

  return (
    <div className={styles.stars}>
      <div className={styles.starsInput}>
        <input
          id={id}
          name={id}
          type="range"
          className={styles.starsRange}
          min={0}
          max={maxLength}
          step={0.5}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        {Array.from({ length: active }, (_, index) => (
          <div
            key={`a${index}`}
            className={clsx(styles.star, styles.starActive)}
          />
        ))}
        {Array.from({ length: half }, (_, index) => (
          <div
            key={`b${index}`}
            className={clsx(styles.star, styles.starHalf)}
          />
        ))}
        {Array.from({ length: inactive }, (_, index) => (
          <div key={`c${index}`} className={styles.star} />
        ))}
      </div>
      <label className={styles.starsLabel}>
        {value.toFixed(1).toString().replace(".", ",")}
      </label>
    </div>
  );
}
