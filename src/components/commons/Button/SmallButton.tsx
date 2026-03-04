import clsx from "clsx";
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

interface SmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "hover" | "active";
}

export default function SmallButton({
  children,
  href,
  onClick,
  className,
  variant,
  type = "button",
}: SmallButtonProps) {
  const clss = clsx(
    styles.smallButton,
    variant === "hover" && styles.smallButtonHover,
    variant === "active" && styles.smallButtonActive,
    className,
  );

  return href ? (
    <Link href={href} className={clss}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={clss}>
      {children}
    </button>
  );
}
