import type { Ingredient } from '../types';
import { useIngredientStore } from "../store/useIngredientStore"

interface BaseSelectionProps {
  ingredients?: Ingredient[];
}

export default function BaseSelection({ ingredients }: BaseSelectionProps) {

  //filtteri id === 6, base-category
  const bases = ingredients;

  const slots = useIngredientStore((state) => state.slots);
  const addIngredient = useIngredientStore((state) => state.addIngredient);

  const selectedBase = slots["base"] ?? null;

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-4">
        2.
      </div>

      {bases?.map((base) => (
        <div
          key={base.id}
          role="button"
          tabIndex={0}
          onClick={() => addIngredient(base)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") addIngredient(base);
          }}
          className={`w-full h-12 border-2 rounded-xl flex items-center justify-between px-4 mt-3 cursor-pointer transition-colors ${
            selectedBase?.id === base.id
              ? "border-[#A2D135] bg-[#A2D135] text-black font-bold"
              : "border-gray-600 hover:bg-gray-700"
          }`}
        >
          {base.name}
        </div>
      ))}

      {/* Loading text if no bases yet received. */}
      {(!bases || bases.length === 0) && (
        <div className="text-gray-400 text-sm mt-4">Ladataan pohjia...</div>
      )}

    </div>
  );
}