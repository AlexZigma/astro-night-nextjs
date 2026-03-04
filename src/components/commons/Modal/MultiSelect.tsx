"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";

import { TAGS } from "@/models/tags/consts";
import { Tag } from "@/models/tags/types";
import { useClickOutside } from "@/utils/hooks";

import styles from "./movieModal.module.scss";

interface MultiSelectProps {
  id: string;
  isError?: boolean;
}

export default function MultiSelect({ id, isError }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange =
    (tag: Tag) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedTags((prev) => [...prev, tag.label]);
      } else {
        setSelectedTags((prev) => prev.filter((item) => item != tag.label));
      }
      tag.isChecked = event.target.checked;
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
          {TAGS.map((tag) => (
            <div key={tag.label} className={styles.selectItem}>
              <label htmlFor={tag.label} className={styles.selectLabel}>
                {tag.label}
              </label>
              <input
                id={tag.label}
                name={id}
                value={tag.label}
                type="checkbox"
                className={styles.selectCheckbox}
                defaultChecked={tag.isChecked}
                onChange={handleTagChange(tag)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
