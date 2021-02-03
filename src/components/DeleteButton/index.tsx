// import modules
import React from "react";
import Button from "components/Button";
// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ButtonEdit(props: { dark?: boolean }) {
  // set the button type
  const type = props.dark ? "delete-dark" : "delete";
  return (
    <Button className={styles.delete} type={type}>
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
}
