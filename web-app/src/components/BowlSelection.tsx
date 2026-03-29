import type { Bowl } from '../types';

interface BowlSelectionProps {
    bowls?: Bowl[]; 
}

export default function BowlSelection({ bowls }: BowlSelectionProps) {
  return (
        <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg gap-5">
            <span className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
                1
            </span>

            {/* Käydään bowls-taulukko läpi .map()-funktiolla */}
            {bowls?.map((bowl) => (
                <button
                    key={bowl.id} 
                    className="w-full h-12 border-2 border-gray-600 rounded-xl flex items-center justify-center px-4 hover:bg-gray-700 transition-colors"
                >
                    {/* Nimi tulee BaseType:stä, joka periytyy Bowl-tyyppiin */}
                    {bowl.name} 
                    
                    
                   
                </button>
            ))}

            {bowls?.length === 0 && (
                <div className="text-gray-400 text-sm">Ladataan kulhoja...</div>
            )}
        </div>
    );
}