import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { copyToClipboard, cx } from 'utils';
import { Widget } from 'components/Widget';
import { CoingeckoService } from 'services/CoingeckoService';
import css from './CryptoIndexWidget.module.css';

type Props = {
  className?: string;
};

export const CryptoIndexWidget: React.FC<Props> = observer((props) => {
  const { className } = props;
  const coingeckoService = useContext(CoingeckoService);

  useEffect(() => {
    coingeckoService.fetchMarkets();
  }, []);

  return (
    <Widget className={cx(className, css.CryptoIndex)}>
      <div className={css.CryptoIndex__header}>
        <h3 className={css.CryptoIndex__heading}>Crypto Index</h3>

        <div className={css.CryptoIndex__copy} onClick={() => copyToClipboard(coingeckoService.getCoinListIncludedAsCsv())}>
          Copy CSV
        </div>
      </div>

      <table className={css.CryptoIndex__table}>
        <thead className={css.CryptoIndex__tableHeader}>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Cap</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {coingeckoService.getCoinListViewModel().map((coin) => (
            <tr
              key={coin.id}
              onClick={() => coingeckoService.toggleCoinInclusion(coin.id)}
              className={cx(css.CryptoIndex__row, {
                [css.CryptoIndex__row_disabled]: !coin.isInclueded,
              })}
            >
              <td className={css.CryptoIndex__name}>
                <img src={coin.imageUrl} alt={coin.name} className={css.CryptoIndex__image} />
                {coin.symbol}
              </td>
              <td>${coin.price}</td>
              <td>${coin.marketCap.toLocaleString()}</td>
              <td>{coin.capPercentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Widget>
  );
});
