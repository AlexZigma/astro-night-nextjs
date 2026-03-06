import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import styles from "./card.module.scss";

interface CardProps {
  id: string;
  image: string;
  title: string;
  year: string;
  rating: string;
  small?: boolean;
}

export function CardPoster({
  rating,
  image,
  className,
}: {
  rating: string;
  image: string;
  className?: string;
}) {
  return (
    <div className={clsx(styles.cardPoster, className)}>
      <Image
        className={styles.cardImg}
        src={image}
        alt="movie card"
        // width={280}
        // height={400}
        fill
      />
      <span className={styles.cardRating}>{rating}</span>
    </div>
  );
}

export default function Card({
  id,
  image,
  title,
  year,
  rating,
  small,
}: CardProps) {
  return (
    <div className={clsx(styles.card, small && styles.cardSmall)}>
      <Link className={styles.cardLink} href={`/items/${id}`} />
      <CardPoster rating={rating} image={image} />
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardSubtitle}>{year}</p>
      </div>
    </div>
  );
}
