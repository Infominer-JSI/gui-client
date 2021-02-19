/**
 * Sleeps the processes for a number of milliseconds.
 * @param ms - Number of milliseconds.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Converts the SVG element into a string.
 * @param svg - The SVG element.
 */
export function convertSVG(svg: SVGSVGElement) {
  return new XMLSerializer().serializeToString(svg);
}

/**
 * Downloads the blob.
 * @param filename - The file name.
 * @param blob - The image/file blob.
 */
export function download(filename: string, blob: Blob) {
  // create the URL and a element to download the file
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = filename;
  a.href = url;
  // download
  a.click();
}

/**
 * Trims the field.
 * @param field - The field to trim.
 * @param length - The length of the trimmed field.
 */
export function trimString(field: string, length: number) {
  return field
    ? `${field.slice(0, length)}${field.length > length ? "..." : ""}`
    : "N/A";
}

// ==============================================
// Data conversion functions
// ==============================================

export function convertData(data: any, type: string, graph: string) {
  switch (type) {
    case "keywords":
      return convertKeywords(data, graph);
    case "hierarchy":
      return convertHierarchy(data, graph);
    case "count":
      return convertCount(data, graph);
    case "histogram":
      return data;
    case "timeline":
      return data;
    default:
      return data;
  }
}

function convertKeywords(data: any, graph: string) {
  switch (graph) {
    case "keywords":
      return {
        values: data.values.map((value: any) => ({
          value: value.keyword,
          frequency: value.weight.toFixed(2),
          precent: value.weight,
        })),
      };
    default:
      return data;
  }
}

function convertHierarchy(data: any, graph: string) {
  switch (graph) {
    case "sunburst":
      return data;
    default:
      return data;
  }
}

function convertCount(data: any, graph: string) {
  switch (graph) {
    case "piechart":
      return { ..._trimData(data, 11), keys: data.keys };
    case "barchart":
      return _trimData(data, 150);
    default:
      return data;
  }
}

function _trimData(data: any, limit: number) {
  const other = data.values.slice(limit).reduce(
    (prev: any, curr: any) => {
      prev.frequency += curr.frequency;
      prev.precent += curr.precent / 100;
      return prev;
    },
    { value: "other", frequency: 0, precent: 0 }
  );
  // get the top limit values
  const values = data.values.slice(0, limit).map((value: any) => ({
    value: value.value,
    frequency: value.frequency,
    precent: value.precent / 100,
  }));
  // if other has some values concatenate
  if (other.frequency > 0) {
    other.precent = Math.min(other.precent, 1);
    values.push(other);
  }
  // return the values
  return { values };
}
