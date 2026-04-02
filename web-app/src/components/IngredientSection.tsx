import { useEffect, useState } from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";

interface IngredientSectionProps {
  ingredients?: Ingredient[];
  categories?: Category[];
}

export default function IngredientSection({ categories, ingredients }: IngredientSectionProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);

  // Hide base category tab (id 6)
  const categoryTabs = categories?.filter((category) => category.id !== 6);

  useEffect(() => {
    if (selectedCategoryId == null && categoryTabs && categoryTabs.length > 0) {
      setSelectedCategoryId(categoryTabs[0].id);
    }
  }, [categoryTabs, selectedCategoryId]);
  
  useEffect(() => {
    const nonBaseIngredients =
      ingredients?.filter((ingredient) => ingredient.categoryId !== 6) ?? [];

    setFilteredIngredients(nonBaseIngredients.filter(
      (ingredient) => ingredient.categoryId === selectedCategoryId)
    );

  }, [ingredients, selectedCategoryId])

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-4 mx-auto font-bold">
        3.
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 focus:border-[#A2D135] bg-gray-200"
        />

        {categoryTabs?.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`px-6 py-2 rounded-full font-bold ${selectedCategoryId === category.id
                ? "bg-[#A2D135] text-black opacity-60"
                : "bg-[#A2D135] text-white"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 m-3">
        {filteredIngredients?.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>

    </div>
  );
}