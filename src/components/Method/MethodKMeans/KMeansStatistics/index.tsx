import React, { useState, useEffect, useRef } from "react";
import { convertData, trimString, convertSVG, download } from "utils/utils";
import { Canvg, RenderingContext2D } from "canvg";
import { getGraphOptions } from "utils/analysis";
import classnames from "classnames";

// import components
import Graph from "components/Graph";
import Dropdown from "components/Inputs/Dropdown";
import Button from "components/Inputs/Button";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export default function KMeansCluster(props: any) {
  const { className, field, type, clusters, onDeleteItem } = props;

  // define the header ref and width state
  // used for dynamic attribute naming
  const graphRef = useRef<SVGSVGElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  // set the width of the header component
  useEffect(() => {
    // update the width and height every 10ms
    const interval = setInterval(() => {
      setWidth(headerRef?.current?.offsetWidth as number);
    }, 10);
    // Remove event listener on cleanup
    return () => clearInterval(interval);
  }, []);

  // get the graph types
  const { primaryId, options: graphOptions } = getGraphOptions(type);
  // set the graph states
  const [graphId, setGraphId] = useState(primaryId);

  // set the attribute name
  const attributeName =
    width < 190
      ? trimString(field, 10)
      : width < 290
      ? field
      : width < 310
      ? trimString(field, 8)
      : width < 330
      ? trimString(field, 11)
      : field;

  function changeGraph(id: number) {
    setGraphId(id);
  }

  // set selected graph
  const selectedGraph = graphOptions[graphId];
  const headerClass = classnames(styles.header, {
    [styles.headerRow]: width > 290,
  });

  return (
    <React.Fragment>
      <div className={headerClass} ref={headerRef}>
        <h2 className={styles.field}>{attributeName}</h2>
        <div className={styles.actions}>
          <Dropdown
            className={styles.types}
            selectedId={graphId}
            options={graphOptions}
            onClick={changeGraph}
          />
          <Button
            type="outline"
            size="small"
            color="gray"
            icon="delete"
            intensity="light"
            onClick={onDeleteItem.bind(undefined, field)}
          />
        </div>
      </div>
      <div className={styles.clusters}>
        {clusters.map((cluster: any, id: number) => (
          <div key={id} className={styles.cluster}>
            <h4 className={styles.clusterHeader}>{cluster.subset.label}</h4>
            <div className={styles.clusterGraph}>
              <Graph
                className={className}
                type={selectedGraph}
                data={convertData(cluster.statistics, type, selectedGraph)}
                ref={graphRef}
              />
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
