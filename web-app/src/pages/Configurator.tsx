import CenterBowl from "../components/CenterBowl";
import { useState } from 'react';
import type { Bowl, Ingredient } from '../types/index.ts';

function Configurator() {
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Ingredient[]>([]);

    return (
        <div>
            <CenterBowl />
        </div>
    );
}
export default Configurator