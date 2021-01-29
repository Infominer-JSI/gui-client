// import modules
import React from "react";
import Button from "components/Button";
// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ButtonEdit() {
  return (
    <Button className={styles.delete} type="delete">
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
}
