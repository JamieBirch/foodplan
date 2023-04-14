import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getFoods, deleteFood, addFood } from "./api/FoodsAPI.js";
import { Ingredients } from "./api/IngredientsAPI.js";

const FoodsGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
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

  useEffect(() => {
    const fetchFoods = async () => {
      const foods = await getFoods();
      setRowData(foods);
    };

    fetchFoods();
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    console.log("Grid is ready");
  };

  const deleteCellRenderer = (params) => {
    const onClick = async () => {
        console.log("Delete button clicked");
        if (gridApi !== null) {
            console.log("Delete functionality used");
            const updatedFoods = await deleteFood(params.data.id);
            setRowData(updatedFoods);
        }
    };

    return (
      <button onClick={onClick}>
        Delete
      </button>
    );
  };

const handleAddFood = async () => {
  if (gridApi !== null) {
    const updatedFoods = await addFood(newFood);
    setRowData(updatedFoods);
    setNewFood({
      name: "",
      ccal: "",
      protein: "",
      fat: "",
      carbs: "",
      recipe: "",
      ingredients: [],
    });
  }
};

const handleIngredientChange = (selectedOption) => {
  // get the selected ingredient object from the ingredients array
  const selectedIngredient = ingredients.find((ingredient) => ingredient.id === selectedOption.value);
  // create a new ingredient object with the selected ingredient id, amount and uom
  const newIngredient = {
    ingredient: selectedOption.value,
    howMuch: newFood.amount,
    uom: newFood.uom,
  };
  // add the new ingredient to the ingredients array in the newFood state
  setNewFood((prevFood) => ({
    ...prevFood,
    ingredients: [...prevFood.ingredients, newIngredient],
  }));
};

const handleHowMuchChange = (event) => {
  setNewIngredient(prevIngredient => ({
    ...prevIngredient,
    howMuch: event.target.value
  }));
};

const handleUomChange = (selectedOption) => {
  setNewFood((prevFood) => ({
    ...prevFood,
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

  const recipeCellRenderer = (params) => {
    return (
      <div style={{ whiteSpace: "normal" }}>
        {params.value}
      </div>
    );
  };

  const ingredientsCellRenderer = (params) => {
    const ingredients = params.value;
    return (
      <div style={{ whiteSpace: "normal" }}>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            {ingredient.ingredient.name} - {ingredient.howMuch} {ingredient.uom}
          </div>
        ))}
      </div>
    );
  };


  const columnDefs = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Calories", field: "ccal" },
    { headerName: "Protein", field: "protein" },
    { headerName: "Fats", field: "fat" },
    { headerName: "Carbs", field: "carbs" },
    {
      headerName: "Recipe",
      field: "recipe",
      cellRenderer: recipeCellRenderer,
      autoHeight: true
    },
    {
      headerName: "Ingredients",
      field: "ingredients",
      cellRenderer: ingredientsCellRenderer,
      autoHeight: true
    },
    {
      headerName: "",
      cellRenderer: deleteCellRenderer,
      width: 100,
    },
  ];

  return (
    <div>
      <div style={{ margin: "10px" }}>
        <input
          type="text"
          value={newFood.name}
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="number"
          value={newFood.ccal}
          name="ccal"
          placeholder="Calories"
          onChange={handleChange}
        />
        <input
          type="number"
          value={newFood.protein}
          name="protein"
          placeholder="Protein"
          onChange={handleChange}
        />
        <input
          type="number"
          value={newFood.fat}
          name="fat"
          placeholder="Fats"
          onChange={handleChange}
        />
        <input
          type="number"
          value={newFood.carbs}
          name="carbs"
          placeholder="Carbs"
          onChange={handleChange}
        />
        <textarea
          value={newFood.recipe}
          name="recipe"
          placeholder="Recipe"
          onChange={handleChange}
          rows="4"
          cols="50"
        />
        <Select
              value={ingredients.filter((option) => option.value === newIngredient.ingredientId)}
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
        <button onClick={handleAddFood}>Add</button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "80vh", width: "80vw", textAlign: "left" }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
    </div>
  );
};

export default FoodsGrid;
