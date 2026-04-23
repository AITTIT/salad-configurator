import type { Ingredient, PriceListItem } from "../types";

export function calculateTotalWeight(ingredients: Ingredient[]): number {
  return ingredients.reduce(
    (sum, item) => sum + item.weight_grams,
    0
  );
}

export function calculateTotalPrice(
  ingredients: Ingredient[],
  prices: PriceListItem[]
): number {
  return ingredients.reduce((sum, ingredient) => {
    const priceEntry = prices.find(
      (p) => p.item_id === ingredient.id
    );
    return sum + (priceEntry ? priceEntry.price : 0);
  }, 0);
}