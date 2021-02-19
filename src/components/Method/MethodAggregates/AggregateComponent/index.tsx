// import interfaces
import { IAggregateComponent } from "Interfaces";

// import modules
import React, { useState, useEffect, useRef } from "react";
import { convertData, trimString, convertSVG, download } from "utils/utils";
import { Canvg, RenderingContext2D } from "canvg";

// import components
import Graph from "components/Graph";
import DropdownButton from "components/DropdownButton";
import DownloadButton from "components/DownloadButton";
import DeleteButton from "components/DeleteButton";

// import styles
import styles from "./styles.module.scss";

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
    width < 200
      ? trimString(field, 4)
      : width < 250
      ? trimString(field, 6)
      : width < 310
      ? trimString(field, 8)
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

  return (
    <React.Fragment>
      <div className={styles.header} ref={headerRef}>
        <h2 className={styles.field}>{attributeName}</h2>
        <div className={styles.actions}>
          <DropdownButton
            className={styles.types}
            selectedId={graphId}
            options={graphOptions}
            onClick={changeGraph}
          />
          <DownloadButton
            className={styles.download}
            onClick={downloadGraph}
            size="small"
          ></DownloadButton>
          <DeleteButton
            className={styles.delete}
            onClick={onDeleteItem.bind(undefined, field)}
            size="small"
          ></DeleteButton>
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

/**
 * Prepares the primary and optional visualizations.
 * @param type - The aggregate type.
 */
function getGraphOptions(type: string) {
  switch (type) {
    case "keywords":
      return { primaryId: 0, options: ["keywords", "wordcloud"] };
    case "hierarchy":
      return { primaryId: 0, options: ["sunburst"] };
    case "count":
      // TODO: set the graph options
      return { primaryId: 0, options: ["barchart", "piechart"] };
    case "histogram":
      // TODO: set the graph options
      return { primaryId: 0, options: ["histogram"] };
    case "timeline":
      // TODO: set the graph options
      return { primaryId: 0, options: ["timeline"] };
    default:
      return { primaryId: 0, options: [] };
  }
}
