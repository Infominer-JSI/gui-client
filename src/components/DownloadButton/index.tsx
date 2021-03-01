// import interfaces
import { IDownloadButton } from "Interfaces";
// import modules
import React from "react";
import Button from "components/Button";
import classnames from "classnames";
// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function DownloadButton(props: IDownloadButton) {
  const { className, onClick, size = "medium", dark } = props;
  // downloads from the provided link

  const buttonStyle = classnames(className, {
    [styles.medium]: size === "medium",
    [styles.small]: size === "small",
  });

  // set the button type
  const type = dark ? "primary-dark" : "primary";
  return (
    <Button className={buttonStyle} onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faDownload} />
    </Button>
  );
}
