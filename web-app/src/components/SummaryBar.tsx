import { Link } from "react-router-dom";
import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";
import { calculateTotalWeight, calculateTotalPrice } from "../utils/calculations";
import { usePriceStore } from "../store/usePriceStore";

export default function SummaryBar() {
  const slots = useIngredientStore((state) => state.slots);
  const removeIngredient = useIngredientStore((state) => state.removeIngredient);
  const prices = usePriceStore((state) => state.prices);

  // Convert slots object into active ingredient array (no nulls)
  const activeIngredients = Object.values(slots).filter(
    (item): item is Ingredient => item !== null
  );

  const totalWeight = calculateTotalWeight(activeIngredients);
  const totalPrice = calculateTotalPrice(activeIngredients, prices);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      {/* left */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Valitut tuotteet</h3>
          <span className="bg-[#A2D135] text-black font-bold px-3 py-1 rounded-full text-sm">
            {activeIngredients.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeIngredients.length === 0 ? (
            <p className="text-gray-300 text-sm">Ei valittuja aineksia.</p>
          ) : (
            activeIngredients.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-zinc-200 text-zinc-900 px-3 py-1 rounded-full text-sm font-medium"
              >
                <span>{item.name}</span>
                <button
                type="button"
                onClick={() => removeIngredient(item.id)}
                aria-label={`Poista ${item.name}`}
                className="w-5 h-5 rounded-full bg-zinc-700 text-white text-xs leading-none flex items-center justify-center hover:bg-zinc-900"
                >
                  x
                </button>
              </div>
            ))
          )
        }
        </div>

        <div className="mt-4">
          <Link className="underline underline-offset-4" to="/print">
            Print
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {/* This seems to always be an integer, so toFixed is not required. */}
          {totalWeight} g
        </div>

        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {/* This rounding to two decimal places avoids floating point inaccuracies. */}
          {totalPrice.toFixed(2)} €
        </div>
      </div>
    </div>
  );
}
