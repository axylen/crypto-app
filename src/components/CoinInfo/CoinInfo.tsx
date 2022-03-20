import React from 'react';
import { observer } from 'mobx-react-lite';
import { cx } from 'utils';
import { BASE_STABLECOIN } from 'app-constants';
import { useCoinPriceService } from 'services/CoinPriceService';
import { Input } from 'components/Input';
import { PriceInfo } from './PriceInfo';
import css from './CoinInfo.module.css';

type Props = {
  coin: string;
  className?: string;
};

const buildLink = (coin: string) => `https://www.binance.com/en/trade/${coin}_${BASE_STABLECOIN}`;

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
