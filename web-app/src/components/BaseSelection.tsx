import type { Ingredient } from '../types';

interface BaseSelectionProps {
  ingredients?: Ingredient[];
}

export default function BaseSelection({ ingredients }: BaseSelectionProps) {

  //filtteri id === 6, base-category
  const bases = ingredients?.filter((ingredient) => ingredient.categoryId === 6);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-4">
        2.
      </div>

      {bases?.map((base) => (
        <div
          key={base.id}
          className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center w-full mt-3"
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