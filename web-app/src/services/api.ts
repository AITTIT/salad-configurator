export async function getBowls() {
    const response = await fetch("https://fresse-api.onrender.com/api/bowls");
    if (!response.ok) {
        throw new Error("Failed to fetch bowls");
    }
    return response.json();
}

export async function getCategories() {
    const response = await fetch("https://fresse-api.onrender.com/api/categories");
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
}

export async function getIngredients() {
    const response = await fetch("https://fresse-api.onrender.com/api/ingredients");
    if (!response.ok) {
        throw new Error("Failed to fetch ingredients");
    }
    return response.json();
}