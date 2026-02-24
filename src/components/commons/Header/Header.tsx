"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import PlusButton from "../Button/PlusButton";
import styles from "./Header.module.scss";

export default function Header({ className }: { className?: string }) {
  const navigation = [
    { link: "/storage", label: ".storage." },
    { link: "/about", label: ".about." },
    { link: "/search", label: ".search." },
  ];

  const [menuOpen, setmenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuClick = () => {
    setmenuOpen((prev) => !prev);
    document.body.classList.toggle("noScroll", !menuOpen);
  };

  const handleLinkClick = () => {
    setmenuOpen(false);
    document.body.classList.toggle("noScroll", false);
  };

  return (
    <header className={clsx(styles.header, className)}>
      <div className={styles.headerContent}>
        <button
          className={clsx(styles.headerMenu, menuOpen && styles.headerMenuOpen)}
          onClick={() => handleMenuClick()}
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
          />
        </Link>
        <nav
          className={clsx(styles.headerNav, menuOpen && styles.headerNavOpen)}
        >
          <ul className={styles.headerNavList}>
            {navigation.map((navItem) => (
              <li key={navItem.link}>
                <Link
                  href={navItem.link}
                  onClick={handleLinkClick}
                  className={clsx(
                    styles.headerNavLink,
                    pathname === navItem.link && styles.headerNavLinkActive,
                  )}
                >
                  {navItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <PlusButton />
      </div>
    </header>
  );
}
