export default function IngredientSection() {
    return (
        <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg flex gap-5">
            <input type="text" className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 bordr-transparent focus:border-[#A2D135]" />
            <span className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">Tuoreet salaatit</span>
            <span className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">Hedelmät</span>
            <span className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full">Proteiinit</span>
        </div>
    );
}