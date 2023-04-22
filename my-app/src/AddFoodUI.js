import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addFood } from "./api/FoodsAPI.js";
import { Ingredients } from "./api/IngredientsAPI.js";

const AddFoodUI = () => {
    const [ingredients, setIngredients] = useState([]);
    const [newFood, setNewFood] = useState({
        name: "",
        ccal: "",
        protein: "",
        fat: "",
        carbs: "",
        recipe: "",
        ingredients: [],
    });
    const [newIngredient, setNewIngredient] = useState({
        ingredientId: null,
        howMuch: 0,
        uom: ""
    });
    const uoms = [
        { value: 'GRAM', label: 'g' },
        { value: 'UNIT', label: 'un' },
        { value: 'TBSP', label: 'tablespoon' },
        { value: 'TSP', label: 'teaspoon' },
        { value: 'ML', label: 'ml' },
        // Add more options as needed
        //TODO duplicates public enum UnitOfMeasure
    ];
//    const event = new CustomEvent('foodAdded');

useEffect(() => {
  const fetchIngredients = async () => {
    const ingredientsData = await Ingredients();
    const options = ingredientsData.map((ingredient) => ({
      value: ingredient.id,
      label: ingredient.name,
    }));
    setIngredients(options);
  };
  fetchIngredients();
}, []);

const handleAddFood = async () => {
  const updatedFoods = await addFood(newFood);
  setNewFood({
    name: "",
    ccal: "",
    protein: "",
    fat: "",
    carbs: "",
    recipe: "",
    ingredients: [],
  });
  // Update the foods state to reflect the new food
//  setFoods(prevFoods => [...prevFoods, updatedFoods]);
  const event = new CustomEvent('foodAdded', { value: newFood });
  window.dispatchEvent(event);
  // Optionally, display a success message to the user
  alert('Food added successfully!');
};

  const handleAddIngredient = () => {
    if (!newIngredient.ingredientId || !newIngredient.howMuch || !newIngredient.uom) {
      return;
    }

    const ingredient = {
      id: newIngredient.ingredientId,
      howMuch: newIngredient.howMuch,
      uom: newIngredient.uom
    };

    setNewFood(prevFood => ({
      ...prevFood,
      ingredients: [...prevFood.ingredients, ingredient]
    }));

    setNewIngredient({
      ingredientId: null,
      howMuch: "",
      uom: ""
    });
  };

const handleIngredientChange = (selectedOption) => {
  // get the selected ingredient object from the ingredients array
  const selectedIngredient = ingredients.find((ingredient) => ingredient.id === selectedOption.value);

  // update the new ingredient object with the selected ingredient id
  setNewIngredient((prevIngredient) => ({
    ...prevIngredient,
    ingredientId: selectedOption.value,
  }));
};

const handleHowMuchChange = (event) => {
  setNewIngredient((prevIngredient) => ({
    ...prevIngredient,
    howMuch: event.target.value,
  }));
};

const handleUomChange = (selectedOption) => {
  setNewIngredient((prevIngredient) => ({
    ...prevIngredient,
    uom: selectedOption ? selectedOption.value : null,
  }));
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const recipeCellRenderer = (params) => {
    return (
      <div style={{ whiteSpace: "normal" }}>
        {params.value}
      </div>
    );
  };

return (
  <div>
    <div style={{ margin: "10px", display: "flex" }}>
      {/* 1st column */}
      <div style={{ flex: 1 }}>
        <input
          type="text"
          value={newFood.name}
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
      </div>
      {/* 2nd column */}
<div style={{ flex: 1 }}>
  <div style={{ marginBottom: '3px' }}>
    <input
      type="number"
      value={newFood.protein}
      name="protein"
      placeholder="Protein"
      onChange={handleChange}
    />
  </div>
  <div style={{ marginBottom: '3px' }}>
    <input
      type="number"
      value={newFood.fat}
      name="fat"
      placeholder="Fats"
      onChange={handleChange}
    />
  </div>
  <div style={{ marginBottom: '3px' }}>
    <input
      type="number"
      value={newFood.carbs}
      name="carbs"
      placeholder="Carbs"
      onChange={handleChange}
    />
  </div>
  <div style={{ marginBottom: '3px' }}>
      <input
        type="number"
        value={newFood.ccal}
        name="ccal"
        placeholder="Calories"
        onChange={handleChange}
      />
    </div>
</div>

      {/* 3rd column */}
      <div style={{ flex: 1 }}>
        <Select
          value={ingredients.filter(
            (option) => option.value === newIngredient.ingredientId
          )}
          onChange={handleIngredientChange}
          options={ingredients}
          placeholder="Select an ingredient"
        />
        <input
          type="number"
          value={newIngredient.howMuch}
          onChange={handleHowMuchChange}
          placeholder="HowMuch"
        />
        <Select
          value={newFood.uom}
          onChange={handleUomChange}
          options={uoms}
          placeholder="Select a unit of measurement"
        />
        <button onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
      {/* 4th column */}
      <div style={{ flex: 1 }}>
        <textarea
          value={newFood.recipe}
          name="recipe"
          placeholder="Recipe"
          onChange={handleChange}
          rows="4"
          cols="50"
        />
      </div>
    </div>
        <button style={{ margin: "10px" }} onClick={handleAddFood}>Add Food</button>

  </div>
);


};

export default AddFoodUI;