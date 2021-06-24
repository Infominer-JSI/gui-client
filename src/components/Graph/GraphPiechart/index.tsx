// import modules
import React, { useRef, useEffect } from "react";
import classnames from "classnames";

import { updateSVG, createColorScale } from "utils/visualization";

import { useContainerSize } from "utils/hooks";
import { trimString } from "utils/utils";

// import d3 visualization
import * as d3 from "d3";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

// import interfaces
import { IGraphData } from "Interfaces";

interface IGraphPiechart {
  data: IGraphData[];
  keys?: string[];
  className?: any;
}

//===============================================
// Define the component
//===============================================

const GraphBarchart = React.forwardRef<SVGSVGElement, IGraphPiechart>(
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

      const margin = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      };

      // get the radius of the visualization
      const radius = Math.min(width, height) / 2;

      // get the colors
      const colors = createColorScale(
        props.keys ?? props.data.map((d) => d.value)
      );

      // define the arc
      const arc = createArc(radius * 0.4, radius * 0.7);
      const outerArc = createArc(radius * 0.8, radius * 0.8);

      // update the svg values
      const svg = d3.select(containerRef.current).select<SVGSVGElement>("svg");
      const graph = updateSVG(svg, width, height, margin, true);
      // create the arcs
      const data = createSlices(props.data);
      // update the slices
      const slices = graph.select("g.slices");
      setSlices(slices, data, arc, colors);
      // create the polylines
      const polylines = graph.select("g.polylines");
      setPolylines(polylines, data, radius, arc, outerArc);
      // create the labels
      const labels = graph.select("g.labels");
      setLabels(labels, data, radius, outerArc);
    }, [props, width, height, containerRef]);

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

function createArc(innerRadius: number, outerRadius: number) {
  return d3
    .arc<IGraphData>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(4);
}

function createSlices(data: IGraphData[], padAngle: number = 0.008) {
  // create the pie
  const pie = d3
    .pie<IGraphData>()
    .sort(null)
    .value((d) => d.frequency)
    .padAngle(padAngle);
  const arcs = pie(data);
  return arcs;
}

function setSlices(
  container: any,
  data: d3.PieArcDatum<IGraphData>[],
  arc: d3.Arc<any, IGraphData>,
  color: d3.ScaleOrdinal<string, string, never>
) {
  // prepare the layers
  const slices = container.selectAll("path").data(data);
  // set new layers
  slices
    .enter()
    .append("path")
    .attr("fill", (d: any, i: number) => color(d.data.value))
    .attr("d", (d: any) => arc(d))
    .append("title")
    .text(
      (d: any) =>
        `${d.data.value}\n${d.data.frequency}\n${(d.data.precent * 100).toFixed(
          2
        )}%`
    );

  // how to update existing layers
  slices
    .attr("fill", (d: any, i: number) => color(d.data.value))
    .attr("d", (d: any) => arc(d))
    .select("title")
    .text(
      (d: any) =>
        `${d.data.value}\n${d.data.frequency}\n${(d.data.precent * 100).toFixed(
          2
        )}%`
    );
  // what to do with removed layers
  slices.exit().remove();
}

function setPolylines(
  container: any,
  data: d3.PieArcDatum<IGraphData>[],
  radius: number,
  arc: d3.Arc<any, IGraphData>,
  outerArc: d3.Arc<any, IGraphData>
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
  data: d3.PieArcDatum<IGraphData>[],
  radius: number,
  outerArc: d3.Arc<any, IGraphData>
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

function midAngle(d: d3.PieArcDatum<IGraphData>) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
