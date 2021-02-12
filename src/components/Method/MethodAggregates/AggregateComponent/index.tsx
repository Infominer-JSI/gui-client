// import interfaces
import { IAggregateComponent } from "Interfaces";
// import modules
import React from "react";
import Graph from "components/Graph";
// import styles
import styles from "./styles.module.scss";

export default function MethodAggregates(props: IAggregateComponent) {
  const { field, type, statistics } = props;
  return (
    <React.Fragment>
      <h2 className={styles.field}>{field}</h2>
      <Graph type={type} data={statistics} />
    </React.Fragment>
  );
}
