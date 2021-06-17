// import modules
import React, { useState, useEffect, useRef } from "react";
import { convertData, trimString, convertSVG, download } from "utils/utils";
import { Canvg, RenderingContext2D } from "canvg";
import { getGraphOptions } from "utils/analysis";
import classnames from "classnames";

// import components
import Graph from "components/Graph";
import Dropdown from "components/Inputs/Dropdown";
import Button from "components/Inputs/Button";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

interface IAggregateComponent {
  field: string;
  type: string;
  statistics: { [key: string]: any };
  onDeleteItem: () => void;
  className?: any;
}

//===============================================
// Define the component
//===============================================

export default function MethodAggregates(props: IAggregateComponent) {
  const { className, field, type, statistics, onDeleteItem } = props;
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

  async function downloadGraph() {
    if (graphRef?.current) {
      // create the canvas and svg data
      const data = convertSVG(graphRef.current);
      const c = new OffscreenCanvas(0, 0);
      const ctx = c.getContext("2d");
      // render the canvas content
      const v = await Canvg.from(ctx as RenderingContext2D, data);
      await v.render();
      // download the canvas
      const filename = `${field}-${selectedGraph}-aggregate.png`;
      const blob = await c.convertToBlob();
      download(filename, blob);
    }
  }

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
            icon="download"
            intensity="light"
            onClick={downloadGraph}
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
      <Graph
        className={className}
        type={selectedGraph}
        data={convertData(statistics, type, selectedGraph)}
        ref={graphRef}
      />
    </React.Fragment>
  );
}
