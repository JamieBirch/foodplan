import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Ingredients, deleteIngredient, addIngredient } from "./api/IngredientsAPI.js";

const IngredientsGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredients = await Ingredients();
      setRowData(ingredients);
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
        console.log("Delete button clicked");
        if (gridApi !== null) {
            console.log("Delete functionality used");
            await deleteIngredient(params.data.id);
            gridApi.applyTransaction({ remove: [params.node] });
        }
    };

    return (
      <button onClick={onClick}>
        Delete
      </button>
    );
  };

  const handleAddIngredient = async () => {
      if (gridApi !== null) {
          const ingredient = await addIngredient(newIngredient);
          setRowData([...rowData, ingredient]);
          setNewIngredient("");
      }
  };

  const handleChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const columnDefs = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name" },
    {
      headerName: "",
      cellRenderer: deleteCellRenderer,
      width: 100,
    },
  ];

  return (
    <div>
      <div style={{ margin: "10px" }}>
        <input type="text" value={newIngredient} onChange={handleChange} />
        <button onClick={handleAddIngredient}>
          Add
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ height: "80vh", width: "80vw", textAlign: "center" }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
    </div>
  );
};

export default IngredientsGrid;
