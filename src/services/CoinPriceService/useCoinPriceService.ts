import { useMemo, useEffect } from 'react';
import { CoinPriceService } from './CoinPriceService';

export const useCoinPriceService = (coin: string) => {
  const coinPriceService = useMemo(() => new CoinPriceService(coin), [coin]);

  useEffect(() => () => coinPriceService.destroy(), [coinPriceService]);

  return coinPriceService;
};
