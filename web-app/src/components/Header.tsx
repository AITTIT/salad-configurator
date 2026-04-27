import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LoginModal from "./LoginModal";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/fresse-logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const { token, userName, logout } = useAuthStore();

  useEffect(() => {
    // Runs on every mousedown anywhere in the document
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener to avoid duplicates
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // Effect recreated when open/closed state changes


  return (
    <div className="relative bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">

      {/* LINK / LOGO */}
      <Link to="/" className="cursor-pointer">
         <img src={logo} alt="Fresse logo" className="h-26 w-auto ml-4" />
      </Link>

      {/* CENTER */}
      <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-3xl font-black tracking-widest mt-6 cursor-pointer">
        BOWL-LASKURI
      </Link>

      {/* RIGHT MENU */}
       <div ref={menuContainerRef} className="relative z-50">
        
        {!isMenuOpen ? (
          <button
            onClick={() => setIsMenuOpen(true)}
            className="cursor-pointer flex flex-col gap-1.5 p-2 mt-8 mr-30 active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {/* Hamburger button */}
            <span className="w-7 h-0.5 bg-white block"></span>
            <span className="w-7 h-0.5 bg-white block"></span>
            <span className="w-7 h-0.5 bg-white block"></span>
          </button>
        ) : (
          <div className="absolute right-0 top-0 bg-[#A2D135] text-black min-w-[280px] rounded-[2.5rem] p-6 flex flex-col gap-4 shadow-md z-50">
            {/* Dropdown menu */}
            
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer self-center flex gap-1.5 pt-2 pb-4 items-center justify-center active:scale-95 transition-transform"
              aria-label="Close menu"
            >
              <span className="w-0.5 h-7 bg-white block rounded-full"></span>
              <span className="w-0.5 h-7 bg-white block rounded-full"></span>
              <span className="w-0.5 h-7 bg-white block rounded-full"></span>
            </button>

            <div className="flex flex-col gap-4 px-4 pb-4">
              
              {/* LOGIN BUTTON (changed from Link → button) */}
              {/* Below ternary code requires Task 5.2, so it hasn't been tested yet. You can remove this comment when 
              Tasks 5.2 and 5.3 have been completed. */}
              {!token ? (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="cursor-pointer text-left hover:font-bold transition-all text-lg"
                >
                  Kirjaudu sisään
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-lg">Hei, {userName}</span>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer text-left hover:font-bold transition-all text-lg"
                  >
                    Kirjaudu ulos
                  </button>
                </div>
              )}

              <Link to="/community" onClick={() => setIsMenuOpen(false)} className="cursor-pointer hover:font-bold transition-all text-lg">
                Tallennetut reseptit
              </Link>

              <Link to="/print" onClick={() => setIsMenuOpen(false)} className="cursor-pointer hover:font-bold transition-all text-lg">
                Ohjeet ja tuki
              </Link>

            </div>
          </div>
        )}
      </div>

      {/* LOGIN MODAL */}
     <LoginModal
      isOpen={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
    />

    </div>
  );
}