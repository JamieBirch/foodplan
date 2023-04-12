import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getFoods, deleteFood, addFood } from "./api/FoodsAPI.js";

const FoodsGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    ccal: "",
    protein: "",
    fat: "",
    carbs: "",
    recipe: "",
  });

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
