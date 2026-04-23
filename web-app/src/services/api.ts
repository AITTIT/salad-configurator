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

export async function getBaseIngredients() {
  const response = await fetch("https://fresse-api.onrender.com/api/baseingredients");
  if (!response.ok) {
    throw new Error("Failed to fetch base ingredients");
  }
  return response.json();
}

export async function saveRecipe(token: string, recipeData: object) {
  const response = await fetch("https://fresse-api.onrender.com/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
  if (!response.ok) {
    throw new Error("Failed to save recipe");
  }
  return response.json();
}