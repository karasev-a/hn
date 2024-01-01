import React, { ReactNode } from "react";

import styles from "./button.module.scss";

interface IButtonProps {
  name: string;
  type: "primary" | "secondary" | "text";
  value?: string;
  disabled?: boolean;
  isSelected?: boolean;
  handleClick?: () => void;
  children?: ReactNode;
}
const Button: React.FC<any> = ({
  name,
  value,
  type,
  isSelected,
  disabled,
  handleClick,
  children,
}: IButtonProps) => {
  return (
    <button
      className={`${styles[type]} ${isSelected ? styles.selected : ""}`}
      name={name}
      value={value}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
      {name}
    </button>
  );
};

export default Button;
