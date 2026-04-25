export interface BaseType {
    id: number;
    name: string;
    price?: number;
    image_url?: string;
    barcode_url?: string;
}

export interface Bowl extends BaseType{
    base_type_id?: number;
    volume?: number;
    slot_count: number;
    shape: 'round' | 'square';
}

export interface Category {
    id: number;
    name: string;
    base_type_id?: number;
}

export interface Ingredient extends Category {
    categoryId: number;
    diets: string[];
    weight_grams: number;
    wedge_image_url?: string;
    // fetch also returns image_url and barcode_url
}

export interface User{
    id: number;
    email: string;
    name?: string;
    role?: string;
}

export interface Recipe {
    id: number;
    userId: number;
    name: string;
    bowlId: number;
    ingredientIds: number[];
    slots?: Record<string, Ingredient | null>;
    is_public?: boolean;
}

export interface PriceListItem {
    id: number;
    item_id: number;
    price: number;
    type?: string;
}
