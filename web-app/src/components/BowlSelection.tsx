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
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg gap-5">
      <span className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        1.
      </span>

      {/* Go through bowls array with .map() function */}
      {bowls?.map((bowl) => (
        <button
          key={bowl.id}
          onClick={() => setBowl(bowl)}
          className={`w-full h-12 border-2 rounded-xl flex items-center justify-center px-4 transition-colors ${
            selectedBowl?.id === bowl.id
              ? "border-[#A2D135] bg-[#A2D135] text-black font-bold"
              : "border-gray-600 hover:bg-gray-700"
          }`}
        >
          {/* Name comes from BaseType, which is inherited to Bowl type */}
          {bowl.name}
        </button>
      ))}

      {bowls?.length === 0 && (
        <div className="text-gray-400 text-sm">Ladataan kulhoja...</div>
      )}
    </div>
  );
}