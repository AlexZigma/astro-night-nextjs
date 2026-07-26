import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { numberToRating } from "@/lib/utils";

import styles from "./card.module.scss";

interface CardPosterProps {
  rating: number;
  image?: string;
  isBig?: boolean;
}

export const CardPoster = memo(function CardPoster({
  rating,
  image = "/imgs/cardbg.webp",
  isBig,
}: CardPosterProps) {
  const posterRating = numberToRating(rating);
  return (
    <div className={clsx(styles.poster, isBig && styles.posterBig)}>
      <Image className={styles.posterImage} src={image} alt="movie card" fill />
      <span
        className={clsx(styles.posterRating, isBig && styles.posterRatingBig)}
      >
        {posterRating}
      </span>
    </div>
  );
});

interface MovieCardProps {
  id: string;
  image?: string;
  title: string;
  year: number;
  rating: number;
  variant?: null | "small" | "xsmall";
}

export default memo(function Card({
  id,
  image,
  title,
  year,
  rating,
  variant,
}: MovieCardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        variant === "small" && styles.cardSmall,
        variant === "xsmall" && styles.cardXSmall,
      )}
    >
      <CardPoster rating={rating} image={image} />
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardSubtitle}>{year}</p>
      </div>
      <Link className={styles.cardLink} href={`/items/${id}`} />
    </div>
  );
});
