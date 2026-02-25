import clsx from "clsx";
import Image from "next/image";

import styles from "./card.module.scss";

interface CardProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  subtitle: string;
  rating: string;
  small?: boolean;
}

export default function Card({
  imgSrc,
  imgAlt,
  title,
  subtitle,
  rating,
  small,
}: CardProps) {
  return (
    <div className={clsx(styles.card, small && styles.cardSmall)}>
      <div className={styles.cardTop}>
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt={imgAlt}
          width={280}
          height={400}
        />
        <span className={styles.cardRating}>{rating}</span>
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardSubtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
