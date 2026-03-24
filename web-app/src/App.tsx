import CenterBowl from "./components/CenterBowl";
import BaseSelection from "./components/BaseSelection";
import BowlSelection from "./components/BowlSelection";
import IngredientSection from "./components/IngredientSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          <BowlSelection />
          <CenterBowl />
          <BaseSelection />
        </div>
        <IngredientSection />
      </main>
      <Footer />
    </div>
  )
}
export default App