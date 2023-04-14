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
//    ingredients: [],
    amount: 0,
  });

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
    });
  }
};

const handleIngredientChange = (selectedOption) => {
  setNewFood((prevFood) => ({
    ...prevFood,
    ingredientId: selectedOption ? selectedOption.value : null,
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

  const ingredientsCellRenderer = (params) => {
    const ingredients = params.value;
    return (
      <div style={{ whiteSpace: "normal" }}>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            {ingredient.ingredient.id} - {ingredient.ingredient.name} - {ingredient.howMuch} {ingredient.uom}
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
           value={ingredients.filter((option) => option.value === newFood.ingredientId)}
           onChange={handleIngredientChange}
           options={ingredients}
           placeholder="Select an ingredient"
        />
        <input
           type="number"
           value={newFood.amount}
           name="amount"
           placeholder="Amount"
           onChange={handleChange}
        />
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
