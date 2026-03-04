"use client";

import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import styles from "./movieModal.module.scss";

export default function ImageInput({ id }: { id: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImageUrl(URL.createObjectURL(file));
    }
  };
  return (
    <div className={clsx(styles.picCard, styles.imageInput)}>
      {imageUrl && (
        <Image
          className={styles.imageInputPicture}
          width="400"
          height="600"
          alt="uploaded image"
          src={imageUrl}
        />
      )}
      <input
        id={id}
        name={id}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.imageInputButton}
      />
      <label htmlFor={id} className={styles.imageInputLabel}>
        {imageUrl ? "replace image" : "upload image"}
      </label>
    </div>
  );
}
