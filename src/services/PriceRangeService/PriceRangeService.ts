import { makeAutoObservable } from 'mobx';

const getLocalStorageData = () => {
  const storageData = localStorage.getItem('cryptoPriceRange');
  return storageData ? JSON.parse(storageData) : {};
};

export class PriceRangeServiceImpl {
  values: Record<string, any> = getLocalStorageData();

  constructor() {
    makeAutoObservable(this);
  }

  getMinPrice = (coin: string) => {
    return this.values[coin]?.min;
  };
  getMaxPrice = (coin: string) => {
    return this.values[coin]?.max;
  };

  setMinPrice = (coin: string, value: string) => {
    if (!this.values[coin]) this.values[coin] = {};
    this.values[coin].min = value;

    localStorage.setItem('cryptoPriceRange', JSON.stringify(this.values));
  };
  setMaxPrice = (coin: string, value: string) => {
    if (!this.values[coin]) this.values[coin] = {};
    this.values[coin].max = value;

    localStorage.setItem('cryptoPriceRange', JSON.stringify(this.values));
  };
}
