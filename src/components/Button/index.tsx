// import interfaces
import { IButton } from "Interfaces";
// import modules
import React from "react";
// import styles and images
import styles from "./styles.module.scss";

export default function Button(props: IButton) {
  // get dataset information and set their state
  const { width = "40px", height = "40px", onClick, type, children } = props;
  // assign the style type
  let buttonStyle;
  switch (type) {
    case "edit":
      buttonStyle = styles.edit;
      break;
    case "delete":
      buttonStyle = styles.delete;
      break;
    default:
      buttonStyle = styles.default;
      break;
  }

  return (
    <button className={buttonStyle} style={{ width, height }} onClick={onClick}>
      {children}
    </button>
  );
}
