// import interfaces
import { IGraphKeywords, IKeyword } from "Interfaces";
// import modules
import React, { useRef, useState, useEffect } from "react";
import classnames from "classnames";
// import d3 visualization
import * as d3 from "d3";

// import styles
import styles from "./styles.module.scss";

export default function GraphKeywords(props: IGraphKeywords) {
  // set references
  const containerRef = useRef<HTMLDivElement>(null);

  // set the states
  let [initialized, setInitialized] = useState(false);
  const [width, setWidth] = useState<number | null | undefined>();
  const [height, setHeight] = useState<number | null | undefined>();

  useEffect(() => {
    // update the width and height every 10ms
    const interval = setInterval(() => {
      setWidth(containerRef?.current?.offsetWidth);
      setHeight(containerRef?.current?.offsetHeight);
    }, 10);
    // Remove event listener on cleanup
    return () => clearInterval(interval);
  }, []);

  // create the visualization
  useEffect(() => {
    // chech if we have everything so that we can start creating the graph
    if (!props.data || !containerRef.current || !width || !height) {
      return;
    }

    const barHeight = 25;
    // prepare static values
    const margin = {
      top: 10,
      left: 40,
      right: 80,
      bottom: 10,
    };

    const x = createXScale(props.data, width, margin);
    const y = createYScale(props.data, barHeight, margin);

    const format = x.tickFormat(1000, "%");

    const svgHeight =
      Math.ceil((props.data.length + 0.1) * barHeight) + margin.top * 2;

    // set the graph container
    let svg: any = null;

    if (!initialized) {
      // create the svg element
      svg = createSVG(containerRef.current, width, svgHeight, margin);
      // create the bars
      const bars = svg
        .append("g")
        .attr("class", "bars")
        .attr("fill", "#1d4ed8");
      setBars(bars, props.data, x, y);
      // create the bar labels
      const labels = svg.append("g").attr("class", "labels");
      setLabels(labels, props.data, x, y, format);
      // create the x- and y-axis
      const xAxis = svg.append("g").attr("class", "xAxis");
      const yAxis = svg.append("g").attr("class", "yAxis");
      xAxis.call(setXAxis(x, width, margin));
      yAxis.call(setYAxis(y, props.data, margin));

      setInitialized(true);
    } else {
      // update the svg element
      svg = updateSVG(containerRef.current, width, svgHeight, margin);
      // update the bars
      const bars = svg.select("g.bars");
      setBars(bars, props.data, x, y);
      // create the bar labels
      const labels = svg.select("g.labels");
      setLabels(labels, props.data, x, y, format);
      // update the x- and y-axis
      const xAxis = svg.select("g.xAxis");
      const yAxis = svg.select("g.yAxis");
      xAxis.call(setXAxis(x, width, margin));
      yAxis.call(setYAxis(y, props.data, margin));
    }
  }, [props.data, width, height, containerRef, initialized]);

  // assign the container style
  const containerStyle = classnames(styles.container, props.className);

  return <div className={containerStyle} ref={containerRef}></div>;
}

// ==============================================
// Graph Helper Functions
// ==============================================

function createXScale(data: IKeyword[], width: number, margin: any) {
  return d3
    .scaleLinear()
    .domain([0, 1])
    .range([margin.left, width - margin.right]);
}

function createYScale(data: IKeyword[], barHeight: number, margin: any) {
  const domain = d3.range(data.length);
  return d3
    .scaleBand()
    .domain(domain.map((val) => val.toString()))
    .range([margin.top, barHeight * data.length + margin.top])
    .padding(0.1);
}

function setXAxis(
  x: d3.ScaleLinear<number, number, never>,
  width: number,
  margin: any
) {
  return (g: any) =>
    g
      .attr("transform", `translate(0, ${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 100, "%"))
      .call((g: any) => g.select(".domain").remove())
      .call((g: any) => g.selectAll(".tick text").attr("class", styles.axis));
}

function setYAxis(y: d3.ScaleBand<string>, data: IKeyword[], margin: any) {
  return (g: any) =>
    g
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat((_d: string, i: number) => data[i].keyword ?? "N/A")
          .tickSizeOuter(0)
      )
      .call((g: any) => g.selectAll(".tick text").attr("class", styles.axis));
}

function createSVG(
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
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("class", "graph")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
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
  data: IKeyword[],
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleBand<string>
) {
  // prepare the bars
  const bars = container.selectAll("rect").data(data);

  bars
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", (_d: any, i: number) => y(i.toString()))
    .attr("width", (d: IKeyword) => x(d.weight) - x(0))
    .attr("height", y.bandwidth());

  bars
    .attr("x", x(0))
    .attr("y", (_d: any, i: number) => y(i.toString()))
    .attr("width", (d: IKeyword) => x(d.weight) - x(0))
    .attr("height", y.bandwidth());

  bars.exit().remove();
}

function setLabels(
  container: any,
  data: IKeyword[],
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleBand<string>,
  format: (d: d3.NumberValue) => string
) {
  const labels = container.selectAll("text").data(data);

  labels
    .enter()
    .append("text")
    .attr("class", styles.label)
    .attr("x", (d: IKeyword) => x(d.weight))
    .attr(
      "y",
      (_d: any, i: number) => (y(i.toString()) as number) + y.bandwidth() / 2
    )
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text((d: IKeyword) => format(d.weight))
    .call((text: any) =>
      text
        .filter((d: IKeyword) => x(d.weight) - x(0) < 42) // short bars
        .attr("class", styles.labelSmall)
        .attr("dx", +4)
    );

  labels
    .attr("class", styles.label)
    .attr("x", (d: IKeyword) => x(d.weight))
    .attr(
      "y",
      (_d: any, i: number) => (y(i.toString()) as number) + y.bandwidth() / 2
    )
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text((d: IKeyword) => format(d.weight))
    .call((text: any) =>
      text
        .filter((d: IKeyword) => x(d.weight) - x(0) < 42) // short bars
        .attr("class", styles.labelSmall)
        .attr("dx", +4)
    );

  labels.exit().remove();
}
