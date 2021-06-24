// ==============================================
// Responsive Grid Defaults
// ==============================================

const breakpointValues: {
  label: string;
  cols: number;
  breakpoint: number;
  padding: [number, number];
}[] = [
  { label: "xl", cols: 18, breakpoint: 1200, padding: [16, 16] },
  { label: "lg", cols: 12, breakpoint: 1024, padding: [16, 16] },
  { label: "md", cols: 9, breakpoint: 768, padding: [16, 16] },
  { label: "sm", cols: 6, breakpoint: 640, padding: [16, 16] },
  { label: "xs", cols: 3, breakpoint: 480, padding: [16, 16] },
  { label: "xxs", cols: 3, breakpoint: 0, padding: [16, 16] },
];

export const responsivePb: { [key: string]: number } = {};
export const responsiveCp: { [key: string]: [number, number] } = {};
export const responsiveCols: { [key: string]: number } = {};
for (const value of breakpointValues) {
  responsivePb[value.label] = value.breakpoint;
  responsiveCp[value.label] = value.padding;
  responsiveCols[value.label] = value.cols;
}

/**
 * Generates the grid layout for the given breakpoint.
 * @param children - The grid children.
 * @param bp - The breakpoint.
 */
export function generateGrid(children: React.ReactChild[], bp: string) {
  // get the number of columns
  const cols = responsiveCols[bp];
  return children.map(({ props }: any, i: number) => {
    const minW = props?.minW
      ? props?.minW > cols
        ? cols
        : props?.minW
      : cols > 12
      ? 2
      : 3;
    const minH = props?.minH
      ? props?.minH > cols
        ? cols
        : props?.minH
      : cols > 12
      ? 2
      : 3;
    const w = minW > cols / 2 ? cols : minW > 3 ? minW : 3;
    const h = minH > 3 ? minH : 3;
    return {
      x: (i * w) % cols,
      y: Math.floor((i * h) / 12),
      w,
      h,
      minW,
      minH,
      i: i.toString(),
      static: false,
    };
  });
}
