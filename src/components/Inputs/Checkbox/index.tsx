import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface ICheckbox {
  className?: any;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  checked?: boolean;
  label?: string;
}

//===============================================
// Define the component
//===============================================

export default function Checkbox(props: ICheckbox) {
  const { onClick = (e) => {}, checked, className, label } = props;

  // set the container classes
  const containerClass = cn(styles.container, className, {
    [styles.labelled]: label,
  });

  // create a random name for the checkbox
  const name = Math.random().toFixed(10).split(".")[1];
  return (
    <div className={containerClass} onClick={onClick}>
      {label}
      <input
        type="checkbox"
        name={name}
        onChange={() => {}}
        checked={checked}
      />
      <label htmlFor={name}></label>
    </div>
  );
}
