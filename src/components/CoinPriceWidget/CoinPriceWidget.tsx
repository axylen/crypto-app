import React from "react";
import { Widget } from "components/Widget";
import { CoinInfo } from "components/CoinInfo";
import { DepositCalculator } from "components/DepositCalculator";
import { PoolComissionComparator } from "components/PoolComissionComparator";
import css from "./CoinPriceWidget.module.css";

type Props = {
  coin: string;
  className?: string;
};

export const CoinPriceWidget: React.FC<Props> = (props) => {
  const { coin, className } = props;

  return (
    <div className={className}>
      <Widget className={css.CoinPriceWidget}>
        <CoinInfo className={css.CoinPriceWidget__coinInfo} coin={coin} />
        <DepositCalculator coin={coin} className={css.CoinPriceWidget__depositCalculator} />
      </Widget>
      <Widget>
        <PoolComissionComparator className={css.PoolComissionWidget}></PoolComissionComparator>
      </Widget>
    </div>
  );
};
