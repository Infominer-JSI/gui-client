// import modules
import React, { useRef, useEffect } from "react";
import classnames from "classnames";

import {
  updateSVG,
  createLinearScale,
  createBandScale,
} from "utils/visualization";

import { useContainerSize } from "utils/hooks";

import { trimString } from "utils/utils";

// import d3 visualization
import * as d3 from "d3";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

import { IGraphData } from "Interfaces";

interface IGraphBarchart {
  data: IGraphData[];
  className?: any;
  color?: string;
}

//===============================================
// Define the component
//===============================================

const GraphBarchart = React.forwardRef<SVGSVGElement, IGraphBarchart>(
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

      let color;
      switch (props.color) {
        case "green":
          color = "#10b981";
          break;
        case "blue":
        default:
          color = "#3b82f6";
          break;
      }

      const barHeight = 26;

      const trimLength = getTrimLength(width);
      const format = d3.format(".3s");
      const data = JSON.parse(JSON.stringify(props.data));
      data.forEach(
        (d: IGraphData) => (d.value = trimString(d.value, trimLength))
      );

      const maxLabelLength = Math.max(
        ...data.map((d: IGraphData) => d.value.length)
      );

      // prepare static values
      const margin = {
        top: 10,
        left: Math.max(maxLabelLength * 3.5, 30),
        right: 20,
        bottom: 10,
      };

      const svgHeight =
        Math.ceil((data.length + 0.1) * barHeight) + margin.top * 2;

      if (height < svgHeight) {
        margin.right = 30;
      }

      const x = createLinearScale(
        [0, 1],
        [margin.left, width - margin.left - margin.right]
      );
      const y = createBandScale(
        d3.range(data.length).map((val) => val.toString()),
        [margin.top, barHeight * data.length + margin.top]
      );

      // set the graph container
      const svg = d3.select(containerRef.current).select<SVGSVGElement>("svg");
      const graph = updateSVG(svg, width, svgHeight, margin);
      // update the bars
      const bars = graph.select("g.bars");
      setBars(bars, data, x, y, color);
      // create the bar labels
      const labels = graph.select("g.labels");
      setLabels(labels, data, x, y, format);
      // update the x- and y-axis
      const xAxis = graph.select("g.xAxis");
      const yAxis = graph.select("g.yAxis");
      xAxis.call(setXAxis(x, width, margin));
      yAxis.call(setYAxis(y, data, margin));
    }, [props.data, props.color, width, height, containerRef]);

    // assign the container style
    const containerStyle = classnames(styles.container, props.className);

    return (
      <div className={containerStyle} ref={containerRef}>
        <svg ref={graphRef}>
          <g className="graph">
            <g className="bars"></g>
            <g className="labels"></g>
            <g className="xAxis"></g>
            <g className="yAxis"></g>
          </g>
        </svg>
      </div>
    );
  }
);

export default GraphBarchart;

// ==============================================
// Graph Helper Functions
// ==============================================

function getTrimLength(width: number) {
  return width < 180
    ? 7
    : width < 240
    ? 12
    : width < 280
    ? 14
    : width < 400
    ? 16
    : 22;
}

function setXAxis(
  x: d3.ScaleLinear<number, number, never>,
  width: number,
  margin: any,
  duration: number = 500
) {
  return (g: any) => {
    g.transition()
      .duration(duration)
      .call(d3.axisTop(x).ticks(width / 100, "%"))
      .attr("transform", `translate(0, ${margin.top})`)
      .call((g: any) =>
        g
          .selectAll(".tick text")
          .attr("class", styles.axis)
          //* download "style" values
          .style("font-size", "12px")
          .style("font-family", "Lato")
      );
    g.select(".domain").remove();
  };
}

function setYAxis(
  y: d3.ScaleBand<string>,
  data: IGraphData[],
  margin: any,
  duration: number = 500
) {
  return (g: any) => {
    g.transition()
      .duration(duration)
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat((_d: string, i: number) => data[i].value ?? "N/A")
          .tickSizeOuter(0)
      )
      .call((g: any) =>
        g
          .selectAll(".tick text")
          .attr("class", styles.axis)
          //* download "style" values
          .style("font-size", "12px")
          .style("font-family", "Lato")
      );
    g.select(".domain").remove();
  };
}

function setBars(
  container: any,
  data: IGraphData[],
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleBand<string>,
  color: string,
  duration: number = 500
) {
  //* download "style" values
  container.attr("fill", color);

  // prepare the bars
  const bars = container.selectAll("rect").data(data);

  bars
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", (_d: any, i: number) => y(i.toString()))
    .attr("height", y.bandwidth())
    .transition()
    .duration(duration)
    .attr("width", (d: IGraphData) => x(d.precent) - x(0));

  bars
    .transition()
    .duration(duration)
    .attr("x", x(0))
    .attr("y", (_d: any, i: number) => y(i.toString()))
    .attr("width", (d: IGraphData) => x(d.precent) - x(0));

  bars.exit().remove();
}

function setLabels(
  container: any,
  data: IGraphData[],
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleBand<string>,
  format: (
    n:
      | number
      | {
          valueOf(): number;
        }
  ) => string,
  duration: number = 500
) {
  const labels = container.selectAll("text").data(data);

  labels
    .enter()
    .append("text")
    .attr("class", styles.labelLarge)
    //* download "style" values
    .style("font-family", "Lato")
    .style("font-size", "12px")
    .style("text-anchor", "end")
    .style("fill", "white")
    .attr("x", x(0))
    .attr(
      "y",
      (_d: any, i: number) => (y(i.toString()) as number) + y.bandwidth() / 2
    )
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .call((text: any) =>
      text
        .filter((d: IGraphData) => x(d.precent) - x(0) < 42) // short bars
        .attr("class", styles.labelSmall)
        //* download "style" values
        .style("text-anchor", "start")
        .style("fill", "black")
        .attr("dx", +4)
    )
    .transition()
    .duration(duration)
    .attr("x", (d: IGraphData) => x(d.precent))
    .text((d: IGraphData) =>
      Math.floor(d.frequency / 1000) === 0 ? d.frequency : format(d.frequency)
    );

  labels
    .attr("class", styles.labelLarge)
    //* download "style" values
    .style("font-family", "Lato")
    .style("font-size", "12px")
    .style("text-anchor", "end")
    .style("fill", "white")
    .attr("dx", -4)
    .call((text: any) =>
      text
        .filter((d: IGraphData) => x(d.precent) - x(0) < 42) // short bars
        .attr("class", styles.labelSmall)
        //* download "style" values
        .style("text-anchor", "start")
        .style("fill", "black")
        .attr("dx", +4)
    )
    .transition()
    .duration(duration)
    .attr("x", (d: IGraphData) => x(d.precent))
    .attr(
      "y",
      (_d: any, i: number) => (y(i.toString()) as number) + y.bandwidth() / 2
    )
    .attr("dy", "0.35em")
    .text((d: IGraphData) =>
      Math.floor(d.frequency / 1000) === 0 ? d.frequency : format(d.frequency)
    );

  labels.exit().remove();
}
