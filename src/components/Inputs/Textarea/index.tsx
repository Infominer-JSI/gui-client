import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface ITextarea {
  className?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  rows?: number;
  cols?: number;
}

//===============================================
// Define the component
//===============================================

export default function Textarea(props: ITextarea) {
  const {
    name,
    value,
    className,
    placeholder,
    onChange = (e) => {},
    required,
    disabled,
    label,
    rows = 1,
    cols,
  } = props;

  const containerClass = cn(styles.container, className, {
    [styles.labelled]: label,
  });

  return (
    <div className={containerClass}>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        cols={cols}
      />
      {label ? <label htmlFor={name}>{label}</label> : null}
    </div>
  );
}
