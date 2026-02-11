import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  icon?: React.ElementType;
  iconColor?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function Button({
  variant = "secondary",
  icon: Icon,
  iconColor = "black",
  disabled = false,
  children,
  onClick,
  className = "",
}: ButtonProps) {
  const buttonClass = variant === "primary" ? styles.primary : styles.secondary;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.btn} ${buttonClass} ${className}`}
    >
      {Icon && <Icon className={styles.icon} style={{ color: iconColor }} />}
      {children}
    </button>
  );
}

export default Button;
