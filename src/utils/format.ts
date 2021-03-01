// import interfaces
import { EMethodTypes, IMethod } from "Interfaces";

/**
 * Formats the document number.
 * @param nDocs - Number of documents.
 */
export const formatNumber = (nDocs: number) => {
  if (nDocs / 1e6 > 1) {
    const toFixed = (nDocs % 1e6).toString().length === 6 ? 1 : 0;
    return `${(nDocs / 1e6).toFixed(toFixed)}M`;
  } else if (nDocs / 1e3 > 1) {
    const toFixed = (nDocs % 1e3).toString().length === 3 ? 1 : 0;
    return `${(nDocs / 1e3).toFixed(toFixed)}k`;
  } else {
    return nDocs;
  }
};

/**
 * Formats the date.
 * @param date - The date.
 */
export const formatDate = (date: Date) => {
  const dateYear = date.getFullYear();
  const dateMonth = `0${date.getMonth() + 1}`.substring(0, 2);
  const dateDay = `0${date.getDate()}`.substring(0, 2);
  return `${dateYear}-${dateMonth}-${dateDay}`;
};

/**
 * Formats the method type.
 * @param method - The method type.
 */
export const formatMethodType = (method: string) => {
  switch (method) {
    case EMethodTypes.AGGREGATE:
      return "Subset Aggregates";
    case EMethodTypes.ACTIVE_LEARNING:
      return "Active Learning";
    case EMethodTypes.KMEANS_CLUSTERING:
      return "KMeans Clustering";
    default:
      return method;
  }
};

/**
 * Formats the method type.
 * @param method - The method type.
 */
export const formatMethodLabel = (method: IMethod) => {
  const type = formatMethodType(method.method);
  let parameters: string = "";
  switch (method.method) {
    case EMethodTypes.ACTIVE_LEARNING:
      parameters = "(2)";
      break;
    case EMethodTypes.KMEANS_CLUSTERING:
      parameters = `${method.result.clusters.length}`;
      if (method.result.empty) {
        // add the empty cluster
        parameters += " + 1 empty";
      }
      parameters = `(${parameters})`;
      break;
    case EMethodTypes.AGGREGATE:
    default:
      break;
  }
  return `${type} ${parameters}`;
};
