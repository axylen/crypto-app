import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { cx } from 'utils';
import { BASE_STABLECOIN } from 'app-constants';
import { CoinPriceService, useCoinPriceService } from 'services/CoinPriceService';
import { Input } from 'components/Input';
import { PriceInfo } from './PriceInfo';
import css from './CoinInfo.module.css';

type Props = {
  coin: string;
  className?: string;
};

const buildLink = (coin: string) => `https://www.binance.com/en/trade/${coin}_${BASE_STABLECOIN}`;

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

export const CoinInfo2: React.FC<Props> = observer((props) => {
  const { coin, className } = props;
  const coinPriceService = useMemo(() => new CoinPriceService(coin), [coin]);

  useEffect(() => {
    return () => {
      coinPriceService?.destroy();
    };
  }, [coin, coinPriceService]);

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

  const dangerLevel =
    price &&
    (Math.min(range.toMax, range.toMin) <= 10
      ? 'danger'
      : Math.min(range.toMax, range.toMin) <= 15
      ? 'warn'
      : undefined);

  return (
    <div className={className}>
      <div className={css.CoinPriceWidget__header}>
        <a
          href={buildLink(coin)}
          target="_blank"
          rel="noreferrer"
          className={css.CoinPriceWidget__coin}
        >
          {coin}
          <span className={css.CoinPriceWidget__coin_stable}>{BASE_STABLECOIN}</span>
        </a>

        <code className={css.CoinPriceWidget__price}>
          <span
            className={cx({
              [css.CoinPriceWidget__price_danger]: dangerLevel === 'danger',
              [css.CoinPriceWidget__price_warn]: dangerLevel === 'warn',
            })}
          >
            {coinPriceService.price.toFixed(4)}
          </span>
          <div className={css.CoinPriceWidget__percents}>
            {price ? `${range.toMin.toFixed(0)}% / ${range.toMax.toFixed(0)}%` : 'loading...'}
          </div>
        </code>
      </div>

      <div className={css.CoinPriceWidget__priceRange}>
        <Input
          label="min"
          type="number"
          onChange={handleMinChange}
          value={coinPriceService.minRangeValue}
          align="right"
        />
        <Input
          label="max"
          type="number"
          onChange={handleMaxChange}
          value={coinPriceService.maxRangeValue}
          align="right"
        />
      </div>
    </div>
  );
});

export const CoinInfo: React.FC<Props> = observer((props) => {
  const { coin, className } = props;

  const coinPriceService = useCoinPriceService(coin);

  return (
    <div className={cx(css.CoinInfo, className)}>
      <header className={css.CoinInfo__header}>
        <a
          href={buildLink(coin)}
          target="_blank"
          rel="noreferrer"
          className={css.CoinInfo__currencyPair}
        >
          {coin}
          <span className={css.CoinInfo__secondaryCurrency}>{BASE_STABLECOIN}</span>
        </a>
      </header>

      <PriceInfo
        className={css.CoinInfo__priceInfo}
        price={coinPriceService.price}
        rangeMax={coinPriceService.maxRangeValue}
        rangeMin={coinPriceService.minRangeValue}
      />

      <div className={css.CoinInfo__priceRange}>
        <Input
          label="min"
          type="number"
          onChange={coinPriceService.setMinRangeValue}
          value={coinPriceService.minRangeValue}
          align="right"
        />
        <Input
          label="min"
          type="number"
          onChange={coinPriceService.setMaxRangeValue}
          value={coinPriceService.maxRangeValue}
          align="right"
        />
      </div>
    </div>
  );
});
