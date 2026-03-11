"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { SubmitEventHandler, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector, useClickOutside } from "@/lib/hooks";
import { closeModal } from "@/models/modal/modalSlice";
import { addMovie, deleteMovie, editMovie } from "@/models/movies/moviesSlice";
import { MoviePayload } from "@/models/movies/types";
import { Genre } from "@/models/tags/types";

import SmallButton from "../Button/SmallButton";
import ImageInput from "./ImageInput";
import styles from "./movieModal.module.scss";
import MultiSelect from "./MultiSelect";
import StarsRange from "./StarsRange";

export default function MovieModal() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const currentMovie = useAppSelector((state) => state.modal.currentMovie);

  const router = useRouter();

  const modalRef = useClickOutside<HTMLFormElement>(() => {
    if (isModalOpen) dispatch(closeModal());
  });

  useEffect(() => {
    if (!isModalOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!event.target) return;

    const formData = new FormData(event.target);

    const rating = formData.get("rating")?.toString() ?? "";
    const title = formData.get("title")?.toString().trim() ?? "";
    const year = formData.get("year")?.toString().trim() ?? "";
    const genres = formData.getAll("genre").map(String) as Genre[];
    const director = formData.get("director")?.toString().trim() ?? "";
    const mainActors = formData.get("mainActors")?.toString().trim() ?? "";
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

    const payload: MoviePayload = {
      title,
      year,
      genres,
      director,
      mainActors,
      description,
      image: "/imgs/cardbg.webp",
      rating,
    };

    if (currentMovie) {
      dispatch(editMovie({ id: currentMovie.id, ...payload }));
    } else {
      dispatch(addMovie(payload));
    }
    dispatch(closeModal());
  };

  if (!isModalOpen) return null;

  const handleCloseModal = () => {
    setErrors({});
    dispatch(closeModal());
  };

  const handleDeleteMovie = () => {
    if (!currentMovie) return;
    dispatch(deleteMovie(currentMovie.id));
    dispatch(closeModal());
    router.push("/storage");
  };

  const modalTitle = currentMovie ? "Edit movie" : "Add movie";

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit} ref={modalRef}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>{modalTitle}</p>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCloseModal}
          />
        </div>

        <section className={styles.modalContent}>
          <ImageInput id="image" defaultValue={currentMovie?.image} />
          <div className={styles.modalInputs}>
            <StarsRange
              id="rating"
              defaultValue={
                currentMovie?.rating ? Number(currentMovie?.rating) : 0
              }
            />

            <div className={styles.field}>
              <input
                id="title"
                name="title"
                className={clsx(
                  styles.input,
                  errors.title && styles.inputInvalid,
                )}
                placeholder="title*"
                defaultValue={currentMovie?.title}
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
                defaultValue={currentMovie?.director}
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
                defaultValue={currentMovie?.year}
              />
              {errors.year && (
                <span className={styles.inputError}>{errors.year}</span>
              )}
            </div>

            <div className={styles.field}>
              <MultiSelect
                id="genre"
                isError={Boolean(errors.genre)}
                defaultValue={currentMovie?.genres}
              />
              {errors.genre && (
                <span className={styles.inputError}>{errors.genre}</span>
              )}
            </div>

            <div className={styles.field}>
              <input
                id="mainActors"
                name="mainActors"
                className={styles.input}
                placeholder="main actors"
                defaultValue={currentMovie?.mainActors}
              />
            </div>

            <textarea
              id="description"
              name="description"
              className={clsx(styles.input, styles.inputTextArea)}
              placeholder="description"
              defaultValue={currentMovie?.description}
            />
          </div>
        </section>

        <div className={styles.modalFooter}>
          <SmallButton type="submit" variant="hover">
            .done!.
          </SmallButton>

          {currentMovie && (
            <SmallButton type="button" onClick={handleDeleteMovie}>
              .trach!.
            </SmallButton>
          )}
        </div>
      </form>
    </div>
  );
}
