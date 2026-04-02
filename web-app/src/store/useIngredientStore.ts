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

  addIngredient: (item: Ingredient) => {
    //empty placeholder
  },

  removeIngredient: (id: string) => {
    //empty placeholder
  },
}));
