// import interfaces
import { IModal } from "Interfaces";

import ReactModal from "react-modal";
import Button from "components/Inputs/Button";
import classnames from "classnames";

// import styles and images
import styles from "./styles.module.scss";

export default function ModalBasic(props: IModal) {
  // set the app element to the modal
  ReactModal.setAppElement(document.body);

  // extract the component props
  const { type, isOpen, backClick, execClick, children } = props;

  // get the header title
  let headerTitle: string;
  switch (type) {
    case "delete":
      headerTitle = "Delete";
      break;
    case "edit":
      headerTitle = "Edit";
      break;
    case "exec":
      headerTitle = "Execute method";
      break;
  }

  // get the
  const modalStyle = classnames(styles.modal, {
    [styles.delete]: type === "delete",
    [styles.edit]: type === "edit",
    [styles.exec]: type === "exec",
  });

  return (
    <ReactModal
      isOpen={isOpen}
      className={modalStyle}
      overlayClassName={styles.overlay}
      aria={{
        labelledby: styles.title,
        describedby: styles.content,
      }}
    >
      <div className={styles.header}>
        <div className={styles.title}>{headerTitle}</div>
        <div className={styles.actions}>
          <Button
            type="outline"
            size="small"
            color="gray"
            icon="delete"
            intensity="light"
            onClick={backClick}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>{children}</div>
        {generateActions(type, backClick, execClick)}
      </div>
    </ReactModal>
  );
}

function generateActions(type: string, backFunction: any, execFunction: any) {
  let backType: "full" | "outline" = "full";
  let execType: "full" | "outline" = "full";
  let backColor: "blue" | "green" | "yellow" | "red" | "gray" = "gray";
  let execColor: "blue" | "green" | "yellow" | "red" | "gray" = "gray";
  let backIntensity: "light" | "dark" = "dark";
  let execIntensity: "light" | "dark" = "dark";
  let backText: string = "";
  let execText: string = "";
  switch (type) {
    case "delete":
      backType = "full";
      execType = "outline";
      backColor = "blue";
      execColor = "red";
      backIntensity = "dark";
      execIntensity = "dark";
      backText = "No, go back";
      execText = "Yes, delete!";
      break;
    case "edit":
      backType = "outline";
      execType = "full";
      backColor = "blue";
      execColor = "yellow";
      backIntensity = "dark";
      execIntensity = "dark";
      backText = "Cancel";
      execText = "Edit";
      break;
    case "exec":
      backType = "outline";
      execType = "full";
      backColor = "blue";
      execColor = "green";
      backIntensity = "dark";
      execIntensity = "dark";
      backText = "Cancel";
      execText = "Execute";
      break;
  }
  return (
    <div className={styles.actions}>
      <Button
        type={backType}
        size="medium"
        color={backColor}
        intensity={backIntensity}
        text={backText}
        onClick={backFunction}
      />
      <Button
        type={execType}
        size="medium"
        color={execColor}
        intensity={execIntensity}
        text={execText}
        onClick={execFunction}
      />
    </div>
  );
}
