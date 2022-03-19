import { createContext } from 'react';
import { PriceServiceImpl } from './PriceService';

export * from './PriceService';
export const PriceServiceInstance = new PriceServiceImpl();
export const PriceService = createContext(PriceServiceInstance);
