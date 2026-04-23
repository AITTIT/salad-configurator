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

  const baseType = useIngredientStore((state: IngredientStore) => state.baseType);
  const authToken = useAuthStore((state) => state.token);
  const fetchPrices = usePriceStore((state) => state.fetchPrices);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const bowlsData = await getBowls();
        const categoriesData = await getCategories();
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
  }, []);

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
            <BowlSelection bowls={filteredBowls} />
            <CenterBowl />
            <BaseSelection ingredients={baseIngredients} />
          </div>
          <IngredientSection categories={filteredCategories} ingredients={ingredients} />
          <SummaryBar />
        </div>
      )}
    </div>
  );
}
export default Configurator