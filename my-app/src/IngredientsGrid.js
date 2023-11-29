
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Ingredients, deleteIngredient, addIngredient } from "./api/IngredientsAPI.js";
import "./UI.css";

const IngredientsGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredients = await Ingredients();
      setRowData([...ingredients].reverse());

    };

    fetchIngredients();
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    console.log("Grid is ready");
  };

  const deleteCellRenderer = (params) => {
    const onClick = async () => {
      if (gridApi !== null) {
        const updatedIngredients = await deleteIngredient(params.data.id);
        setRowData(updatedIngredients);
      }
    };

    return (
      <button className="ingrDeleteButton" onClick={onClick}>
        Delete
      </button>
    );
  };

  const handleAddIngredient = async () => {
    if (gridApi !== null) {
      const updatedIngredients = await addIngredient(newIngredient);
      setRowData(updatedIngredients);
      setNewIngredient("");
    }
  };

  const handleChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const columnDefs = [
    { headerName: "Name", field: "name", width: 330 }, {
      headerName: "Delete",
      cellRenderer: deleteCellRenderer,
      width: 200,
    },
  ];
  return (
    <div>
      <div className="ingredientControls">
        <input type="text" value={newIngredient} onChange={handleChange} />
        <button className="ingrButton" onClick={handleAddIngredient}>
          Add
        </button>
      </div>
      <div className="ag-theme-alpine gridContainer" style={{ width: 500 }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
          className="ag-grid-custom-class"
        />
      </div>
    </div>
  );
};

export default IngredientsGrid;


