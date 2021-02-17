// import interfaces
import { IAggregateComponent } from "Interfaces";

// import modules
import React, { useState, useEffect, useRef } from "react";
import { convertSVG, download } from "utils/utils";
import { Canvg, RenderingContext2D } from "canvg";

// import components
import Graph from "components/Graph";
import DownloadButton from "components/DownloadButton";

// import styles
import styles from "./styles.module.scss";

export default function MethodAggregates(props: IAggregateComponent) {
  const { className, field, type, statistics } = props;

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

  /**
   * Trims the field.
   * @param field - The field to trim.
   * @param length - The length of the trimmed field.
   */
  function trimField(field: string, length: number = 7) {
    return `${field.slice(0, length)}${field.length > length ? "..." : ""}`;
  }

  // set the attribute name
  const attributeName =
    width < 200
      ? trimField(field, 5)
      : width < 230
      ? trimField(field, 6)
      : width < 280
      ? trimField(field)
      : field;

  async function downloadGraph() {
    if (graphRef?.current) {
      // create the canvas and svg data
      const data = convertSVG(graphRef.current);
      const c = new OffscreenCanvas(300, 300);
      const ctx = c.getContext("2d");
      // render the canvas content
      const v = await Canvg.from(ctx as RenderingContext2D, data);
      await v.render();
      // download the canvas
      const filename = `${field}-${type}-aggregate.png`;
      const blob = await c.convertToBlob();
      download(filename, blob);
    }
  }

  return (
    <React.Fragment>
      <div className={styles.header} ref={headerRef}>
        <h2 className={styles.field}>{attributeName}</h2>
        <div className={styles.actions}>
          <DownloadButton
            className={styles.download}
            onClick={downloadGraph}
            size="small"
          ></DownloadButton>
        </div>
      </div>
      <Graph
        className={className}
        type={type}
        data={statistics}
        ref={graphRef}
      />
    </React.Fragment>
  );
}
