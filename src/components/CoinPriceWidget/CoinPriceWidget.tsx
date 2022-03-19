import React from 'react';
import { cx } from 'utils';
import { Price } from 'components/Price';
import css from './CoinPriceWidget.module.css';

type Props = {
  coin: string;
  className?: string;
};

export const CoinPriceWidget: React.FC<Props> = (props) => {
  const { coin, className } = props;

  return (
    <div className={cx(css.CoinPriceWidget, className)}>
      <div className={css.CoinPriceWidget__header}>
        <h3 className={css.CoinPriceWidget__coin}>{coin}</h3>
        <code className={css.CoinPriceWidget__price}>
          <Price coin={coin} />
        </code>
      </div>
    </div>
  );
};
