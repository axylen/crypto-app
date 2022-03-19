import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { cx } from 'utils';
import { BASE_SABLECOIN } from 'app-constants';
import { Price } from 'components/Price';
import { Input } from 'components/Input';
import css from './CoinPriceWidget.module.css';
import { CoinPriceService } from 'services/CoinPriceService';

type Props = {
  coin: string;
  className?: string;
};

const buildLink = (coin: string) => `https://www.binance.com/en/trade/${coin}_${BASE_SABLECOIN}`;

const getRange = ({ value, min, max }: { value: number; min: number; max: number }) => {
  const range = max - min;
  const toMin = value - min;
  const toMax = max - value;

  return {
    range,
    toMin: (toMin / range) * 100,
    toMax: (toMax / range) * 100,
  };
};

export const CoinPriceWidget: React.FC<Props> = observer((props) => {
  const { coin, className } = props;
  const coinPriceService = useMemo(() => new CoinPriceService(coin), [coin]);

  const handleMinChange = (val: string) => {
    coinPriceService.minRangeValue = val;
  };

  const handleMaxChange = (val: string) => {
    coinPriceService.maxRangeValue = val;
  };

  const { price, maxRangeValue, minRangeValue } = coinPriceService;

  const range = getRange({
    value: price,
    min: parseFloat(minRangeValue) || 0,
    max: parseFloat(maxRangeValue) || 0,
  });

  const dangerLevel = price && (Math.min(range.toMax, range.toMin) <= 10 ? 'danger' : Math.min(range.toMax, range.toMin) <= 15 ? 'warn' : undefined);

  return (
    <div className={cx(css.CoinPriceWidget, className)}>
      <a href={buildLink(coin)} target="_blank" rel="noreferrer" className={css.CoinPriceWidget__header}>
        <h3 className={css.CoinPriceWidget__coin}>
          {coin}
          <span className={css.CoinPriceWidget__coin_stable}>{BASE_SABLECOIN}</span>
        </h3>

        <code className={css.CoinPriceWidget__price}>
          <Price
            className={cx({
              [css.CoinPriceWidget__price_danger]: dangerLevel === 'danger',
              [css.CoinPriceWidget__price_warn]: dangerLevel === 'warn',
            })}
            coin={coin}
          />
        </code>
      </a>

      <div className={css.CoinPriceWidget__priceRange}>
        <Input label="min" type="number" onChange={handleMinChange} value={coinPriceService.minRangeValue} />
        <Input label="max" type="number" onChange={handleMaxChange} value={coinPriceService.maxRangeValue} />
        <div className={css.CoinPriceWidget__percents}>{price ? `${range.toMin.toFixed(2)}% / ${range.toMax.toFixed(2)}%` : 'loading...'}</div>
      </div>
    </div>
  );
});
