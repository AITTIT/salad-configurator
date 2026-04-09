import {create} from 'zustand';
import type { Ingredient, Bowl } from '../types';

export interface IngredientStore {
  slots: Record<string, Ingredient | null>
  baseType: number;
  selectedBowl: Bowl | null;
  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl | null) => void;
  clearSelection: () => void;
  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: string) => void;
}

export const useIngredientStore = create<IngredientStore>((set, get) => ({
  slots: {},
  baseType: 1,
  selectedBowl: null,
//setter
  setBaseType: (id: number) => {
    set({ baseType: id });
  },
//setter
  setBowl: (bowl: Bowl | null) => {
    set({ selectedBowl: bowl });
  },
//setter
  clearSelection: () =>
    set({ slots: {}, selectedBowl: null }),

  addIngredient: (item: Ingredient) =>
    set((state) => {
      if (item.categoryId === 6) {
        return {
          slots: {
            ...state.slots,
            base: item,
          },
        };
      }

      const slotCount = state.selectedBowl?.slot_count;
      if (!slotCount) return state;

      const emptySlotKey = Array.from(
        { length: slotCount },
        (_, index) => `slot-${index + 1}`
      ).find((key) => !state.slots[key]);

      if (!emptySlotKey) {
        return state;
      }

      return {
        slots: {
          ...state.slots,
          [emptySlotKey]: item,
        },
      };
    }),

  removeIngredient: (id: string) => {
    //empty placeholder
  },
}));
