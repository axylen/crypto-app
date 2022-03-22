import React from 'react';
import { cx } from 'utils';
import { Widget } from 'components/Widget';
import { CoinPriceWidget } from 'components/CoinPriceWidget';
import { PoolComissionComparator } from 'components/PoolComissionComparator';
import css from './PricesContainer.module.css';

type Props = {
  className?: string;
};

const coins = ['matic', 'btc', 'eth'];

export const PricesContainer: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={cx(css.PricesContainer, className)}>
      {coins.map((name) => (
        <React.Fragment key={name}>
          <CoinPriceWidget className={css.PricesContainer__item} coin={name} />
          <Widget className={css.PricesContainer__comparator}>
            <PoolComissionComparator />
          </Widget>
        </React.Fragment>
      ))}
    </div>
  );
};
