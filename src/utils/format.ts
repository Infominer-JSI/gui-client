/**
 * Formats the document number.
 * @param nDocs - Number of documents.
 */
export const formatNumber = (nDocs: number) => {
  if (nDocs / 1e6 > 1) {
    return `${(nDocs / 1e6).toFixed(0)}M`;
  } else if (nDocs / 1e3 > 1) {
    return `${(nDocs / 1e3).toFixed(0)}k`;
  } else {
    return nDocs;
  }
};
