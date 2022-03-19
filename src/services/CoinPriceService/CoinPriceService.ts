import { makeAutoObservable, computed } from 'mobx';
import { PriceServiceInstance } from 'services/PriceService';

export class CoinPriceService {
  name: string;

  constructor(name: string) {
    this.name = name;
    makeAutoObservable(this, { price: computed, prevPrice: computed });
    PriceServiceInstance.subscribe(name);
  }

  get price() {
    return PriceServiceInstance.getPrice(this.name);
  }

  get prevPrice() {
    return PriceServiceInstance.getPrevPrice(this.name);
  }

  destroy = () => {
    PriceServiceInstance.unsubscribe(this.name);
  };
}
