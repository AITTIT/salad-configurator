import { expect, test } from 'vitest';
import { calculateTotalWeight } from './calculations';

// File src\types\index.ts determines which fields are required for Ingredient type. Only weight_grams is used in below test.
test('calculates correct total weight for items', () => {
  const mockIngredients = [
    {
      id: 1,
      name: "Item 1",
      weight_grams: 50,
      categoryId: 1,
      diets: [],
      base_type_id: 1
    },
    {
      id: 2,
      name: "Item 2",
      weight_grams: 100,
      categoryId: 1,
      diets: [],
      base_type_id: 1
    }
  ];

  const result = calculateTotalWeight(mockIngredients);

  expect(result).toBe(150);
});