import React, { useState } from 'react';
import { Input } from 'components/Input';
import { cx } from 'utils';
import css from './PoolComissionComparator.module.css';

type Props = {
  className?: string;
};

export const PoolComissionComparator: React.FC<Props> = (props) => {
  const { className } = props;
  const [pool1Vol, setPool1Vol] = useState('');
  const [pool1TVL, setPool1TVL] = useState('');
  const [pool2Vol, setPool2Vol] = useState('');
  const [pool2TVL, setPool2TVL] = useState('');
  const [pool3Vol, setPool3Vol] = useState('');
  const [pool3TVL, setPool3TVL] = useState('');

  const calculate = (pool: string) => {
    let result = 0;
    if (pool === '0.05') {
      result = parseFloat(pool1Vol) / parseFloat(pool1TVL);
    }
    if (pool === '0.3') {
      result = (parseFloat(pool2Vol) / parseFloat(pool2TVL)) * 6;
    }
    if (pool === '1') {
      result = (parseFloat(pool3Vol) / parseFloat(pool3TVL)) * 20;
    }
    result = Number.isFinite(result) ? result : 0;
    return result === Math.trunc(result) ? Math.trunc(result) : parseFloat(result.toFixed(1));
  };

  const computed = {
    '0.05': calculate('0.05'),
    '0.3': calculate('0.3'),
    '1': calculate('1'),
  };

  const getKeyOfMax = () => {
    const { '0.05': first, '0.3': second, '1': third } = computed;
    if (first > second && first > third) return '0.05';
    if (second > first && second > third) return '0.3';
    if (third > first && third > second) return '1';
    return null;
  };

  return (
    <div className={className}>
      <div className={css.PoolComissionComparator__table}>
        <div className={css.PoolComissionComparator__smallRow}>
          <div className={cx({ [css.PoolComissionComparator__bestVal]: getKeyOfMax() === '0.05' })}>
            0.05%
          </div>
          <div className={cx({ [css.PoolComissionComparator__bestVal]: getKeyOfMax() === '0.3' })}>
            0.3%
          </div>
          <div className={cx({ [css.PoolComissionComparator__bestVal]: getKeyOfMax() === '1' })}>
            1%
          </div>
        </div>
        <div className={css.PoolComissionComparator__tableRow}>
          <span className={css.PoolComissionComparator__text}>Volume</span>
          <Input align="center" type="number" value={pool1Vol} onChange={setPool1Vol}></Input>
          <Input align="center" type="number" value={pool2Vol} onChange={setPool2Vol}></Input>
          <Input align="center" type="number" value={pool3Vol} onChange={setPool3Vol}></Input>
        </div>
        <div className={css.PoolComissionComparator__tableRow}>
          <span className={css.PoolComissionComparator__text}>TVL</span>
          <Input align="center" type="number" value={pool1TVL} onChange={setPool1TVL}></Input>
          <Input align="center" type="number" value={pool2TVL} onChange={setPool2TVL}></Input>
          <Input align="center" type="number" value={pool3TVL} onChange={setPool3TVL}></Input>
        </div>
        <div className={css.PoolComissionComparator__smallRow}>
          <div className={cx({ [css.PoolComissionComparator__bestVal]: getKeyOfMax() === '0.05' })}>
            {computed['0.05']}
          </div>
          <div className={cx({ [css.PoolComissionComparator__bestVal]: getKeyOfMax() === '0.3' })}>
            {computed['0.3']}
          </div>
          <div className={cx({ [css.PoolComissionComparator__bestVal]: getKeyOfMax() === '1' })}>
            {computed['1']}
          </div>
        </div>
      </div>
    </div>
  );
};
