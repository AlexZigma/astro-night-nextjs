"use client";

import clsx from "clsx";
import { SubmitEventHandler, useEffect, useState } from "react";

import { useModal } from "@/app/(main)/ModalProvider";
import { useClickOutside } from "@/utils/hooks";

import SmallButton from "../Button/SmallButton";
import ImageInput from "./ImageInput";
import styles from "./movieModal.module.scss";
import MultiSelect from "./MultiSelect";
import StarsRange from "./StarsRange";

export default function MovieModal() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isModalOpen, closeModal } = useModal();

  const modalRef = useClickOutside<HTMLFormElement>(() => {
    if (isModalOpen) closeModal();
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!event.target) return;

    const formData = new FormData(event.target);

    const image = formData.get("image");
    const rating = formData.get("rating")?.toString();
    const title = formData.get("title")?.toString().trim() ?? "";
    const year = formData.get("year")?.toString().trim() ?? "";
    const genres = formData.getAll("genre").map(String);
    const director = formData.get("director")?.toString().trim() ?? "";
    const mainActor = formData.get("mainActor")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";

    const newErrors: Record<string, string> = {};

    if (!title) {
      newErrors.title = "you should complete this area";
    }

    if (!year) {
      newErrors.year = "you should complete this area";
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = "you should use valid year (YYYY)";
    }

    if (genres.length === 0) {
      newErrors.genre = "you should choose atleast 1 genre";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    const payload = {
      title,
      year,
      genres,
      director,
      mainActor,
      description,
      image,
      rating,
    };

    console.log(payload);
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit} ref={modalRef}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>Add movie</p>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => closeModal()}
          />
        </div>

        <section className={styles.modalContent}>
          <ImageInput id="image" />
          <div className={styles.modalInputs}>
            <StarsRange id="rating" />

            <div className={styles.field}>
              <input
                id="title"
                name="title"
                className={clsx(
                  styles.input,
                  errors.title && styles.inputInvalid,
                )}
                placeholder="title*"
              />
              {errors.title && (
                <span className={styles.inputError}>{errors.title}</span>
              )}
            </div>

            <div className={styles.field}>
              <input
                id="director"
                name="director"
                className={styles.input}
                placeholder="director"
              />
            </div>

            <div className={styles.field}>
              <input
                id="year"
                name="year"
                className={clsx(
                  styles.input,
                  errors.year && styles.inputInvalid,
                )}
                placeholder="year*"
                inputMode="numeric"
              />
              {errors.year && (
                <span className={styles.inputError}>{errors.year}</span>
              )}
            </div>

            <div className={styles.field}>
              <MultiSelect id="genre" isError={Boolean(errors.genre)} />
              {errors.genre && (
                <span className={styles.inputError}>{errors.genre}</span>
              )}
            </div>

            <div className={styles.field}>
              <input
                id="mainActor"
                name="mainActor"
                className={styles.input}
                placeholder="main actor"
              />
            </div>

            <textarea
              id="description"
              name="description"
              className={clsx(styles.input, styles.inputTextArea)}
              placeholder="description"
            />
          </div>
        </section>

        <div className={styles.modalFooter}>
          <SmallButton type="submit" variant="hover">
            .done!.
          </SmallButton>
        </div>
      </form>
    </div>
  );
}
