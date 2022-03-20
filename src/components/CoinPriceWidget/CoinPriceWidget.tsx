import React from "react";
import { Widget } from "components/Widget";
import { CoinInfo } from "components/CoinInfo";
import { DepositCalculator } from "components/DepositCalculator";
import css from "./CoinPriceWidget.module.css";
import { cx } from "utils";

type Props = {
  coin: string;
  className?: string;
};

export const CoinPriceWidget: React.FC<Props> = (props) => {
  const { coin, className } = props;

  return (
    <Widget className={cx(className, css.CoinPriceWidget)}>
      <CoinInfo className={css.CoinPriceWidget__coinInfo} coin={coin} />
      <DepositCalculator coin={coin} className={css.CoinPriceWidget__depositCalculator} />
    </Widget>
  );
};
