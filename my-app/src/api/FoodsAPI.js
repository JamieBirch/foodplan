const BASE_URL = "http://localhost:8080/food";

export const getFoods = async () => {
  const response = await fetch(`${BASE_URL}`);
  return handleResponse(response);
};

export const deleteFood = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const addFood = async (food) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
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
