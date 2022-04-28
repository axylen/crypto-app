import { createContext } from 'react';
import { CoingeckoServiceImpl } from './CoingeckoService';

export const CoingeckoServiceInstance = new CoingeckoServiceImpl();
export const CoingeckoService = createContext(CoingeckoServiceInstance);
