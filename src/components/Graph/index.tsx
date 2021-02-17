// import modules
import React from "react";
// import graph components
import GraphSunburst from "components/Graph/GraphSunburst";
import GraphKeywords from "components/Graph/GraphKeywords";
import GraphWordcloud from "components/Graph/GraphWordcloud";

const Graph = React.forwardRef(
  (
    props: {
      type: string;
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
    function selectGraph(type: string, data: any) {
      switch (type) {
        case "hierarchy":
          return (
            <GraphSunburst
              data={data.values}
              branches={data.branches}
              className={className}
              ref={graphRef}
            />
          );
        case "keywords":
          return (
            <GraphKeywords
              data={data.values}
              className={className}
              ref={graphRef}
            />
          );
        // case "keywords":
        //   return (
        //     <GraphWordcloud
        //       data={data.values}
        //       className={className}
        //       ref={graphRef}
        //     />
        //   );
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
