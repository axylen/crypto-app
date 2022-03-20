import React, { useState } from 'react';
import { Input } from 'components/Input';
import { BASE_STABLECOIN } from 'app-constants';
import css from './DepositCalculator.module.css';
import rightArrow from 'assets/RightArrow.svg';
import { useCoinPriceService } from 'services/CoinPriceService';
import { observer } from 'mobx-react-lite';
import { calculateHowMuchCoinsNeed, formatCoinValue } from './DepositCalculator.utils';

type Props = {
  coin: string;
  className?: string;
};

export const DepositCalculator: React.FC<Props> = observer((props) => {
  const { coin, className } = props;
  const [haveCoin1, setHaveCoin1] = useState('');
  const [haveCoin2, setHaveCoin2] = useState('');

  const coinPriceService = useCoinPriceService(coin);

  const [need1, need2] = calculateHowMuchCoinsNeed({
    price: coinPriceService.price,
    rangeMax: coinPriceService.maxRangeValue,
    rangeMin: coinPriceService.minRangeValue,
    coin1: parseFloat(haveCoin1) || 0,
    coin2: parseFloat(haveCoin2) || 0,
  });

  const change1 = (parseFloat(haveCoin1) || 0) - need1;
  const change2 = (parseFloat(haveCoin2) || 0) - need2;

  const isChanging1To2 = change1 > change2;

  return (
    <div className={className}>
      <div className={css.DepositCalculator__table}>
        <div className={css.DepositCalculator__tableRow}>
          <span>Have</span>
          <Input value={haveCoin1} onChange={setHaveCoin1} label={coin} type="number"></Input>
          <Input
            value={haveCoin2}
            onChange={setHaveCoin2}
            label={BASE_STABLECOIN}
            type="number"
          ></Input>
        </div>

        <div className={css.DepositCalculator__tableRow}>
          <span>Need</span>
          <Input label={coin} readonly value={formatCoinValue(need1)}></Input>
          <Input label={BASE_STABLECOIN} readonly value={formatCoinValue(need2)}></Input>
        </div>
      </div>

      <div className={css.DepositCalculator__result}>
        <div>
          <span className={css.DepositCalculator__autoselect}>
            {formatCoinValue(Math.abs(change1))}
          </span>{' '}
          {isChanging1To2 ? coin : BASE_STABLECOIN}
        </div>
        <img src={rightArrow} alt="to" />
        <div>
          <span className={css.DepositCalculator__autoselect}>
            {formatCoinValue(Math.abs(change2))}
          </span>{' '}
          {isChanging1To2 ? BASE_STABLECOIN : coin}
        </div>
      </div>
    </div>
  );
});
