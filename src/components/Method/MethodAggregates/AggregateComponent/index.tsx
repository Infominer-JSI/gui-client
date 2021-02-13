// import interfaces
import { IAggregateComponent } from "Interfaces";
// import modules
import React from "react";
import Graph from "components/Graph";
// import styles
import styles from "./styles.module.scss";

export default function MethodAggregates(props: IAggregateComponent) {
  const { className, field, type, statistics } = props;
  return (
    <React.Fragment>
      <h3 className={styles.field}>{field}</h3>
      <Graph className={className} type={type} data={statistics} />
    </React.Fragment>
  );
}
