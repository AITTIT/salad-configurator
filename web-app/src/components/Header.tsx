import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">

      {/* LINK / LOGO */}
      {/* Fresse logo can be found from https://salaattimestari.fi/ . Download it and add it to the upper left corner. */}
      <Link to="/" className="text-white">
        Fresh Food Factory - FRESSE
      </Link>

      {/* CENTER */}
      <Link to="/" className="text-3xl font-black tracking-widest mt-6">
        BOWL-LASKURI
      </Link>

      {/* RIGHT MENU */}
      <div className="relative">
        {/* Hamburger button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-2 mt-8"
          aria-label="Toggle menu"
        >
          <span className="w-7 h-0.5 bg-white block"></span>
          <span className="w-7 h-0.5 bg-white block"></span>
          <span className="w-7 h-0.5 bg-white block"></span>
        </button>

        {/* Dropdown menu - only renders when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="absolute right-0 bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md z-50">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:font-bold transition-all">
              Kirjaudu sisään
            </Link>
            <Link to="/community" onClick={() => setIsMenuOpen(false)} className="hover:font-bold transition-all">
              Tallennetut reseptit
            </Link>
            <Link to="/print" onClick={() => setIsMenuOpen(false)} className="hover:font-bold transition-all">
              ohjeet ja tuki
            </Link>
          </div>
        )}
      </div>



    </div>
  );
}