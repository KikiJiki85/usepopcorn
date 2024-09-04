export const average = (arr: number[]): number =>
  arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
