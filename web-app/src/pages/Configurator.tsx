import CenterBowl from "../components/CenterBowl";
import { useState, useEffect } from 'react';
import type { Bowl, Ingredient } from '../types/index.ts';

import { getBowls, getIngredients, getCategories } from "../services/api.ts";
import BaseSelection from "../components/BaseSelection.tsx";

function Configurator() {
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Ingredient[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const bowlsData = await getBowls();
                const categoriesData = await getCategories();

                setBowls(bowlsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed loading configurator data: ", error);
            } finally {
                setLoading(false);
            }
        };

        void loadData();
    }, []);

    // Print fetch into console for testing
    useEffect(() => {
        console.log(bowls);
        console.log(categories);
    }, [bowls, categories]);

    useEffect(() => {
        getIngredients()
            .then(setIngredients) // Tallennetaan ingredients-tilaan
            .catch((error) => {
                // TÄMÄ ON TECH SPECISTÄ: Tulostetaan virheet konsoliin
                console.error("Virhe haettaessa aineksia:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Haetut ainekset:", ingredients);
    }, [ingredients]);

   
    return (
            <div>
            {isLoading ? (
                <div>
                    {/*Create loading wheel here.*/}
                    <p>Loading ingredients...</p>
                </div>
            ) : (
                <div>
                <BaseSelection/>
                <CenterBowl />
                </div>
            )}
            </div>
    );
}
export default Configurator