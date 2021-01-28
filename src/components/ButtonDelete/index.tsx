// import interfaces
import { IButton } from "Interfaces";
// import modules
import React from "react";
import Button from "components/Button";
// import styles and images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ButtonEdit(props: IButton) {
  return (
    <Button width="40px" height="40px" type="delete">
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
}
