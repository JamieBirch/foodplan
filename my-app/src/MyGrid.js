import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getIngredients2 } from "./api/IngredientsAPI.js";

const MyGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

/*  useEffect(() => {
    fetch("/ingredient")
      .then((response) => response.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);*/

  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredients = await getIngredients2();
      setRowData(ingredients);
    };

    fetchIngredients();
  }, []);


  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const columnDefs = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "600px" }}>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
};

export default MyGrid;
