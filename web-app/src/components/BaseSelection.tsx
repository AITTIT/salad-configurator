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
    <div className="selection-panel side-panel">

      <div className="selection-panel-number mb-4">
        2.
      </div>

      <div className='font-bold'>
        Valitse salaattipohja
      </div>

      {bases?.map((base) => (
        <button
          key={base.id}
          onClick={() => addIngredient(base)}
          className={`w-full h-16 rounded-xl flex items-center justify-between px-4 mt-3 cursor-pointer transition-colors ${
            selectedBase?.id === base.id
              ? "border-[#A2D135] bg-[#A2D135] text-black font-bold"
              : "border-gray-600 hover:bg-gray-700"
          }`}
        >
          <span>{base.name}</span>
          {base.image_url ? (
            <img
              src={base.image_url}
              alt={base.name}
              className="h-14 w-14 m-1 rounded-full object-cover border border-white/40"
            />
          ) : (
            <div
              aria-hidden="true"
              className="h-14 w-14 rounded-full border border-white/30 bg-white/10"
            />
          )}
        </button>
      ))}

      {/* Loading text if no bases yet received. */}
      {(!bases || bases.length === 0) && (
        <div className="text-gray-400 text-sm mt-4">Ladataan pohjia...</div>
      )}

    </div>
  );
}