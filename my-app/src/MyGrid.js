import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Ingredients, deleteIngredient, addIngredient } from "./api/IngredientsAPI.js";

const MyGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

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

  const addCellRenderer = () => {
    const [newIngredient, setNewIngredient] = useState("");

    const onClick = async () => {
        if (gridApi !== null) {
            const ingredient = await addIngredient(newIngredient);
            setRowData([...rowData, ingredient]);
        }
    };

    const handleChange = (event) => {
      setNewIngredient(event.target.value);
    };

    return (
      <div>
        <input type="text" value={newIngredient} onChange={handleChange} />
        <button onClick={onClick}>
          Add
        </button>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name" },
    {
      headerName: "",
      cellRenderer: addCellRenderer,
      width: 200,
    },
    {
      headerName: "",
      cellRenderer: deleteCellRenderer,
      width: 100,
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "90vw", width: "80vw", textAlign: "center" }}>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
};

export default MyGrid;
