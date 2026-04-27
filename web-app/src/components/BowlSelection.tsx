import type { Bowl } from '../types';
import { useIngredientStore } from '../store/useIngredientStore';

interface BowlSelectionProps {
  // "bowls?" means the prop is optional.
  bowls?: Bowl[];
}


export default function BowlSelection({ bowls }: BowlSelectionProps) {

  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const setBowl = useIngredientStore((state) => state.setBowl);

  return (
    <div className="selection-panel side-panel gap-5">
      <div className="selection-panel-number">
        1.
      </div>

      <div className="font-bold">Valitse rasia</div>

      {/* Go through bowls array with .map() function */}
      {bowls?.map((bowl) => (
        <button
          key={bowl.id}
          onClick={() => setBowl(bowl)}
          className={`w-full h-16 rounded-xl flex items-center justify-start gap-3 px-4 transition-colors ${
            selectedBowl?.id === bowl.id
              ? "border-[#A2D135] bg-[#A2D135] text-black font-bold"
              : "border-gray-600 hover:bg-gray-700"
          }`}
        >
          {bowl.image_url ? (
            <span
              className={`h-14 w-14 shrink-0 overflow-hidden ${
                bowl.shape === "round"
                  ? "rounded-full border border-white/40"
                  : "rounded-xl border-0"
              }`}
            >
              <img
                src={bowl.image_url}
                alt={bowl.name}
                className="h-full w-full object-contain"
              />
            </span>
          ) : (
            <div
              aria-hidden="true"
              className={`h-14 w-14 bg-white/10 ${
                bowl.shape === "round"
                  ? "rounded-full border border-white/30"
                  : "rounded-xl border-0"
              }`}
            />
          )}
          {/* Name comes from BaseType, which is inherited to Bowl type */}
          <span>{bowl.name}</span>
        </button>
      ))}

      {bowls?.length === 0 && (
        <div className="text-gray-400 text-sm">Ladataan kulhoja...</div>
      )}
    </div>
  );
}