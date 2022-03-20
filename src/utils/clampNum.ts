export const clampNum = (value: number, max: number, min: number = 0) => {
  return Math.max(min, Math.min(max, value));
};
