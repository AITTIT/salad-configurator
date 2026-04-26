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
  const primaryDiet = ingredient.diets?.[0] ?? null;
  const dietBadge = primaryDiet ? primaryDiet.trim().charAt(0).toUpperCase() : null;

  const priceLabel = ingredientPrice 
    ? `+ ${ingredientPrice.price.toFixed(2)} €`
    : "Hinta ei saatavilla";

  return (
    <div
      onClick={() => addIngredient(ingredient)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") addIngredient(ingredient);
      }}
      className="w-56 min-h-[72px] overflow-hidden rounded-2xl bg-white text-black shadow-md transition-transform hover:scale-[1.01] cursor-pointer"
    >
      <div className="flex h-full items-stretch">
        <div className="relative h-[72px] w-[72px] shrink-0">
          {ingredient.image_url ? (
            <img
              src={ingredient.image_url}
              alt={ingredient.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="h-full w-full bg-zinc-200"
            />
          )}

          {dietBadge && (
            <span className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#A2D135] text-[11px] font-bold text-black shadow">
              {dietBadge}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
          <h3
            className="text-sm font-semibold leading-tight"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {ingredient.name}
          </h3>
          {isLoggedIn ? (
            <span className="mt-1 text-xs font-semibold text-zinc-700">{priceLabel}</span>
          ) : (
            <span className="mt-1 text-xs text-zinc-700">- €</span>
          )}
        </div>
      </div>
    </div>
  );
}