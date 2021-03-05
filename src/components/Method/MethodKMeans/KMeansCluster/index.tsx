import React, { useRef } from "react";
import ButtonDelete from "components/Inputs/ButtonDelete";

import styles from "./styles.module.scss";

export default function KMeansCluster(props: any) {
  const { onDeleteItem } = props;

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <div className={styles.header} ref={headerRef}>
        <h2 className={styles.field}>Cluster</h2>
        <div className={styles.actions}>
          <ButtonDelete
            className={styles.delete}
            onClick={onDeleteItem.bind(undefined, "cluster")}
            size="small"
          ></ButtonDelete>
        </div>
      </div>
    </React.Fragment>
  );
}
