export const average = (arr: number[]): number => {
  const result = arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
  return isNaN(result) ? 0 : result;
};

export const KEY = 'c26bf5e5';
