/*
Left logo has been created as <p>. The instructions (Task 1.5) instructed to use Link 
component, but it won't be added until week 2. Replace logo (<p>) with Link component later.
*/
import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
            
            {/* LINK / LOGO */}
            <Link to="/" className="text-white">
                Fresh Food Factory - FRESSE
            </Link>

            {/* CENTER */}
            <Link to="/" className="text-3xl font-black tracking-widest mt-6">
                 BOWL-LASKURI
            </Link>

            {/* RIGHT MENU */}
            <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md"></div>
        </div>
    );
}