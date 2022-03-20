import { getRange } from '../CoinInfo/PriceInfo/PriceInfo.utils';

interface CalculateHowMuchCoinsNeedProps {
  price: number;
  coin1: number;
  coin2: number;
  rangeMin: string;
  rangeMax: string;
}

export const calculateHowMuchCoinsNeed = ({
  price,
  coin1,
  coin2,
  rangeMin,
  rangeMax,
}: CalculateHowMuchCoinsNeedProps) => {
  const range = getRange({ value: price, min: rangeMin, max: rangeMax });

  if (!range) return [0, 0];

  const sum = price * coin1 + coin2;

  const need1 = ((range.toMin / 100) * sum) / price;
  const need2 = (range.toMax / 100) * sum;

  return [need1, need2];
};

export const formatCoinValue = (val: number, maxFractionDigit = 6) => {
  return String(parseFloat(val.toFixed(maxFractionDigit)));
};
