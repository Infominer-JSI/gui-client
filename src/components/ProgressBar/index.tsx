import React from "react";

import styles from "./styles.module.scss";

//===============================================
// Define the state interfaces
//===============================================

interface IProgressBar {
  progress: number;
}

//===============================================
// Define the component
//===============================================

export default function ProgressBar(props: IProgressBar) {
  const progress = Math.min(100, Math.max(0, props.progress));

  return (
    <div className={styles.outerBar}>
      <div className={styles.innerBar} style={{ width: `${progress}%` }}></div>
    </div>
  );
}
