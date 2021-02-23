// import interfaces
import { IGraphHistogram, IHistogramBar } from "Interfaces";
// import modules
import React, { useRef, useState, useEffect } from "react";
import classnames from "classnames";

// import d3 visualization
import * as d3 from "d3";

// import styles
import styles from "./styles.module.scss";

const GraphBarchart = React.forwardRef<SVGSVGElement, IGraphHistogram>(
  (props, graphRef) => {
    // set references
    const containerRef = useRef<HTMLDivElement>(null);

    // set the states
    const [width, setWidth] = useState<number | null | undefined>();
    const [height, setHeight] = useState<number | null | undefined>();

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

      let color;
      switch (props.color) {
        case "blue":
          color = "#3b82f6";
          break;
        case "green":
          color = "#10b981";
          break;
        case "red":
        default:
          color = "#fbbf24";
          break;
      }

      // get histogram values
      const { min, max, values: original } = props.data;
      // format the values
      const values: IHistogramBar[] = JSON.parse(JSON.stringify(original));
      values.forEach((d) => {
        d.precent = d.precent / 100;
        d.percentSum = d.percentSum / 100;
      });

      const barWidth = 45;
      const svgWidth = Math.max(Math.ceil(values.length * barWidth), width);
      // prepare static values
      const margin = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 30,
      };

      if (svgWidth > width) {
        margin.bottom = 50;
      }

      const format = d3.format(".3s");
      const x = createXScale(min, max, svgWidth, margin);
      const y = createYScale(height, margin);

      // set the graph container
      const svg = updateSVG(containerRef.current, svgWidth, height, margin);
      // update the bars
      const bars = svg.select("g.bars");
      setBars(bars, values, x, y, color);
      // create the bar labels
      const labels = svg.select("g.labels");
      setLabels(labels, values, x, y, format);
      // update the x- and y-axis
      const xAxis = svg.select("g.xAxis");
      const yAxis = svg.select("g.yAxis");
      xAxis.call(setXAxis(x, svgWidth, height, margin, format));
      yAxis.call(setYAxis(y, height, margin));
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

function createXScale(min: number, max: number, width: number, margin: any) {
  return d3
    .scaleLinear()
    .domain([min, max])
    .nice()
    .range([margin.left, width - margin.left - margin.right]);
}

function createYScale(height: number, margin: any) {
  return d3
    .scaleLinear()
    .domain([0, 1])
    .nice()
    .range([height - margin.bottom, margin.top]);
}

function setXAxis(
  x: d3.ScaleLinear<number, number, never>,
  width: number,
  height: number,
  margin: any,
  format: (
    n:
      | number
      | {
          valueOf(): number;
        }
  ) => string,
  duration: number = 500
) {
  return (g: any) => {
    g.transition()
      .duration(duration)
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 100)
          .tickFormat((d: any) => (Math.floor(d / 1000) === 0 ? d : format(d)))
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

function setYAxis(
  y: d3.ScaleLinear<number, number, never>,
  height: number,
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
          .ticks(height / 100, "%")
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

function updateSVG(
  div: HTMLDivElement,
  width: number,
  height: number,
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }
) {
  return d3
    .select(div)
    .select("svg")
    .attr("width", width)
    .attr("height", height)
    .select("g.graph")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
}

function setBars(
  container: any,
  data: IHistogramBar[],
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleLinear<number, number, never>,
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
    .attr("x", (d: IHistogramBar) => x(d.min) + 1)
    .attr("y", y(0))
    .attr("width", (d: IHistogramBar) => x(d.max) - x(d.min) - 1)
    .transition()
    .duration(duration)
    .attr("y", (d: IHistogramBar) => y(d.precent))
    .attr("height", (d: IHistogramBar) => y(0) - y(d.precent));

  bars
    .transition()
    .duration(duration)
    .attr("x", (d: IHistogramBar) => x(d.min) + 1)
    .attr("y", (d: IHistogramBar) => y(d.precent))
    .attr("width", (d: IHistogramBar) => x(d.max) - x(d.min) - 1)
    .attr("height", (d: IHistogramBar) => y(0) - y(d.precent));

  bars.exit().remove();
}

function setLabels(
  container: any,
  data: IHistogramBar[],
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleLinear<number, number, never>,
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
    .style("text-anchor", "middle")
    .style("fill", "black")
    .attr(
      "x",
      (d: IHistogramBar, i: number) => (x(d.max) - x(d.min)) / 2 + x(d.min)
    )
    .attr("y", y(0))
    .attr("dy", 16)
    .call((text: any) =>
      text
        .filter((d: IHistogramBar) => y(0) - y(d.precent) < 50) // short bars
        .attr("class", styles.labelSmall)
        //* download "style" values
        .style("fill", "black")
        .attr("dy", -6)
    )
    .transition()
    .duration(duration)
    .attr("y", (d: IHistogramBar) => y(d.precent))
    .text((d: IHistogramBar) =>
      Math.floor(d.frequency / 1000) === 0 ? d.frequency : format(d.frequency)
    );

  labels
    .attr("class", styles.labelLarge)
    //* download "style" values
    .style("font-family", "Lato")
    .style("font-size", "12px")
    .style("text-anchor", "middle")
    .style("fill", "black")
    .attr("dy", 16)
    .call((text: any) =>
      text
        .filter((d: IHistogramBar) => y(0) - y(d.precent) < 50) // short bars
        .attr("class", styles.labelSmall)
        //* download "style" values
        .style("fill", "black")
        .attr("dy", -6)
    )
    .transition()
    .duration(duration)
    .attr(
      "x",
      (d: IHistogramBar, i: number) => (x(d.max) - x(d.min)) / 2 + x(d.min)
    )
    .attr("y", (d: IHistogramBar) => y(d.precent))
    .text((d: IHistogramBar) =>
      Math.floor(d.frequency / 1000) === 0 ? d.frequency : format(d.frequency)
    );

  labels.exit().remove();
}
