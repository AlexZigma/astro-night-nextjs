import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { MovieCard } from "@/models/movies/types";

import styles from "./card.module.scss";

export const CardPoster = memo(function CardPoster({
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
      <span
        className={clsx(styles.posterRating, isBig && styles.posterRatingBig)}
      >
        {Number(rating).toFixed(1)}
      </span>
    </div>
  );
});

export default memo(function Card({
  id,
  image,
  title,
  year,
  rating,
  isSmall,
}: MovieCard) {
  return (
    <div className={clsx(styles.card, isSmall && styles.cardSmall)}>
      <Link className={styles.cardLink} href={`/items/${id}`} />
      <CardPoster rating={rating} image={image} />
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardSubtitle}>{year}</p>
      </div>
    </div>
  );
});
