// import modules
import React, { useRef, useEffect } from "react";
import classnames from "classnames";

import {
  updateSVG,
  createLinearScale,
  createQuantizeScale,
} from "utils/visualization";

import { useContainerSize } from "utils/hooks";

// import d3 visualization
import * as d3 from "d3";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

interface IKeyword {
  keyword: string;
  weight: number;
  newWgt?: number;
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}

interface IGraphWordcloud {
  data: IKeyword[];
  className?: any;
}

//===============================================
// Define the component
//===============================================

const GraphWordcloud = React.forwardRef<SVGSVGElement, IGraphWordcloud>(
  (props, graphRef) => {
    // set references
    const containerRef = useRef<HTMLDivElement>(null);
    // define the container size hook
    const { width, height } = useContainerSize(containerRef);

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

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      // format the data
      const data = calculateWordcloud(
        props.data,
        fontSizeScale,
        innerWidth,
        innerHeight
      ).map((d: IKeyword) => ({
        text: d.keyword ? d.keyword.toUpperCase().replace("�", "'") : "",
        x: d.x as number,
        y: d.y as number,
        fill: fillScale(d.weight),
        size: fontSizeScale(d.weight),
        colorClass: classScale(d.weight),
      }));

      // update the svg element
      const svg = d3.select(containerRef.current).select<SVGSVGElement>("svg");
      const graph = updateSVG(svg, width, height, margin, true);
      const wc = graph.select("g.wordcloud");
      // calculate and visualize the wordcloud
      generateWordcloud(wc, data);

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

// generate the wordcloud
function generateWordcloud(
  container: any,
  keywords: {
    text: string;
    size: number;
    x: number;
    y: number;
    colorClass: string | number;
    fill: string | number;
  }[],
  duration: number = 500
) {
  // set the words data
  const wordcloud = container.selectAll("text").data(keywords);
  wordcloud
    .enter()
    .append("text")
    .attr("class", (d: any) => d.colorClass)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`)
    .attr("font-size", 0)
    //* download "style" values
    .style("font-family", "Lato")
    .style("font-weight", "bold")
    .style("fill", (d: any) => d.fill)
    .text((d: any) => d.text)
    .transition()
    .duration(duration)
    .attr("font-size", (d: any) => `${d.size}px`);

  wordcloud
    .attr("class", (d: any) => d.colorClass)
    //* download "style" values
    .transition()
    .duration(duration)
    .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`)
    .attr("font-size", (d: any) => `${d.size}px`)
    .style("fill", (d: any) => d.fill)
    .text((d: any) => d.text);

  wordcloud.exit().remove();
}

// calculate the wordcloud positions
function calculateWordcloud(
  keywords: IKeyword[],
  fontSize: d3.ScaleLinear<number, number, never>,
  width: number,
  height: number
) {
  const placed: IKeyword[] = [];
  function intersectsPlaced(word: IKeyword) {
    for (const p of placed) {
      if (intersects(word, p)) return true;
    }
    return false;
  }
  // place the words
  const rstep = 3.0;
  const astep = 0.05;
  enrichKeywords(keywords, fontSize);
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    const dir = (i % 2) * 2 - 1;
    let radius = 0;
    let isPlaced = false;
    while (radius < Math.max(width / 2, height / 2)) {
      for (let angle = 0; angle < 2 * Math.PI; angle += astep) {
        const alpha = dir * angle;
        keyword.x = radius * Math.cos(alpha);
        keyword.y = radius * Math.sin(alpha);
        if (
          !intersectsPlaced(keyword) &&
          inBoundingBox(keyword, width, height)
        ) {
          isPlaced = true;
          break;
        }
      }
      if (isPlaced) {
        break;
      }
      radius += rstep;
    }
    if (isPlaced) {
      placed.push(keyword);
    }
  }
  return placed;
}

// enrich the keywords
function enrichKeywords(
  keywords: IKeyword[],
  fontSize: d3.ScaleLinear<number, number, never>
) {
  for (const keyword of keywords) {
    // normalize area
    keyword.height = fontSize(keyword.weight) as number;
    keyword.height += Math.ceil(keyword.height / 10);
    keyword.width = getKeywordWidth(keyword);
  }
}

// calculates if the two keywords are intersecting
function intersects(keyword0: IKeyword, keyword1: IKeyword) {
  return (
    Math.abs((keyword0.y as number) - (keyword1.y as number)) <
      ((keyword0.height as number) + (keyword1.height as number)) / 2 &&
    Math.abs((keyword0.x as number) - (keyword1.x as number)) <
      ((keyword0.width as number) + (keyword1.width as number)) / 2
  );
}

// checks if the keyword is within the wordcloud bounding box
function inBoundingBox(keyword: IKeyword, width: number, height: number) {
  return (
    width / 2 - Math.abs(keyword.x as number) > (keyword.width as number) / 2 &&
    height / 2 - Math.abs(keyword.y as number) > (keyword.height as number) / 2
  );
}

// gets the keyword width in the wordcloud
function getKeywordWidth(keyword: IKeyword) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.font = `bold ${keyword.height}px Lato`;
  const { width } = ctx.measureText(keyword.keyword);
  return width + width / 3.1;
}
