/**
 * Prepares the primary and optional visualizations.
 * @param type - The aggregate type.
 */
export function getGraphOptions(type: string) {
  switch (type) {
    case "keywords":
      return { primaryId: 0, options: ["keywords", "wordcloud"] };
    case "hierarchy":
      return { primaryId: 0, options: ["sunburst"] };
    case "count":
      // TODO: set the graph options
      return { primaryId: 0, options: ["barchart", "piechart"] };
    case "histogram":
      // TODO: set the graph options
      return { primaryId: 0, options: ["histogram"] };
    case "timeline":
      // TODO: set the graph options
      return { primaryId: 0, options: ["timeline"] };
    default:
      return { primaryId: 0, options: [] };
  }
}
