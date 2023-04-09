// Ingredients

const BASE_URL = "http://localhost:8080/ingredient";

export const Ingredients = async () => {
  const response = await fetch(`${BASE_URL}`);
  return handleResponse(response);
};

export const deleteIngredient = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const addIngredient = async (name) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return handleResponse(response);
};

// function to handle response from API
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};
