import BaseSelection from "./components/BaseSelection";
import BowlSelection from "./components/BowlSelection";
import IngredientSection from "./components/IngredientSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Routes, Route,} from 'react-router-dom';
import Configurator from "./pages/Configurator";
import Community from "./pages/Community";
import Print from "./pages/Print";
import IngredientCard from "./components/IngredientCard";
import type { Ingredient } from "./types";

function App() {
  const testIngredient: Ingredient = {
    id: 0,
    name: 'cabbage',
    categoryId: 1,
    diets: ["G, L, V"],
    weight_grams: 50,
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          <BowlSelection />
          <BaseSelection />
          <IngredientCard  ingredient={testIngredient}/>
      <Routes>
          <Route path="/" element={<Configurator />} />
          <Route path="/community" element={<Community />} />
          <Route path="/print" element={<Print />} />
      </Routes>
        </div>
        <IngredientSection />
      </main>
      <Footer />
    </div>
  )
}

export default App