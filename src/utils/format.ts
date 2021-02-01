/**
 * Formats the document number.
 * @param nDocs - Number of documents.
 */
export const formatNumber = (nDocs: number) => {
  if (nDocs / 1e6 > 1) {
    const toFixed = (nDocs % 1e6).toString().length === 6 ? 1 : 0;
    return `${(nDocs / 1e6).toFixed(toFixed)}M`;
  } else if (nDocs / 1e3 > 1) {
    const toFixed = (nDocs % 1e6).toString().length === 6 ? 1 : 0;
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
  const dateDay = date.getDate();
  return `${dateYear}-${dateMonth}-${dateDay}`;
};
