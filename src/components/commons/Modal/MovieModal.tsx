"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { SubmitEventHandler, useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector, useClickOutside } from "@/lib/hooks";
import { imgToBase64 } from "@/lib/utils";
import { closeModal } from "@/models/modal/modalSlice";
import { selectModal } from "@/models/modal/selectors";
import { ModalMode } from "@/models/modal/types";
import {
  addMovieRequest,
  deleteMovieRequest,
  editMovieRequest,
} from "@/models/movies/moviesSlice";
import { MoviePayload } from "@/models/movies/types";
import { Genre } from "@/models/tags/types";

import SmallButton from "../Button/SmallButton";
import ConfirmModal from "./ConfirmModal";
import ImageInput from "./ImageInput";
import styles from "./movieModal.module.scss";
import MultiSelect from "./MultiSelect";
import StarsRange from "./StarsRange";

export default function MovieModal() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();
  const {
    isOpen: isModalOpen,
    mode: modalMode,
    currentMovie,
  } = useAppSelector(selectModal);

  const router = useRouter();
  const pathname = usePathname();

  const modalRef = useClickOutside<HTMLFormElement>(() => {
    if (isModalOpen && !isDeleting) dispatch(closeModal());
  });

  const handleCloseModal = useCallback(() => {
    setErrors({});
    setIsDeleting(false);
    dispatch(closeModal());
  }, [dispatch]);

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    },
    [handleCloseModal],
  );

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleDeleteMovie = () => {
    if (!currentMovie) return;

    dispatch(deleteMovieRequest(currentMovie.id));
    setIsDeleting(false);
    router.push("/items");
  };

  useEffect(() => {
    if (!isModalOpen) return;
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleEsc, isModalOpen]);

  useEffect(() => {
    dispatch(closeModal());
  }, [pathname, dispatch]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!event.target) return;

    const formData = new FormData(event.target);

    const rating = Number(formData.get("rating")) || 0;
    const title = formData.get("title")?.toString().trim() ?? "";
    const year = Number(formData.get("year")) || 0;
    const genres = formData.getAll("genre").map(String) as Genre[];
    const director = formData.get("director")?.toString().trim() ?? "";
    const mainActors = formData.get("mainActors")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";
    const image = formData.get("image") as File | null;

    const newErrors: Record<string, string> = {};

    if (!title) {
      newErrors.title = "you should complete this area";
    }

    if (!year) {
      newErrors.year = "you should complete this area";
    } else if (year < 999 || year > 9999) {
      newErrors.year = "you should use valid year (YYYY)";
    }

    if (genres.length === 0) {
      newErrors.genre = "you should choose atleast 1 genre";
    }

    let imageBase64;
    if (image && image.size > 0) {
      imageBase64 = await imgToBase64(image);
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
      image: imageBase64,
      rating,
    };

    if (modalMode === ModalMode.Edit && currentMovie) {
      dispatch(editMovieRequest({ id: currentMovie.id, ...payload }));
    } else {
      dispatch(addMovieRequest(payload));
    }
  };

  const modalTitle = modalMode === ModalMode.Add ? "Add movie" : "Edit movie";

  if (!isModalOpen) return null;

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
            <StarsRange id="rating" defaultValue={currentMovie?.rating} />

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

          {modalMode === ModalMode.Edit && (
            <SmallButton type="button" onClick={handleDeleteClick}>
              .trash!.
            </SmallButton>
          )}
        </div>
      </form>
      {isDeleting && (
        <ConfirmModal
          onClose={() => setIsDeleting(false)}
          onConfirm={handleDeleteMovie}
        />
      )}
    </div>
  );
}
