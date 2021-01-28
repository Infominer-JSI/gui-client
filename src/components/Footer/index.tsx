import React from "react";
// styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <FontAwesomeIcon icon={faCopyright} /> Copyright 2018 AILAB JSI. All
        Rights Reserved.
      </div>
    </footer>
  );
}
