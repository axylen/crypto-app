import { makeAutoObservable } from 'mobx';
import { BASE_SABLECOIN } from 'app-constants';
import { PriceServiceListeners, PriceServiceValues } from './PriceService.types';

const getFullName = (coin: string) => (coin + BASE_SABLECOIN).toLowerCase();

const generateWebsocketUrl = (coin: string) => {
  const name = getFullName(coin);
  return `wss://stream.binance.com:9443/ws/${name}@trade`;
};

export class PriceServiceImpl {
  listeners: Record<string, PriceServiceListeners> = {};
  values: PriceServiceValues = {};
  prevPrice: PriceServiceValues = {};

  constructor() {
    makeAutoObservable(this);
  }

  subscribe = (coin: string) => {
    if (this.listeners[coin]) {
      this.listeners[coin].subscribers++;
      return;
    }

    const ws = new WebSocket(generateWebsocketUrl(coin));
    ws.onmessage = this.setPrice;

    this.listeners[coin] = {
      ws,
      subscribers: 1,
    };
  };

  unsubscribe = (coin: string) => {
    if (!this.listeners[coin]) return;

    if (--this.listeners[coin].subscribers) {
      this.listeners[coin].ws.close();
      delete this.listeners[coin];
    }
  };

  getPrice = (coin: string) => {
    return this.values[getFullName(coin)] || 0;
  };

  getPrevPrice = (coin: string) => {
    return this.prevPrice[getFullName(coin)];
  };

  private setPrice = (evt: any) => {
    const data = JSON.parse(evt.data);
    const coin = data.s.toLowerCase();
    const price = parseFloat(data.p);

    this.prevPrice[coin] = this.values[coin] || price;
    this.values[coin] = price;
  };
}
