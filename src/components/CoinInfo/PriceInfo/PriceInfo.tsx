import React from 'react';
import css from './PriceInfo.module.css';
import { getDangerLevelFromRange, getRange } from './PriceInfo.utils';
import { cx } from 'utils';

type Props = {
  price: number;
  rangeMin: string;
  rangeMax: string;
  className?: string;
};

export const PriceInfo: React.FC<Props> = (props) => {
  const { className, price, rangeMax, rangeMin } = props;

  const range = getRange({ value: price, min: rangeMin, max: rangeMax });

  const dangerLevel = range && getDangerLevelFromRange(range.toMin, range.toMax);

  return (
    <div className={cx(className, css.PriceInfo)}>
      <code
        className={cx(css.PriceInfo__price, {
          [css.PriceInfo__price_danger]: dangerLevel === 'danger',
          [css.PriceInfo__price_warn]: dangerLevel === 'warn',
        })}
      >
        {price || 'Loading'}
      </code>

      {range && (
        <code className={css.PriceInfo__share}>
          <span>{Math.round(range.toMin)}%</span>
          <span className={css.PriceInfo__shareSplit}>/</span>
          <span>{Math.round(range.toMax)}%</span>
        </code>
      )}
    </div>
  );
};
