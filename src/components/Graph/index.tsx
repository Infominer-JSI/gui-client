// import modules
import React from "react";
// import graph components
import GraphSunburst from "components/Graph/GraphSunburst";
import GraphBarchart from "components/Graph/GraphBarchart";
import GraphPiechart from "components/Graph/GraphPiechart";
import GraphWordcloud from "components/Graph/GraphWordcloud";
import GraphHistogram from "components/Graph/GraphHistogram";

//===============================================
// Define the component interfaces
//===============================================

interface GraphProps {
  type: string | null;
  data: any;
  className?: any;
}

//===============================================
// Define the component
//===============================================

const Graph = React.forwardRef((props: GraphProps, graphRef: any) => {
  // get the prop values
  const { type, data, className } = props;

  /**
   * Selects and visualize the graph.
   * @param type - The graph type.
   * @param data - The graph data.
   */
  function selectGraph(type: string | null, data: any) {
    switch (type) {
      case "sunburst":
        return (
          <GraphSunburst
            ref={graphRef}
            className={className}
            data={data.values}
            keys={data.keys}
          />
        );
      case "keywords":
        return (
          <GraphBarchart
            ref={graphRef}
            className={className}
            data={data.values}
            color="blue"
          />
        );
      case "wordcloud":
        return (
          <GraphWordcloud
            ref={graphRef}
            className={className}
            data={data.values}
          />
        );
      case "barchart":
        return (
          <GraphBarchart
            ref={graphRef}
            className={className}
            data={data.values}
            color="green"
          />
        );
      case "piechart":
        return (
          <GraphPiechart
            ref={graphRef}
            className={className}
            data={data.values}
            keys={data.keys}
          />
        );
      case "histogram":
        return (
          <GraphHistogram ref={graphRef} className={className} data={data} />
        );
      default:
        return null;
    }
  }
  // visualize the graph
  return selectGraph(type, data);
});

// export the forward graph
export default Graph;
