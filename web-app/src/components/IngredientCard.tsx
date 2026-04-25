import type { Ingredient } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";
import { usePriceStore } from "../store/usePriceStore";
import { useAuthStore } from "../store/useAuthStore";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  const addIngredient = useIngredientStore((state) => state.addIngredient);
  const ingredientPrices = usePriceStore((state) => state.prices);
  const authToken = useAuthStore((state) => state.token);

  const isLoggedIn = Boolean(authToken);
  const ingredientPrice = ingredientPrices?.find(
    (priceItem) => ingredient.id === priceItem.item_id
  );

  const priceLabel = ingredientPrice 
    ? `+ ${ingredientPrice.price.toFixed(2)} €`
    : "Hinta ei saatavilla";

  return (
    <div
    onClick={() => addIngredient(ingredient)}
    className="w-40 h-40 p-4 border rounded-lg shadow-md flex flex-col justify-between bg-white">
      <h3 className="text-lg font-semibold text-center text-black">{ingredient.name}</h3>
      {isLoggedIn ? (
        <span className="text-lg text-black text-center font-semibold">{priceLabel}</span>
      ) : (
        <span className="text-lg text-black text-center">- €</span>
      )}
      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {ingredient.diets?.map((diet) => (
          <span key={diet} className="text-sm bg-gray-500 rounded px-2 py-1">
            {diet}
          </span>
        ))}
      </div>
    </div>
  );
}