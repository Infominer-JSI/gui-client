/**
 * Sleeps the processes for a number of milliseconds.
 * @param ms - Number of milliseconds.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
