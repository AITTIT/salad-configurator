import { useState } from "react";
import Modal from "./Modal";
import { useIngredientStore } from "../store/useIngredientStore";
import { useAuthStore } from "../store/useAuthStore";
import { saveRecipe } from "../services/api";

interface SaveRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SaveRecipeModal({ isOpen, onClose }: SaveRecipeModalProps) {
  const [recipeName, setRecipeName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const token = useAuthStore((state) => state.token);

   const handleSave = async () => {
    if (!recipeName.trim()) { setError("Anna reseptille nimi."); return; }
    if (!selectedBowl) { setError("Valitse ensin kulho."); return; }
    if (!token) { setError("Kirjaudu sisään tallentaaksesi."); return; }

    const ingredientIds = Object.values(slots)
      .filter((i) => i !== null)
      .map((i) => i!.id);

    try {
      await saveRecipe(token, {
        name: recipeName,
        bowlId: selectedBowl.id,
        ingredientIds,
        is_public: isPublic,
      });
      onClose();
    } catch {
      setError("Tallennus epäonnistui. Yritä uudelleen.");
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold">Save Recipe</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Recipe Name</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Enter recipe name..."
            className="border-2 rounded-lg px-4 py-2 outline-none focus:border-[#A2D135]"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-4 h-4 accent-[#A2D135]"
          />
          <label htmlFor="isPublic" className="text-sm font-semibold">
            Make Public
          </label>
        </div>

       {error && <p className="text-red-500 text-sm">{error}</p>}
       
        <div className="flex gap-3 justify-end mt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border-2 border-gray-400 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-full bg-[#A2D135] text-black font-bold hover:opacity-80 transition-opacity"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}