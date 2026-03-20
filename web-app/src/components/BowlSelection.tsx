export default function BowlSelection() {
    return (
        
        <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full
         lg:w-1/4 flex flex-col items-center shadow-lg gap-5">
        {/*Added gap-5*/}
            <span className="bg-white text-black font-bold rounded-full
            w-8 h-8 flex items-center justify-center mb-4 shrink-0">1</span>
            <div className="h-12 border-2 border-gray-600 rounded-x1 flex
            items-center px-4">Test row</div>
            <div className="h-12 border-2 border-gray-600 rounded-x1 flex
            items-center px-4">Test row</div>
            <div className="h-12 border-2 border-gray-600 rounded-x1 flex
            items-center px-4">Test row</div>
        </div>
    );
}