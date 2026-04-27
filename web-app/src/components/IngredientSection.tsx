import { useEffect, useState } from "react";
import type { Category, Ingredient } from "../types";
import IngredientCard from "./IngredientCard";
import { useAuthStore } from "../store/useAuthStore";

interface IngredientSectionProps {
  ingredients?: Ingredient[];
  categories?: Category[];
}

export default function IngredientSection({ categories, ingredients }: IngredientSectionProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = Boolean(token);
  const isSearching = searchQuery.trim().length > 0;

  // Hide base category tab (id 6)
  const categoryTabs = categories?.filter((category) => category.id !== 6);

  useEffect(() => {
    if (selectedCategoryId == null && categoryTabs && categoryTabs.length > 0) {
      setSelectedCategoryId(categoryTabs[0].id);
    }
  }, [categoryTabs, selectedCategoryId]);

  useEffect(() => {
    // a lookup of category IDs that are allowed for current baseType.
    const allowedCategoryIds = new Set((categories ?? []).map((category) => category.id));

    // only keep ingredients that belong to allowed categories, and exclude base 6 category.
    const allowedIngredients = (ingredients ?? []).filter(
      (ingredient) =>
        ingredient.categoryId !== 6 && allowedCategoryIds.has(ingredient.categoryId)
    );

    // Normalize search input for case-insensitive matching and trim extra spaces.
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const hasSearchText = normalizedQuery.length > 0;

    const nextFiltered = allowedIngredients.filter((ingredient) => {
      if (hasSearchText) {
        // Search takes priority
        // search across all categories limited by basetype
        return ingredient.name.toLowerCase().includes(normalizedQuery);
      }

      // No search text:
      // show only items from selected tab/category.
      return ingredient.categoryId === selectedCategoryId;
    });

    setFilteredIngredients(nextFiltered);
  }, [ingredients, categories, selectedCategoryId, searchQuery])
  //j

  const getCategoryButtonClassName = (categoryId: number) => {
    const isCategorySelected = !isSearching && selectedCategoryId === categoryId;

    return `px-6 py-2 rounded-full font-bold ${isCategorySelected
      ? "bg-[#A2D135] text-black opacity-55"
      : "bg-[#A2D135] text-black"
      }`;
  };

  return (
<<<<<<< HEAD
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg flex flex-col items-center relative">
=======
   <div className="selection-panel p-8 relative">
>>>>>>> 68ecade (WIP: local changes)

      {!isLoggedIn && (
        <p className="absolute top-9 left-9 text-base text-white">
          Kirjaudu nähdäksesi hinnat
        </p>
      )}

      <div className="flex items-center gap-3 mb-4">
<<<<<<< HEAD
        <div className="w-10 h-10 shrink-0 rounded-full bg-white text-black flex items-center justify-center font-bold leading-none">
          3.
=======
        <div className="selection-panel-number shrink-0 leading-none">
            3.
>>>>>>> 68ecade (WIP: local changes)
        </div>
        <div className="font-bold">
          Lisää raaka-aineet
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          className="ingredient-search-bar"
          placeholder="Etsi tuotteita"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {categoryTabs?.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={getCategoryButtonClassName(category.id)}
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

      <div className="mt-6 w-full flex justify-center gap-6 text-sm text-gray-300">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#A2D135] text-xs font-bold text-black">G</span>
          Gluteeniton
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#A2D135] text-xs font-bold text-black">L</span>
          Laktoositon
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#A2D135] text-xs font-bold text-black">V</span>
          Vegaaninen
        </span>
      </div>

    </div>
  );
}