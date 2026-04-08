import type { Ingredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  const addIngredient = useIngredientStore((state) => state.addIngredient);

  return (
    <div
    //currently has an empty placeholder body  so clicking won't do anything
    onClick={() => addIngredient(ingredient)}
    className="w-40 h-40 p-4 border rounded-lg shadow-md flex flex-col justify-between bg-white">
      <h3 className="text-lg font-semibold text-center text-black">{ingredient.name}</h3>

      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        <h3 className="text-lg font-semibold text-center text-black">{ingredient.diets}</h3>
      </div>
    </div>
  );
}