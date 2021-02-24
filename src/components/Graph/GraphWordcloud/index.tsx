// import interfaces
import { IGraphWordcloud, IKeyword } from "Interfaces";
// import modules
import React, { useRef, useState, useEffect, ReactText } from "react";
import classnames from "classnames";

import {
  updateSVG,
  createLinearScale,
  createQuantizeScale,
} from "utils/visualization";

// import d3 visualization
import * as d3 from "d3";
import cloud from "d3-cloud";

// import styles
import styles from "./styles.module.scss";

const GraphWordcloud = React.forwardRef<SVGSVGElement, IGraphWordcloud>(
  (props, graphRef) => {
    // set references
    const containerRef = useRef<HTMLDivElement>(null);

    // set the states
    const [width, setWidth] = useState<number | null | undefined>();
    const [height, setHeight] = useState<number | null | undefined>();
    const [, setCreationTimeout] = useState<any>();

    useEffect(() => {
      // update the width and height every 10ms
      const interval = setInterval(() => {
        setWidth(containerRef?.current?.offsetWidth);
        setHeight(containerRef?.current?.offsetHeight);
      }, 200);
      // Remove event listener on cleanup
      return () => clearInterval(interval);
    }, []);

    // create the visualization
    useEffect(() => {
      // chech if we have everything so that we can start creating the graph
      if (!props.data || !containerRef.current || !width || !height) {
        return;
      }

      // prepare static values
      const margin = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      };

      // get he min and maximum weight
      const weights = props.data.map((val) => val.weight);
      const minWeight = Math.min(...weights);
      const maxWeight = Math.max(...weights);

      // set the minimum and maximum font size
      const minFontSize = 10;
      const maxFontSize = 40;

      // set the css classes and fill
      const cls = [styles.small, styles.medium, styles.large];
      //* download "style" values
      const fills = ["#9ca3af", "#2563eb", "#000000"];
      // create the font size scale
      const fontSizeScale = createLinearScale(
        [minWeight, maxWeight],
        [minFontSize, maxFontSize]
      );

      // create the class scale
      const classScale = createQuantizeScale([minWeight, maxWeight], cls);
      const fillScale = createQuantizeScale([minWeight, maxWeight], fills);

      // format the data
      const data = props.data.map((d: IKeyword) => ({
        text: d.keyword ? d.keyword.toUpperCase() : "",
        size: minWeight === maxWeight ? maxFontSize : fontSizeScale(d.weight),
        colorClass:
          minWeight === maxWeight ? cls[cls.length - 1] : classScale(d.weight),
        fill:
          minWeight === maxWeight
            ? fills[fills.length - 1]
            : fillScale(d.weight),
      }));

      /**
       *
       * @param timeout
       * @param data
       * @param width
       * @param height
       * @param wc
       */
      function createGraph(
        data: {
          text: string;
          size: number;
          colorClass: ReactText;
          fill: ReactText;
        }[],
        width: number,
        height: number,
        wc: any
      ) {
        return (prevWordcloud: any) => {
          if (prevWordcloud) {
            prevWordcloud.on("end", () => {}).stop();
          }
          return calculateWordcloud(data, width, height)
            .on("end", (words) => setWordcloud(wc, words))
            .start();
        };
      }
      // update the svg element
      const svg = d3.select(containerRef.current).select<SVGSVGElement>("svg");
      const graph = updateSVG(svg, width, height, margin, true);
      const wc = graph.select("g.wordcloud");
      // calculate and visualize the wordcloud
      setCreationTimeout(createGraph(data, width, height, wc));

      // Remove event listener on cleanup
    }, [props.data, width, height, containerRef]);

    // assign the container style
    const containerStyle = classnames(styles.container, props.className);

    return (
      <div className={containerStyle} ref={containerRef}>
        <svg ref={graphRef}>
          <g className="graph">
            <g className="wordcloud"></g>
          </g>
        </svg>
      </div>
    );
  }
);

export default GraphWordcloud;

// ==============================================
// Graph Helper Functions
// ==============================================

function calculateWordcloud(data: any, width: number, height: number) {
  return cloud()
    .size([width, height])
    .timeInterval(10)
    .words(data)
    .rotate(0)
    .random(() => 0.5)
    .fontWeight(900)
    .font("Lato")
    .fontSize((d) => d.size as number);
}

function setWordcloud(
  container: any,
  words: cloud.Word[],
  duration: number = 500
) {
  // set the words data
  const wordcloud = container.selectAll("text").data(words);
  wordcloud
    .enter()
    .append("text")
    .attr("class", (d: any) => d.colorClass)
    .attr("text-anchor", "middle")
    .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`)
    .attr("font-size", 0)
    //* download "style" values
    .style("font-family", "Lato")
    .style("font-weight", 900)
    .style("fill", (d: any) => d.fill)
    .text((d: any) => d.text)
    .transition()
    .duration(duration)
    .attr("font-size", (d: any) => `${d.size}px`);

  wordcloud
    .attr("class", (d: any) => d.colorClass)
    .attr("text-anchor", "middle")

    //* download "style" values
    .style("font-family", "Lato")
    .style("font-weight", 900)
    .transition()
    .duration(duration)
    .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`)
    .attr("font-size", (d: any) => `${d.size}px`)
    .style("fill", (d: any) => d.fill)
    .text((d: any) => d.text);

  wordcloud.exit().remove();
}
