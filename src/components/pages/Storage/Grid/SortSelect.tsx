import clsx from "clsx";
import { useState } from "react";

import SmallButton from "@/components/commons/Button/SmallButton";
import { useAppDispatch, useAppSelector, useClickOutside } from "@/lib/hooks";
import { SortFields } from "@/models/movies/constants";
import { setSortField } from "@/models/movies/moviesSlice";
import { selectSortField } from "@/models/movies/selectors";
import { SortField } from "@/models/movies/types";

import styles from "./grid.module.scss";

export default function SortSelect() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const sortField = useAppSelector(selectSortField);

  const selectRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleOptionChange = (field: SortField) => () => {
    dispatch(setSortField(field));
  };

  return (
    <div className={styles.select} ref={selectRef}>
      <SmallButton
        className={styles.selectButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {sortField ?? "sort by"}
      </SmallButton>
      {isOpen && (
        <ul className={styles.selectList}>
          {SortFields.map((field) => (
            <li key={field}>
              <button
                className={clsx(
                  styles.selectItem,
                  sortField === field && styles.selectItemActive,
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
