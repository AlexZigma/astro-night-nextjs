"use client";

import clsx from "clsx";
import { ChangeEvent, memo, useState } from "react";

import { useClickOutside } from "@/lib/hooks";
import { GENRES } from "@/models/tags/constants";
import { GenreType } from "@/models/tags/types";

import styles from "./movieModal.module.scss";

interface MultiSelectProps {
  id: string;
  isError?: boolean;
}

export default memo(function MultiSelect({ id, isError }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange =
    (tag: GenreType) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedTags((prev) => [...prev, tag]);
      } else {
        setSelectedTags((prev) => prev.filter((item) => item != tag));
      }
    };

  const tagsLength = selectedTags.length;
  let selectTitle = "genre*";
  if (tagsLength > 1) {
    selectTitle = `${tagsLength} tags`;
  } else if (tagsLength === 1) {
    selectTitle = selectedTags[0];
  }

  return (
    <div className={styles.select}>
      <div
        ref={menuRef}
        className={clsx(
          styles.input,
          styles.selectInner,
          isOpen && styles.selectInnerOpen,
          isError && styles.selectInnerInvalid,
        )}
      >
        <button
          type="button"
          className={clsx(
            styles.selectHeader,
            isOpen && styles.selectHeaderOpen,
            tagsLength > 0 && styles.selectHeaderActive,
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectTitle}
        </button>

        <div
          className={clsx(styles.selectItems, isOpen && styles.selectItemsOpen)}
        >
          {GENRES.map((tag) => (
            <div key={tag} className={styles.selectItem}>
              <label htmlFor={tag} className={styles.selectLabel}>
                {tag}
              </label>
              <input
                id={tag}
                name={id}
                value={tag}
                type="checkbox"
                className={styles.selectCheckbox}
                onChange={handleTagChange(tag)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
