import CenterBowl from "../components/CenterBowl";
import { useState, useEffect } from 'react';
import type { Bowl, Ingredient } from '../types/index.ts';
import { getBowls } from "../services/api.ts";

function Configurator() {
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Ingredient[]>([]);

    useEffect(() => {
        getBowls().then(setBowls);
    }, []);

    // A test to see if fetch works. 
    useEffect(() => {
        console.log(bowls);
    }), [bowls];

    return (
        <div>
            <CenterBowl />
        </div>
    );
}
export default Configurator