import React from 'react';
import { cx } from 'utils';
import { CoinPriceWidget } from 'components/CoinPriceWidget';
import css from './PricesContainer.module.css';

type Props = {
  className?: string;
};

const coins = ['eth', 'btc', 'matic'];

export const PricesContainer: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={cx(css.PricesContainer, className)}>
      {coins.map((name) => (
        <CoinPriceWidget className={css.PricesContainer__item} coin={name} key={name} />
      ))}
    </div>
  );
};
