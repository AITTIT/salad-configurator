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
  const clearSlot = useIngredientStore((state) => state.clearSlot);
  const selectedBase = slots.base ?? null;

  const slotCount = selectedBowl?.slot_count ?? 0;

  const activeSlotIngredients = Object.entries(slots)
    .filter(
      ([slotKey, ingredient]) =>
        slotKey.startsWith("slot-") && ingredient !== null
    )
    .sort(
      ([slotKeyA], [slotKeyB]) =>
        Number(slotKeyA.split("-")[1]) - Number(slotKeyB.split("-")[1])
    ) as [string, Ingredient][];

  const getSlotRotation = (slotKey: string) => {
    if (!slotCount) return 0;

    const slotNumber = Number(slotKey.split("-")[1]);
    if (!Number.isFinite(slotNumber) || slotNumber < 1) return 0;

    const step = 360 / slotCount;

    // 4-slot bowl dividers sit on cardinal axes (0/90/180/270),
    // so wedges must be centered between them.
    if (slotCount === 4) {
      return (slotNumber - 1) * step + step / 2;
    }

    return (slotNumber - 1) * step;
  };

  const getSlotRadius = () => {
    if (slotCount === 6) return "40%";
    if (slotCount === 4) return "46%";

    return "42%";
  };

  const getSlotScale = () => {
    if (slotCount === 6) return 0.69;
    if (slotCount === 4) return 0.90;

    return 0.73;
  };

  const getSlotBoxSize = () => {
    if (slotCount === 6) return "68%";
    if (slotCount === 4) return "74%";

    return "70%";
  };

  const getBaseClipPath = () => {
    if (!selectedBowl) return "none";

    if (selectedBowl.shape === "round") {
      // Push the center a bit down to better match the visible bowl cavity.
      return "circle(46% at 50% 50%)";
    }

    // Square bowls have rounded corners in practice.
    return "inset(8% 8% 8% 8% round 15%)";
  };

  const baseImageSrc = selectedBase?.image_url ?? null;

  return (
    <div className="flex-1 flex flex-col items-center justify-start min-h-[400px] mt-0 lg:mt-0">
      <div className="flex flex-row items-start gap-5">
        {/* Salaatti button */}
        <button
          onClick={() => setBaseType(1)}
          disabled={selectedBowl !== null}
          className={`inline-flex w-fit shrink-0 whitespace-nowrap mb-6 items-center px-4 py-3 rounded-full font-bold leading-none transition-colors ${
            baseType === 1
              ? "bg-[#A2D135] text-black"
              : "bg-zinc-700 text-white hover:bg-zinc-600"
              } ${!!selectedBowl && baseType !== 1 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          Salaatti
        </button>
        {/* Rahka button */}
         <button
          onClick={() => setBaseType(2)}
          disabled={!!selectedBowl}
          className={`inline-flex w-fit shrink-0 whitespace-nowrap mb-6 items-center px-4 py-3 rounded-full font-bold leading-none transition-colors ${
            baseType === 2
              ? "bg-[#A2D135] text-black"
              : "bg-zinc-700 text-white hover:bg-zinc-600"
              } ${!!selectedBowl && baseType !== 2 ? "opacity-40 cursor-not-allowed" : ""
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

        {baseImageSrc && selectedBowl && (
          <div
            className="absolute inset-0 z-[15] overflow-hidden pointer-events-none"
            style={{ clipPath: getBaseClipPath() }}
            aria-hidden="true"
          >
            <img
              src={baseImageSrc}
              alt={selectedBase?.name ?? "base salad"}
              className="h-full w-full object-cover"
            />
          </div>
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

        <div className="absolute inset-0 z-30 pointer-events-none">
          {activeSlotIngredients.map(([slotKey, item]) => (
            <div
              key={slotKey}
              className="absolute left-1/2 top-1/2"
              style={{
                width: getSlotBoxSize(),
                height: getSlotBoxSize(),
                transform: `translate(-50%, -50%) rotate(${getSlotRotation(slotKey)}deg) translateY(-${getSlotRadius()}) scale(${getSlotScale()})`,
                transformOrigin: "center center",
              }}
            >
              {item.wedge_image_url ? (
                <img
                  src={item.wedge_image_url}
                  alt={item.name}
                  className="absolute inset-0 z-30 h-full w-full object-contain"
                  aria-hidden="true"
                />
              ) : null}

              <button
                type="button"
                onClick={() => clearSlot(slotKey)}
                aria-label={`Poista ${item.name}`}
                className="pointer-events-auto absolute left-1/2 top-4 z-40 -translate-x-1/2 rounded-full bg-zinc-900/90 px-2 py-1 text-xs font-bold text-white shadow hover:bg-zinc-700"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      {/*Added margin*/}
      <div className="my-5">100 g / 1.99 € { selectedBowl ? selectedBowl.volume : 0} ml</div>
    </div>
  );
}

