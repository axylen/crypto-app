import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { CoinPriceService } from 'services/CoinPriceService';

type Props = {
  coin: string;
  className?: string;
};

export const Price: React.FC<Props> = observer((props) => {
  const { coin, className } = props;

  const coinPriceService = useMemo(() => new CoinPriceService(coin), [coin]);

  useEffect(() => {
    return () => {
      coinPriceService?.destroy();
    };
  }, [coin]);

  return <span className={className}>{coinPriceService.price.toFixed(4)}</span>;
});
