// import interfaces
import { EMethodTypes } from "Interfaces";

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
export const formatMethod = (method: string) => {
  switch (method) {
    case EMethodTypes.AGGREGATE:
      return "Subset Aggregate";
    case EMethodTypes.ACTIVE_LEARNING:
      return "Active Learning";
    case EMethodTypes.KMEANS_CLUSTERING:
      return "KMeans Clustering";
    default:
      return method;
  }
};
