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

/**
 * Formats the date.
 * @param date - The date.
 */
export const formatDate = (date: Date) => {
  const dateYear = date.getFullYear();
  const dateMonth = `0${date.getMonth() + 1}`.substring(0, 2);
  const dateDay = date.getDate();
  return `${dateYear}-${dateMonth}-${dateDay}`;
};
