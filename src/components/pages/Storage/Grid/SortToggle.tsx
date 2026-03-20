import { memo } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSortOrder } from "@/models/movies/moviesSlice";
import { selectSortOrder } from "@/models/movies/selectors";

import styles from "./grid.module.scss";

function SortToggle() {
  const sortOrder = useAppSelector(selectSortOrder);
  const dispatch = useAppDispatch();

  return (
    <button className={styles.toggle} onClick={() => dispatch(setSortOrder())}>
      <svg
        className={styles.toggleSvg}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity={sortOrder === "desc" ? "1" : "0.3"}
          d="M8.24393 15.778L16.122 7.99981L24 15.778M16.3465 10L16.3465 30"
          stroke="#F12660"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={sortOrder === "asc" ? "1" : "0.3"}
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
