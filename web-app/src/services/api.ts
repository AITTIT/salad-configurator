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

export async function login(email: string, password: string) {
  const response = await fetch("https://fresse-api.onrender.com/api/auth/login", {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      // Is this supposed to be username or email?
      email: email,
      password: password
    })
    });

    if (!response.ok) {
      // In English or Finnish?
      throw new Error("Login failed");
    }

  
  
}