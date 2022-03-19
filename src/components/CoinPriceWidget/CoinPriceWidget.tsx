import React from 'react';
import { cx } from 'utils';
import { Price } from 'components/Price';
import css from './CoinPriceWidget.module.css';
import { BASE_SABLECOIN } from 'app-constants';

type Props = {
  coin: string;
  className?: string;
};

const buildLink = (coin: string) => `https://www.binance.com/en/trade/${coin}_${BASE_SABLECOIN}`;

export const CoinPriceWidget: React.FC<Props> = (props) => {
  const { coin, className } = props;

  return (
    <div className={cx(css.CoinPriceWidget, className)}>
      <a href={buildLink(coin)} target="_blank" rel="noreferrer" className={css.CoinPriceWidget__header}>
        <h3 className={css.CoinPriceWidget__coin}>
          {coin}
          <span className={css.CoinPriceWidget__coin_stable}>{BASE_SABLECOIN}</span>
        </h3>

        <code className={css.CoinPriceWidget__price}>
          <Price coin={coin} />
        </code>
      </a>
    </div>
  );
};
