import { memo, useState } from "react";

import styles from "./grid.module.scss";

type Sort = "none" | "asc" | "desc";

function SortToggle() {
  const [sort, setSort] = useState<Sort>("none");

  return (
    <button
      className={styles.toggle}
      onClick={() =>
        setSort((prev) =>
          prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
        )
      }
    >
      <svg
        className={styles.toggleSvg}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity={sort === "asc" ? "1" : "0.3"}
          d="M8.24393 15.778L16.122 7.99981L24 15.778M16.3465 10L16.3465 30"
          stroke="#F12660"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={sort === "desc" ? "1" : "0.3"}
          d="M41.7561 34.222L33.878 42.0002L26 34.222M33.6535 40L33.6535 20"
          stroke="#F12660"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default memo(SortToggle);
