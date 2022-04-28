import { makeAutoObservable } from 'mobx';
import { CoingeckoCoin, Coin } from './CoingeckoService.types';

// docs https://www.coingecko.com/en/api/documentation#
const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export class CoingeckoServiceImpl {
  constructor() {
    makeAutoObservable(this);
  }

  PER_PAGE = 100;
  coinList: Coin[] = [];
  includedCoins: string[] = [];

  isCoinIncluded(id: string) {
    return this.includedCoins.includes(id);
  }

  async fetchMarkets() {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.PER_PAGE}&page=1&sparkline=false`,
    );
    const data: CoingeckoCoin[] = await response.json();

    this.coinList = data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      imageUrl: coin.image,
    }));
  }

  toggleCoinInclusion(coinId: string) {
    if (this.isCoinIncluded(coinId)) {
      this.includedCoins = this.includedCoins.filter((id) => id !== coinId);
    } else {
      this.includedCoins.push(coinId);
    }
  }

  getCombinedIncludedMarketCap() {
    return this.includedCoins.reduce((acc, id) => acc + (this.getCoinById(id)?.marketCap || 0), 0);
  }

  getCoinById(id: string) {
    return this.coinList.find((coin) => coin.id === id);
  }

  getCapPercentage(cap: number, combinedCap: number) {
    if (!cap || !combinedCap) return 0;

    return (cap / combinedCap) * 100;
  }

  getCoinListViewModel() {
    return this.coinList.map((coin) => {
      const isInclueded = this.isCoinIncluded(coin.id);

      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.price,
        marketCap: coin.marketCap,
        imageUrl: coin.imageUrl,
        capPercentage: isInclueded
          ? this.getCapPercentage(coin.marketCap, this.getCombinedIncludedMarketCap())
          : 0,
        isInclueded,
      };
    });
  }

  getCoinListIncluded() {
    return this.coinList.filter((coin) => this.isCoinIncluded(coin.id));
  }

  getCoinListIncludedAsCsv() {
    return this.getCoinListIncluded()
      .map(
        (coin) =>
          `${coin.symbol}	${String(coin.price).replace('.', ',')}	${
            coin.marketCap
          }	${this.getCapPercentage(coin.marketCap, this.getCombinedIncludedMarketCap())
            .toFixed(2)
            .replace('.', ',')}`,
      )
      .join('\n');
  }
}
