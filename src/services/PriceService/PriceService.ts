import { makeAutoObservable } from 'mobx';

const getFullName = (coin: string, coin2 = 'usdt') => (coin + coin2).toLowerCase();

const generateWebsocketUrl = (coin: string, coin2?: string) => {
  const name = getFullName(coin, coin2);
  return `wss://stream.binance.com:9443/ws/${name}@trade`;
};

export class PriceServiceImpl {
  listeners: any = {};
  values: any = {};
  prevPrice: any = {};

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
      this.listeners[coin] = undefined;
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
