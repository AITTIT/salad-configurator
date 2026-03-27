import CenterBowl from "../components/CenterBowl";
import { useState } from 'react';
import type { Bowl } from '../types/index.ts';

function Configurator() {
    const [bowls, setBowls] = useState<Bowl[]>([]);
    const [categories, setCategories] = useState<Bowl[]>([]);

    return (
        <div>
            <CenterBowl />
        </div>
    );
}
export default Configurator