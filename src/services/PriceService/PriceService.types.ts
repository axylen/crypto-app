export interface PriceServiceListeners {
  ws: WebSocket;
  subscribers: number;
}

export type PriceServiceValues = Record<string, number | undefined>;
