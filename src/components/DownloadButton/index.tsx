// import interfaces
import { IDownloadButton } from "Interfaces";
// import modules
import React from "react";
import Button from "components/Button";
// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function ButtonEdit(props: IDownloadButton) {
  const { downloadLink, filename = "download" } = props;
  // downloads from the provided link
  const getFileFromURL = async () => {
    // download from the link and create a blob
    const response = await fetch(downloadLink);
    const blob = await response.blob();
    // create the URL and a element to download the file
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = filename;
    a.href = url;
    // download
    a.click();
  };

  return (
    <Button
      className={styles.download}
      onClick={getFileFromURL}
      type={"primary"}
    >
      <FontAwesomeIcon icon={faDownload} />
    </Button>
  );
}
