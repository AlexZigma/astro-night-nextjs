import clsx from "clsx";
import Link from "next/link";
import React from "react";

import styles from "./Button.module.scss";
export default function SmallButton({
  children,
  active,
  href,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const className = clsx(
    styles.smallButton,
    active && styles.smallButtonActive,
  );
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
