import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LoginModal from "./LoginModal";
import { useAuthStore } from "../store/useAuthStore";
import logo from  "../assets/fresse-logo.png";

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
    <div className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">

      {/* LINK / LOGO */}
      <Link to="/">
         <img src={logo} alt="Fresse logo" className="h-26 w-auto ml-4" />
      </Link>

      {/* CENTER */}
      <Link to="/" className="text-3xl font-black tracking-widest mt-6">
        BOWL-LASKURI
      </Link>

      {/* RIGHT MENU */}
       <div ref={menuContainerRef} className="relative">
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

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="absolute right-0 bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md z-50">
            
            {/* LOGIN BUTTON (changed from Link → button) */}
            {/* Below ternary code requires Task 5.2, so it hasn't been tested yet. You can remove this comment when 
            Tasks 5.2 and 5.3 have been completed. */}
            {!token ? (
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
                className="text-left hover:font-bold transition-all"
              >
                Kirjaudu sisään
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="font-bold">Hei, {userName}</span>

                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left hover:font-bold transition-all"
                >
                  Kirjaudu ulos
                </button>
              </div>
            )}

            <Link to="/community" onClick={() => setIsMenuOpen(false)} className="hover:font-bold transition-all">
              Tallennetut reseptit
            </Link>

            <Link to="/print" onClick={() => setIsMenuOpen(false)} className="hover:font-bold transition-all">
              Ohjeet ja tuki
            </Link>
          </div>
        )}
      </div>

      {/* LOGIN MODAL */}
     <LoginModal
      isOpen={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
      onLogin={({ email, password }) => {
        console.log("Login:", email, password);
      }}
    />

    </div>
  );
}