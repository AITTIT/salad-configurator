import CenterBowl from "../components/CenterBowl";
import { useState, useEffect } from 'react';
import type { Bowl, Ingredient } from '../types/index.ts';
import { getBowls, getCategories } from "../services/api.ts";

function Configurator() {
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Ingredient[]>([]);
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

    return (
            <div>
            {isLoading ? (
                <div>
                    {/*Create loading wheel here.*/}
                    <p>Loading ingredients...</p>
                </div>
            ) : (
                <CenterBowl />
            )}
        </div>
    );
}
export default Configurator