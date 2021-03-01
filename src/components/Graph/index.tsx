// import modules
import React from "react";
// import graph components
import GraphSunburst from "components/Graph/GraphSunburst";
import GraphBarchart from "components/Graph/GraphBarchart";
import GraphPiechart from "components/Graph/GraphPiechart";
import GraphWordcloud from "components/Graph/GraphWordcloud";
import GraphHistogram from "components/Graph/GraphHistogram";

const Graph = React.forwardRef(
  (
    props: {
      type: string | null;
      data: any;
      className?: any;
    },
    graphRef: any
  ) => {
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
              data={data.values}
              keys={data.keys}
              className={className}
              ref={graphRef}
            />
          );
        case "keywords":
          return (
            <GraphBarchart
              data={data.values}
              className={className}
              ref={graphRef}
              color="blue"
            />
          );
        case "wordcloud":
          return (
            <GraphWordcloud
              data={data.values}
              className={className}
              ref={graphRef}
            />
          );
        case "barchart":
          return (
            <GraphBarchart
              data={data.values}
              className={className}
              ref={graphRef}
              color="green"
            />
          );
        case "piechart":
          return (
            <GraphPiechart
              data={data.values}
              keys={data.keys}
              className={className}
              ref={graphRef}
            />
          );
        case "histogram":
          return (
            <GraphHistogram data={data} className={className} ref={graphRef} />
          );
        default:
          return null;
      }
    }
    // visualize the graph
    return <React.Fragment>{selectGraph(type, data)}</React.Fragment>;
  }
);

// export the forward graph
export default Graph;
