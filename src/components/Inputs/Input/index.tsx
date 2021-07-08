import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IInput {
  className?: any;
  type: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  message?: string;
}

//===============================================
// Define the component
//===============================================

export default function Input(props: IInput) {
  const {
    type,
    name,
    value,
    placeholder,
    onChange = (e) => {},
    required,
    label,
    className,
    disabled,
    invalid = false,
    message,
  } = props;

  const containerClass = cn(styles.container, className, {
    [styles.invalid]: invalid && !disabled,
    [styles.labelled]: label,
  });

  return (
    <div className={containerClass}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {label ? <label htmlFor={name}>{label}</label> : null}
      {invalid && !disabled ? (
        <div className={styles.message}>{message}</div>
      ) : null}
    </div>
  );
}
