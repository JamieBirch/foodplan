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


/*export function getIngredients() {
    var url = "/ingredient";
    var foodplanPromise = $http.get(url);
    return foodplanPromise.then(function(response) {
        return response.data;
    });
}*/

/*export function deleteIngredient(id) {
    var url = "/ingredient/" + id;
    var foodplanPromise = $http.delete(url);
    return foodplanPromise.then(function(response) {
        getIngredients();
    });
}

export function addIngredient(name) {
    var url = "/ingredient";
    var myJson = { "name": name };
    return $http.post(url, myJson)
        .then(function(response) {
            console.log('Ingredient added:', response.data);
            getIngredients();
        })
        .catch(function(error) {
            console.error('There was a problem adding the ingredient:', error);
        });
}*/

// function to handle response from API
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};
