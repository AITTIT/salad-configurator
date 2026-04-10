import { useIngredientStore } from "../store/useIngredientStore";

export default function CenterBowl() {

  const baseType = useIngredientStore((state) => state.baseType);
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);

  const activeIngredients = Object.values(slots).filter(
    (ingredient) => ingredient !== null
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

        <button className="flex gap-3 mb-6 items-center">Icons</button>
      </div>
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative">
        <div className="flex flex-wrap gap-2 p-4 justify-center">
          {activeIngredients.map((item) => (
            <span
              key={item.id}
              className="px-3 py-1 bg-zinc-200 text-zinc-800 rounded-full text-sm font-medium shadow"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      {/*Added margin*/}
      <div className="my-5">100 g / 1.99 € 500ml</div>
    </div>
  );
}

