import { useState } from "react";
import { useIngredientStore } from "../store/useIngredientStore";
import SaveRecipeModal from "./SaveRecipeModal";
import type { Ingredient } from "../types";
export default function CenterBowl() {

  const baseType = useIngredientStore((state) => state.baseType);
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const clearSelection = useIngredientStore((state) => state.clearSelection);

  const activeSlotIngredients = Object.entries(slots).filter(
    (
      entry
    ): entry is [string, Ingredient] => entry[1] !== null
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
      <div className="flex-1 flex flex-row gap-5">
        {/* Salaatti button */}
        <button
          onClick={() => setBaseType(1)}
          className={`flex gap-3 mb-6 items-center px-4 py-2 rounded-full font-bold transition-colors ${
            baseType === 1
              ? "bg-[#A2D135] text-black"
              : "bg-zinc-700 text-white hover:bg-zinc-600"
          }`}
        >
          Salaatti
        </button>
        {/* Rahka button */}
         <button
          onClick={() => setBaseType(2)}
          className={`flex gap-3 mb-6 items-center px-4 py-2 rounded-full font-bold transition-colors ${
            baseType === 2
              ? "bg-[#A2D135] text-black"
              : "bg-zinc-700 text-white hover:bg-zinc-600"
          }`}
        >
          Rahka
        </button>

        <div className="flex gap-3 mb-6 items-center">
          <button
            onClick={() => {
              if (window.confirm('Haluatko tyhjätä rasian?')) {
                /* clearSelection() also removes the bowl selection */
                clearSelection();
              }
            }}
          >
            🗑️
            </button>
          <button
            onClick={() => alert('Feature coming soon!')}
          >
            ↩️
          </button>
          <button
            onClick={() => setIsSaveOpen(true)}
          >
            💾
          </button>
          <SaveRecipeModal isOpen={isSaveOpen} onClose={() => setIsSaveOpen(false)} />
        </div>
      </div>
      <div className="w-80 h-80 bg-transparent flex items-center justify-center shadow-inner relative">
        {selectedBowl?.image_url && (
          <img 
          src={selectedBowl.image_url} 
          alt={selectedBowl.name ?? "bowl"}
          className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none"
          aria-hidden="true"
          />
        )}

        {selectedBowl?.slot_count && (
          <img
            src={
              selectedBowl.slot_count === 6
                ? "https://www.cc.puv.fi/~asa/fresh/images/jakaja_6_lohkoa.png"
                : "https://www.cc.puv.fi/~asa/fresh/images/jakaja_4_lohkoa.png"
            }
            alt={`${selectedBowl.slot_count}-slot divider`}
            className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
            aria-hidden="true"
          />
        )}

        <div className="relative z-20 flex flex-wrap gap-2 p-4 justify-center">
          {activeSlotIngredients.map(([slotKey, item]) => (
            <span
              key={slotKey}
              className="px-3 py-1 bg-zinc-200 text-zinc-800 rounded-full text-sm font-medium shadow"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      {/*Added margin*/}
      <div className="my-5">100 g / 1.99 € { selectedBowl ? selectedBowl.volume : 0} ml</div>
    </div>
  );
}

