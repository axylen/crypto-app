import React from 'react';
import { cx } from 'utils';
import { Input } from 'components/Input';
import { BASE_STABLECOIN } from 'app-constants';
import css from './DepositCalculator.module.css';
import rightArrow from 'assets/RightArrow.svg';

type Props = {
  coin: string;
  className?: string;
};

export const DepositCalculator: React.FC<Props> = (props) => {
  const { coin, className } = props;

  return (
    <div className={className}>
      <div className={css.DepositCalculator__table}>
        <div className={css.DepositCalculator__tableRow}>
          <span>Have</span>
          <Input label={coin}></Input>
          <Input label={BASE_STABLECOIN}></Input>
        </div>

        <div className={css.DepositCalculator__tableRow}>
          <span>Need</span>
          <Input label={coin} readonly></Input>
          <Input label={BASE_STABLECOIN} readonly></Input>
        </div>
      </div>

      <div className={css.DepositCalculator__result}>
        <div>50 {coin}</div>
        <img src={rightArrow} alt="to" />
        <div>100 {BASE_STABLECOIN}</div>
      </div>
    </div>
  );
};
