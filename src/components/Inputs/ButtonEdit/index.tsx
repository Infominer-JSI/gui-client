// import modules
import React from "react";
import Button from "components/Inputs/Button";
// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function ButtonEdit(props: { dark?: boolean }) {
  // set the button type
  const type = props.dark ? "edit-dark" : "edit";
  return (
    <Button className={styles.edit} type={type}>
      <FontAwesomeIcon icon={faPen} />
    </Button>
  );
}
