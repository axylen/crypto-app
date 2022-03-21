export const roundNumber = (val: number, maxFractionDigit = 6) => {
  return String(parseFloat(val.toFixed(maxFractionDigit)));
};
