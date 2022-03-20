import { makeAutoObservable, computed } from 'mobx';
import { PriceRangeServiceInstance } from 'services/PriceRangeService';
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

  get minRangeValue() {
    return PriceRangeServiceInstance.getMinPrice(this.name) || '';
  }

  set maxRangeValue(value: string) {
    this.setMaxRangeValue(value);
  }
  setMaxRangeValue = (value: string) => PriceRangeServiceInstance.setMaxPrice(this.name, value);

  get maxRangeValue() {
    return PriceRangeServiceInstance.getMaxPrice(this.name) || '';
  }

  set minRangeValue(value: string) {
    this.setMinRangeValue(value);
  }
  setMinRangeValue = (value: string) => PriceRangeServiceInstance.setMinPrice(this.name, value);

  destroy = () => {
    PriceServiceInstance.unsubscribe(this.name);
  };
}
