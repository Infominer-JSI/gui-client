// import modules
import React, { useRef, useEffect } from "react";
import { updateSVG, createColorScale } from "utils/visualization";
import classnames from "classnames";

import { useContainerSize } from "utils/hooks";

// import d3 visualization
import * as d3 from "d3";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

interface IHierarchy {
  name: string;
  frequency: number;
  precent: number;
  children?: IHierarchy[];
}

interface IGraphSunburst {
  data: {
    name: string;
    frequency: number;
    precent: number;
    children: IHierarchy[];
  };
  keys?: string[];
  className?: any;
}

//===============================================
// Define the component
//===============================================

const GraphSunburst = React.forwardRef<SVGSVGElement, IGraphSunburst>(
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

      // get the radius of the visualization
      const radius = Math.min(width, height) / 2;
      // set the format
      const format = d3.format(",d");

      const margin = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      };

      // assign the partition of the data
      const root = partition(props.data, radius);
      root.each((d: any) => (d.current = d));

      // get color scale and the arc function
      const color = createColorScale(
        props.keys ?? props.data.children.map((v) => v.name)
      );

      const arc = createArc(radius);
      // set the graph container
      const svg = d3.select(containerRef.current).select<SVGSVGElement>("svg");
      const graph = updateSVG(svg, width, height, margin, true);
      // update the layers
      const layers = graph.select("g.layers");
      setLayers(layers, root, arc, color, format);
      // update the labels
      const labels = graph.select("g.labels");
      setLabels(labels, root);
    }, [props, width, height, containerRef]);

    const containerStyle = classnames(styles.container, props.className);

    return (
      <div className={containerStyle} ref={containerRef}>
        <svg ref={graphRef}>
          <g className="graph">
            <g className="layers" fillOpacity={0.8}></g>
            <g
              className="labels"
              pointerEvents="none"
              textAnchor="middle"
              fontSize={10}
            ></g>
          </g>
        </svg>
      </div>
    );
  }
);

// export the module
export default GraphSunburst;

// ==============================================
// Graph Helper Functions
// ==============================================

function partition(data: IHierarchy, radius: number) {
  return d3.partition<IHierarchy>().size([2 * Math.PI, radius])(
    d3
      .hierarchy<IHierarchy>(data)
      .sum((d) => (d.children ? 0 : d.frequency))
      .sort((a, b) => (b.value as number) - (a.value as number))
  );
}

function createArc(radius: number) {
  return d3
    .arc<{ x0: number; x1: number; y0: number; y1: number }>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.003))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 3)
    .cornerRadius(4);
}

function setLayers(
  container: any,
  root: d3.HierarchyRectangularNode<IHierarchy>,
  arc: d3.Arc<
    any,
    {
      x0: number;
      x1: number;
      y0: number;
      y1: number;
    }
  >,
  color: d3.ScaleOrdinal<string, string, never>,
  format: (
    n:
      | number
      | {
          valueOf(): number;
        }
  ) => string
) {
  // prepare the layers
  const layers = container.selectAll("path").data(root.descendants().slice(1));
  // set new layers
  layers
    .enter()
    .append("path")
    .attr("fill", (d: any) => {
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .attr("d", (d: any) => arc(d.current))
    .append("title")
    .text(
      (d: any) =>
        `${d
          .ancestors()
          .map((d: any) => d.data.name)
          .reverse()
          .slice(1)
          .join("/")}\n${format(d.value)}\n${(d.data.precent * 100).toFixed(
          2
        )}%`
    );
  // how to update existing layers
  layers
    .attr("fill", (d: any) => {
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .attr("d", (d: any) => arc(d.current))
    .select("title")
    .text(
      (d: any) =>
        `${d
          .ancestors()
          .map((d: any) => d.data.name)
          .reverse()
          .slice(1)
          .join("/")}\n${format(d.value)}\n${(d.data.precent * 100).toFixed(
          2
        )}%`
    );
  // what to do with removed layers
  layers.exit().remove();
}

function setLabels(
  container: any,
  root: d3.HierarchyRectangularNode<IHierarchy>
) {
  // get the labels value
  const labels = container.selectAll("text").data(
    root
      .descendants()
      .slice(1)
      .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 14)
  );

  // what to do with new labels
  labels
    .enter()
    .append("text")
    .attr("class", styles.label)
    //* download "style" values
    .style("font-family", "Lato")
    .attr("transform", function (d: any) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .attr("dy", "0.35em")
    .text((d: any) => d.data.name);

  // what to do with existing labels
  labels
    .attr("transform", function (d: any) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .text((d: any) => d.data.name);

  // what to do with removed labels
  labels.exit().remove();
}
