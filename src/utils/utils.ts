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

export function download(filename: string, blob: Blob) {
  // create the URL and a element to download the file
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = filename;
  a.href = url;
  // download
  a.click();
}
