// import interfaces
import { IGraphPiechart, IBarchartRow } from "Interfaces";
// import modules
import React, { useRef, useState, useEffect } from "react";
import classnames from "classnames";

import { trimString } from "utils/utils";

// import d3 visualization
import * as d3 from "d3";

// import styles
import styles from "./styles.module.scss";

const GraphBarchart = React.forwardRef<SVGSVGElement, IGraphPiechart>(
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

      // get the radius of the visualization
      const radius = Math.min(width, height) / 2;

      // get the colors
      const colors = createColor(props.data.map((d) => d.value));

      // define the arc
      const arc = createArc(radius * 0.4, radius * 0.7);
      const outerArc = createArc(radius * 0.8, radius * 0.8);

      // update the svg values
      const svg = updateSVG(containerRef.current, width, height, {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      });

      // create the arcs
      const data = createSlices(props.data);
      // update the slices
      const slices = svg.select("g.slices");
      setSlices(slices, data, arc, colors);
      // create the polylines
      const polylines = svg.select("g.polylines");
      setPolylines(polylines, data, radius, arc, outerArc);
      // create the labels
      const labels = svg.select("g.labels");
      setLabels(labels, data, radius, outerArc);
    }, [props.data, width, height, containerRef]);

    // assign the container style
    const containerStyle = classnames(styles.container, props.className);

    return (
      <div className={containerStyle} ref={containerRef}>
        <svg ref={graphRef}>
          <g className="graph">
            <g className="slices" fillOpacity={0.8}></g>
            <g className="labels"></g>
            <g className="polylines"></g>
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

function createColor(labels: string[]) {
  return d3.scaleOrdinal(
    labels,
    d3.quantize(d3.interpolateRainbow, labels.length + 1)
  );
}

function createArc(innerRadius: number, outerRadius: number) {
  return d3
    .arc<IBarchartRow>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(4);
}

function createSlices(data: IBarchartRow[], padAngle: number = 0.008) {
  // create the pie
  const pie = d3
    .pie<IBarchartRow>()
    .sort(null)
    .value((d) => d.frequency)
    .padAngle(padAngle);
  const arcs = pie(data);
  return arcs;
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
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
}

function setSlices(
  container: any,
  data: d3.PieArcDatum<IBarchartRow>[],
  arc: d3.Arc<any, IBarchartRow>,
  color: d3.ScaleOrdinal<string, string, never>
) {
  // prepare the layers
  const slices = container.selectAll("path").data(data);
  // set new layers
  slices
    .enter()
    .append("path")
    .attr("fill", (d: any, i: number) => color(i.toString()))
    .attr("d", (d: any) => arc(d))
    .append("title")
    .text((d: any) => d.data.value);

  // how to update existing layers
  slices
    .attr("fill", (d: any, i: number) => color(i.toString()))
    .attr("d", (d: any) => arc(d))
    .select("title")
    .text((d: any) => d.data.value);
  // what to do with removed layers
  slices.exit().remove();
}

function setPolylines(
  container: any,
  data: d3.PieArcDatum<IBarchartRow>[],
  radius: number,
  arc: d3.Arc<any, IBarchartRow>,
  outerArc: d3.Arc<any, IBarchartRow>
) {
  var polyline = container
    .selectAll("polyline")
    .data(
      data.filter(
        (d: any) => (d.endAngle - d.startAngle) / (2 * Math.PI) > 0.025
      )
    );

  polyline
    .enter()
    .append("polyline")
    //* download "style" values
    .attr("opacity", ".3")
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .attr("fill", "none")
    .attr("points", (d: any) => {
      const pos = outerArc.centroid(d);
      pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
      return [arc.centroid(d), outerArc.centroid(d), pos];
    });

  polyline.attr("points", (d: any) => {
    const pos = outerArc.centroid(d);
    pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
    return [arc.centroid(d), outerArc.centroid(d), pos];
  });
  // remove polyline
  polyline.exit().remove();
}

function setLabels(
  container: any,
  data: d3.PieArcDatum<IBarchartRow>[],
  radius: number,
  outerArc: d3.Arc<any, IBarchartRow>
) {
  var labels = container
    .selectAll("text")
    .data(
      data.filter(
        (d: any) => (d.endAngle - d.startAngle) / (2 * Math.PI) > 0.025
      )
    );

  labels
    .enter()
    .append("text")
    .attr("dy", "-.35em")
    .html((d: any) => trimString(d.data.value, 18))
    .style("text-anchor", (d: any) => {
      return midAngle(d) < Math.PI ? "end" : "start";
    })
    .attr("transform", (d: any) => {
      var pos = outerArc.centroid(d);
      pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
      return "translate(" + pos + ")";
    })
    //* download "style" values
    .style("font-size", "12px")
    .style("font-family", "Lato");

  labels
    .attr("dy", "-.35em")
    .html((d: any) => trimString(d.data.value, 18))
    .style("text-anchor", (d: any) => {
      return midAngle(d) < Math.PI ? "end" : "start";
    })
    //* download "style" values
    .style("font-size", "12px")
    .style("font-family", "Lato")
    .attr("transform", (d: any) => {
      var pos = outerArc.centroid(d);
      pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
      return "translate(" + pos + ")";
    });
  // remove polyline
  labels.exit().remove();
}

function midAngle(d: d3.PieArcDatum<IBarchartRow>) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
