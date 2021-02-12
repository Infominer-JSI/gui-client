// import modules
import React from "react";
// import graph components
import GraphSunburst from "components/Graph/GraphSunburst";

export default function Graph(props: {
  type: string;
  data: any;
  className?: any;
}) {
  // get the prop values
  const { type, data, className } = props;
  /**
   * Selects and visualize the graph.
   * @param type - The graph type.
   * @param data - The graph data.
   */
  function selectGraph(type: string, data: any) {
    switch (type) {
      case "hierarchy":
        return <GraphSunburst className={className} data={data.values} />;
      default:
        return null;
    }
  }
  // visualize the graph
  return <React.Fragment>{selectGraph(type, data)}</React.Fragment>;
}
