import { IButtonDelete } from "Interfaces";

// import modules
import React from "react";
import Button from "components/Inputs/Button";
import classnames from "classnames";

// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ButtonDelete(props: IButtonDelete) {
  const { className, onClick, size = "medium", dark } = props;

  const buttonStyle = classnames(styles.delete, className, {
    [styles.medium]: size === "medium",
    [styles.small]: size === "small",
  });

  // set the button type
  const type = dark ? "delete-dark" : "delete";
  return (
    <Button className={buttonStyle} onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
}
