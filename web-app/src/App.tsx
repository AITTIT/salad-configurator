import IngredientSection from "./components/IngredientSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Routes, Route,} from 'react-router-dom';
import Configurator from "./pages/Configurator";
import Community from "./pages/Community";
import Print from "./pages/Print";

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
          <Routes>
            <Route path="/" element={<Configurator />} />
            <Route path="/community" element={<Community />} />
            <Route path="/print" element={<Print />} />
          </Routes>
        <IngredientSection />
      </main>
      <Footer />
    </div>
  )
}

export default App