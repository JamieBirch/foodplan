


const BASE_URL = "http://localhost:8080/plan";

/*export const getFoods = async () => {
  const response = await fetch(`${BASE_URL}`);
  return handleResponse(response);
};*/

export const createPlan = async (planConfiguration) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(planConfiguration),
  });
  return handleResponse(response);
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};
