import { createContext } from 'react';
import { PriceRangeServiceImpl } from './PriceRangeService';

export const PriceRangeServiceInstance = new PriceRangeServiceImpl();
export const PriceRangeService = createContext(PriceRangeServiceInstance);
