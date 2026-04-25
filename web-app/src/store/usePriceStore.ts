import { create } from 'zustand';
import type { PriceListItem } from '../types';
import { getPrices } from '../services/api';

interface PriceStore {
  prices: PriceListItem[];
  fetchPrices: (token: string) => Promise<void>;
}

export const usePriceStore = create<PriceStore>((set) => ({
  prices: [],

  fetchPrices: async (token: string) => {
    try {
      const data = await getPrices(token);
      console.log("Fetched prices:", data);
      set({ prices: data });
    } catch (error) {
      console.error("Failed to fetch prices:", error);
    }
  },
}));
