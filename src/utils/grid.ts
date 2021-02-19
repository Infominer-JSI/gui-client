// ==============================================
// Responsive Grid Defaults
// ==============================================

const breakpointValues: {
  label: string;
  cols: number;
  breakpoint: number;
  padding: [number, number];
}[] = [
  { label: "xl", cols: 12, breakpoint: 1200, padding: [16, 16] },
  { label: "lg", cols: 12, breakpoint: 1024, padding: [0, 16] },
  { label: "md", cols: 9, breakpoint: 768, padding: [0, 16] },
  { label: "sm", cols: 6, breakpoint: 640, padding: [0, 16] },
  { label: "xs", cols: 3, breakpoint: 480, padding: [0, 16] },
  { label: "xxs", cols: 3, breakpoint: 0, padding: [0, 16] },
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
export function generateGrid(children: any[], bp: string) {
  // get the number of columns
  const cols = responsiveCols[bp];
  return children.map((_child: any, i: number) => ({
    x: (i * 3) % cols,
    y: Math.floor((i * 3) / 12),
    w: 3,
    h: 3,
    minW: cols === 12 ? 2 : 3,
    minH: cols === 12 ? 2 : 3,
    i: i.toString(),
    static: false,
  }));
}
