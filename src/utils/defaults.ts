const breakpointValues = [
  { label: "2xl", cols: 12, breakpoint: 1536 },
  { label: "xl", cols: 12, breakpoint: 1280 },
  { label: "lg", cols: 12, breakpoint: 1024 },
  { label: "md", cols: 9, breakpoint: 768 },
  { label: "sm", cols: 6, breakpoint: 640 },
  { label: "xs", cols: 4, breakpoint: 480 },
  { label: "xxs", cols: 2, breakpoint: 0 },
];

export const responsivePb: { [key: string]: number } = {};
export const responsiveCols: { [key: string]: number } = {};
for (const value of breakpointValues) {
  responsivePb[value.label] = value.breakpoint;
  responsiveCols[value.label] = value.cols;
}
