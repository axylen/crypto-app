import React, { useState } from 'react';
import { Widget } from 'components/Widget';
import css from './CalculateWidget.module.css';
import { Input } from 'components/Input';
import { cx, roundNumber } from 'utils';
import rightArrow from 'assets/RightArrow.svg';
import { calculateHowMuchCoinsNeed } from 'components/DepositCalculator/DepositCalculator.utils';

export const CalculateWidget: React.FC = () => {
  const [state, setState] = useState({ price: '', min: '', max: '', haveCoin: '', haveUsd: '' });

  const setFieldVal = (val: string, name: string) => {
    setState((v) => ({ ...v, [name]: val }));
  };

  const [need1, need2] = calculateHowMuchCoinsNeed({
    price: parseFloat(state.price) || 0,
    rangeMax: state.max,
    rangeMin: state.min,
    coin1: parseFloat(state.haveCoin) || 0,
    coin2: parseFloat(state.haveUsd) || 0,
  });

  const change1 = (parseFloat(state.haveCoin) || 0) - need1;
  const change2 = (parseFloat(state.haveUsd) || 0) - need2;

  const isChanging1To2 = change1 > change2;

  const handleCopy = () => {
    navigator.clipboard.writeText(Math.max(change1, change2).toString());
  };

  return (
    <Widget className={css.CalculateWidget}>
      <div className={css.CalculateWidget__header}>
        <div className={css.CalculateWidget__title}>Calculate deposit</div>
        <Input
          value={state.price}
          onChange={setFieldVal}
          label="price"
          align="right"
          type="number"
          name="price"
        />
      </div>

      <div>
        <div className={css.CalculateWidget__label}>Range</div>
        <div className={css.CalculateWidget__row}>
          <Input
            value={state.min}
            onChange={setFieldVal}
            label="min"
            align="right"
            type="number"
            name="min"
          />
          <Input
            value={state.max}
            onChange={setFieldVal}
            label="max"
            align="right"
            type="number"
            name="max"
          />
        </div>
      </div>

      <div>
        <div className={css.CalculateWidget__label}>Have</div>
        <div className={css.CalculateWidget__row}>
          <Input
            value={state.haveCoin}
            onChange={setFieldVal}
            label="coin"
            align="right"
            type="number"
            name="haveCoin"
          />
          <Input
            value={state.haveUsd}
            onChange={setFieldVal}
            label="usd"
            align="right"
            type="number"
            name="haveUsd"
          />
        </div>
      </div>

      <div className={css.CalculateWidget__footer}>
        <div
          className={cx(css.CalculateWidget__result, {
            [css.CalculateWidget__result_reversed]: !isChanging1To2,
          })}
        >
          <div>{roundNumber(Math.abs(change1))} coin</div>
          <img src={rightArrow} alt="to" />
          <div>{roundNumber(Math.abs(change2))} usd</div>
        </div>

        <button className={css.CalculateWidget__copy} onClick={handleCopy}>
          Copy
        </button>
      </div>
    </Widget>
  );
};
