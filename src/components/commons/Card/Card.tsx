import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import styles from "./card.module.scss";

interface CardProps {
  id: string;
  image?: string;
  title: string;
  year: string;
  rating: string;
  small?: boolean;
}

export function CardPoster({
  rating,
  image = "/imgs/cardbg.webp",
  isBig,
}: {
  rating: string;
  image?: string;
  isBig?: boolean;
}) {
  return (
    <div className={clsx(styles.poster, isBig && styles.posterBig)}>
      <Image className={styles.posterImage} src={image} alt="movie card" fill />
      <span className={styles.posterRating}>{Number(rating).toFixed(1)}</span>
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
