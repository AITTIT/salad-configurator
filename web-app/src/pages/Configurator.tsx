import CenterBowl from "../components/CenterBowl";
import { useState, useEffect } from 'react';
import type { Bowl, Category, Ingredient } from '../types/index.ts';

import { getBowls, getIngredients, getCategories, getBaseIngredients } from "../services/api.ts";
import BaseSelection from "../components/BaseSelection.tsx";
import BowlSelection from "../components/BowlSelection";
import IngredientSection from "../components/IngredientSection.tsx";
import { useIngredientStore, type IngredientStore } from "../store/useIngredientStore.ts";
import { usePriceStore } from "../store/usePriceStore.ts";
import { useAuthStore } from "../store/useAuthStore.ts";
import SummaryBar from "../components/SummaryBar.tsx";

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setLoading] = useState(false);

  const baseType = useIngredientStore((state) => state.baseType);
  const authToken = useAuthStore((state) => state.token);
  const fetchPrices = usePriceStore((state) => state.fetchPrices);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const bowlsData = await getBowls(baseType);
        const categoriesData = await getCategories(baseType);
        const ingredientsData = await getIngredients();
        const baseIngredientsData = await getBaseIngredients();

        setBowls(bowlsData);
        setCategories(categoriesData);
        setIngredients(ingredientsData);
        setBaseIngredients(baseIngredientsData);
      } catch (error) {
        console.error("Failed loading configurator data: ", error);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [baseType]);

  useEffect(() => {
    if (!authToken) return;

    void fetchPrices(authToken);
  }, [authToken, fetchPrices]);

  // Filter bowls and categories to only those matching the selected baseType
  const filteredBowls = bowls.filter((bowl) => bowl.base_type_id === baseType);
  const filteredCategories = categories.filter((category) => category.base_type_id === baseType);

  // Print fetch into console for testing
  useEffect(() => {
    console.log("Fetched bowls: ", bowls);
    console.log("Fetched categories:", categories);
    console.log("Fetched ingredients:", ingredients);
    console.log("Fetched base ingredients:", baseIngredients);
  }, [bowls, categories, ingredients, baseIngredients]);

  return (
    <div>
      {isLoading ? (
        <div>
          {/*Create loading wheel here.*/}
          <p>Loading ingredients...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
            <BowlSelection bowls={bowls} />
            <CenterBowl />
            {baseType === 1 ? (
    <BaseSelection ingredients={baseIngredients} />
  ) : (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center justify-start shadow-lg pt-8">
  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-4">
    2.
  </div>
  <p className="text-white text-sm text-center">
    Rahkalle ei ole pohjavaihtoehtoja
  </p>
</div>
  )}
</div>
          <IngredientSection categories={categories} ingredients={ingredients} />
          <SummaryBar />
        </div>
      )}
    </div>
  );
}
export default Configurator