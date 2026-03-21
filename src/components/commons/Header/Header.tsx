"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import PlusButton from "@/components/commons/Button/PlusButton";
import { useAppDispatch, useClickOutside, useScrollLock } from "@/lib/hooks";
import { openModal } from "@/models/modal/modalSlice";
import { ModalMode } from "@/models/modal/types";
import { NAV_ITEMS } from "@/models/nav/constants";

import styles from "./Header.module.scss";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const headerRef = useClickOutside<HTMLHeadElement>(() => {
    setIsSearchOpen(false);
  });

  useScrollLock(isMenuOpen);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearchCLick = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.headerContent}>
        <button
          className={clsx(
            styles.headerMenu,
            isMenuOpen && styles.headerMenuOpen,
          )}
          onClick={handleMenuClick}
        >
          <span className={styles.menuLine} />
        </button>
        <Link href="/" onClick={handleLinkClick}>
          <Image
            className={styles.headerLogo}
            src="/icons/logo.svg"
            alt="astro night logo"
            width={120}
            height={74}
            loading="eager"
          />
        </Link>
        <nav
          className={clsx(styles.headerNav, isMenuOpen && styles.headerNavOpen)}
        >
          <ul className={styles.headerNavList}>
            {NAV_ITEMS.map((navItem) => (
              <li key={navItem.link}>
                <Link
                  href={navItem.link}
                  onClick={handleLinkClick}
                  className={clsx(
                    styles.headerNavLink,
                    pathname === navItem.link &&
                      !isSearchOpen &&
                      styles.headerNavLinkActive,
                  )}
                >
                  {navItem.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                className={clsx(
                  styles.headerNavLink,
                  isSearchOpen && styles.headerNavLinkActive,
                )}
                onClick={handleSearchCLick}
              >
                .search.
              </button>
            </li>
          </ul>
        </nav>
        <PlusButton
          onClick={() => dispatch(openModal({ mode: ModalMode.Add }))}
        />
      </div>
      {isSearchOpen && <HeaderSearch onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
}
