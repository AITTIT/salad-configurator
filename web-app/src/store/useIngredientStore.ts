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
  removeIngredient: (id: number) => void;
  clearSlot: (slotId: string) => void;
  getSlotKeyByIngredientId: (id: number) => string | undefined;
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

  removeIngredient: (id: number) =>
    set((state) => {
      const newSlots = { ...state.slots };

      const keyToClear = Object.keys(newSlots).find((key) => {
        const item = newSlots[key];
        return item?.id === id;
      });

      if (!keyToClear) return state;

      newSlots[keyToClear] = null;

      return { slots: newSlots };
    }),

     clearSlot: (slotId: string) =>
    set((state) => ({
      slots: { ...state.slots, [slotId]: null },
    })),
  
  getSlotKeyByIngredientId: (id: number) => {
    const { slots } = get();
    return Object.keys(slots).find((key) => slots[key]?.id === id);
  },

}));
