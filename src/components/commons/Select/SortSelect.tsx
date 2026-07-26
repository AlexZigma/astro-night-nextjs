import clsx from "clsx";
import { useState } from "react";

import SmallButton from "@/components/commons/Button/SmallButton";
import { useClickOutside } from "@/lib/hooks";
import { sortFields } from "@/models/movies/constants";
import { SortField } from "@/models/movies/types";

import styles from "./select.module.scss";

interface SortSelectProps {
  selectedSort: SortField | null;
  onChange: (field: SortField) => void;
}

export default function SortSelect({
  selectedSort,
  onChange,
}: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleOptionChange = (field: SortField) => () => {
    onChange(field);
  };

  return (
    <div className={styles.select} ref={selectRef}>
      <SmallButton
        className={styles.selectButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedSort ?? "sort by"}
      </SmallButton>
      {isOpen && (
        <ul className={styles.selectList}>
          {sortFields.map((field) => (
            <li key={field}>
              <button
                className={clsx(
                  styles.selectItem,
                  selectedSort === field && styles.selectItemActive,
                )}
                onClick={handleOptionChange(field)}
              >
                {field}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
