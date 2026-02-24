import clsx from "clsx";

import styles from "./Button.module.scss";

export default function ArrowButton({
  variant,
  onClick,
}: {
  variant: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={() => onClick()}
      className={clsx(
        styles.arrowButton,
        variant === "left" ? styles.arrowButtonLeft : styles.arrowButtonRight,
      )}
    />
  );
}
