"use client";

import clsx from "clsx";
import { memo, useState } from "react";

import { numberToRating } from "@/lib/utils";

import styles from "./movieModal.module.scss";

interface StartRangeProps {
  id: string;
  maxLength?: number;
  defaultValue?: number;
}

export default memo(function StarsRange({
  id,
  maxLength = 10,
  defaultValue = 0,
}: StartRangeProps) {
  const [value, setValue] = useState(defaultValue);

  const activeCount = Math.trunc(value);
  const halfActiveCount = Number(value % 1 > 0);
  const inactiveCount = maxLength - activeCount - halfActiveCount;

  const rangeRating = numberToRating(value);

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
        {Array.from({ length: activeCount }, (_, index) => (
          <div
            key={`a${index}`}
            className={clsx(styles.star, styles.starActive)}
          />
        ))}
        {Array.from({ length: halfActiveCount }, (_, index) => (
          <div
            key={`b${index}`}
            className={clsx(styles.star, styles.starHalf)}
          />
        ))}
        {Array.from({ length: inactiveCount }, (_, index) => (
          <div key={`c${index}`} className={styles.star} />
        ))}
      </div>
      <label className={styles.starsLabel}>{rangeRating}</label>
    </div>
  );
});
