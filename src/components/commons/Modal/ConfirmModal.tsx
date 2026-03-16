import Image from "next/image";

import SmallButton from "../Button/SmallButton";
import styles from "./movieModal.module.scss";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div className={styles.confirm}>
      <div className={styles.confirmContent}>
        <Image
          width={40}
          height={40}
          alt="trash icon"
          src="/icons/trash.svg"
          className={styles.confirmIcon}
        />
        <p className={styles.confirmTitle}>Are you sure?</p>
        <div className={styles.confirmButtons}>
          <SmallButton onClick={onConfirm} variant="active">
            .yep.
          </SmallButton>
          <SmallButton onClick={onClose}>.nope.</SmallButton>
        </div>
      </div>
    </div>
  );
}
