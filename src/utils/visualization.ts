// import modules
import * as d3 from "d3";

// ==============================================
// scale functions
// ==============================================

export function createLinearScale(domain: number[], range: number[]) {
  return d3.scaleLinear().domain(domain).range(range).nice();
}

export function createLogScale(domain: number[], range: number[]) {
  return d3.scaleLog().domain(domain).range(range).nice();
}

export function createBandScale(domain: string[], range: number[]) {
  return d3.scaleBand().domain(domain).range(range).padding(0.1);
}

export function createQuantizeScale(domain: number[], range: any[]) {
  return d3.scaleQuantize().domain(domain).range(range);
}

export function createColorScale(labels: string[]) {
  return d3.scaleOrdinal(
    labels,
    d3.quantize(d3.interpolateRainbow, labels.length + 1)
  );
}

// ==============================================
// svg functions
// ==============================================

export function updateSVG(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  },
  center: boolean = false
) {
  return svg
    .attr("width", width)
    .attr("height", height)
    .select("g.graph")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr(
      "transform",
      center
        ? `translate(${width / 2}, ${height / 2})`
        : `translate(${margin.left}, ${margin.top})`
    );
}
