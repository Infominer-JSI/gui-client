import React, { useRef } from "react";
import Button from "components/Inputs/Button";

import styles from "./styles.module.scss";

export default function KMeansCluster(props: any) {
  const { onDeleteItem } = props;

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <div className={styles.header} ref={headerRef}>
        <h2 className={styles.field}>Cluster</h2>
        <div className={styles.actions}>
          <Button
            type="outline"
            size="small"
            color="gray"
            icon="delete"
            intensity="light"
            onClick={onDeleteItem.bind(undefined, "cluster")}
          />
          {/* <ButtonDelete
            className={styles.delete}
            onClick={onDeleteItem.bind(undefined, "cluster")}
            size="small"
          ></ButtonDelete> */}
        </div>
      </div>
    </React.Fragment>
  );
}
