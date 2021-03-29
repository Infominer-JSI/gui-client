import ReactModal from "react-modal";
import Button from "components/Inputs/Button";
// import interfaces
import { IModal } from "Interfaces";
// import modules
import cn from "classnames";
// import styles and images
import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

export default function Modal(props: IModal) {
  // set the app element to the modal
  ReactModal.setAppElement(document.body);

  const { type, backClick, execClick } = props;
  // get the generated values
  const symbol = getSymbol(type);
  const title = getTitle(type);
  const description = getDescription(type);

  const contentClass = cn(styles.content, {
    [styles.delete]: type === "delete",
    [styles.edit]: type === "edit",
  });

  return (
    <ReactModal
      isOpen={true}
      className={contentClass}
      overlayClassName={styles.overlay}
      aria={{
        labelledby: styles.title,
        describedby: styles.description,
      }}
    >
      <div className={styles.image}>
        <div className={styles.symbol}>{symbol}</div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.actions}>
        <Button
          type="full"
          size="medium"
          color="blue"
          intensity="dark"
          text="No, go back"
          onClick={backClick}
        />
        <Button
          type="outline"
          size="medium"
          color="red"
          intensity="dark"
          text="Yes, delete!"
          onClick={execClick}
        />
      </div>
    </ReactModal>
  );
}

function getTitle(type: string) {
  switch (type) {
    case "edit":
      return "Edit this subset";
    case "delete":
      return "Are you sure?";
    default:
      return "";
  }
}

function getDescription(type: string) {
  switch (type) {
    case "edit":
      return "Edit this subset";
    case "delete":
      return `
        You will lose some of your analysis results.
        Are you sure you want to proceed?
      `;
    default:
      return "";
  }
}

function getSymbol(type: string) {
  switch (type) {
    case "edit":
      return <FontAwesomeIcon icon={faEdit} />;
    case "delete":
      return <FontAwesomeIcon icon={faExclamation} />;
    default:
      return "";
  }
}
