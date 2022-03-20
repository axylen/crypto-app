import { clampNum } from 'utils';

export const getRange = ({ value, min, max }: { value: number; min: string; max: string }) => {
  if (!min || !max || !value) return;

  const minAsNum = parseFloat(min) || 0;
  const maxAsNum = parseFloat(max) || 0;

  const range = maxAsNum - minAsNum;
  const toMin = value - minAsNum;
  const toMax = maxAsNum - value;

  return {
    toMin: clampNum((toMin / range) * 100, 100),
    toMax: clampNum((toMax / range) * 100, 100),
  };
};

export const getDangerLevelFromRange = (min: number, max: number) => {
  const minPercent = Math.min(min, max);

  if (minPercent <= 3) return 'danger';
  if (minPercent <= 10) return 'warn';
};
