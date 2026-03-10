import { memo } from "react";

import styles from "./grid.module.scss";

function PageMarker({
  onClick,
  isActive = false,
}: {
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className={styles.marker}>
      <svg
        className={styles.markerSvg}
        viewBox="0 0 20 20"
        fill={isActive ? "#F12660" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="8" stroke="#F12660" strokeWidth="2" />
      </svg>
    </button>
  );
}

export default memo(PageMarker);
