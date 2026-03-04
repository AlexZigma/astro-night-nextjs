import styles from "./Button.module.scss";

export default function PlusButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.buttonPlus} onClick={onClick}>
      add
    </button>
  );
}
