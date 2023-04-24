import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AddPlanUI = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [newPlan, setNewPlan] = useState({
        days: "",
        requirements: {
            protein: "",
            fat: "",
            carbs: "",
            ccal: "",
          },
        marginOfError: "",
     });

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;
        setNewPlan((prevFood) => ({
            ...prevFood,
            [name]: value,
        }));
    };

return (
  <div>
    <div style={{ margin: "10px", display: "flex" }}>
      {/* 1st column */}
      <div style={{ flex: 1 }}>
        <input
          type="number"
          value={newPlan.days}
          name="days"
          placeholder="Days"
          onChange={handleChange}
        />
      </div>
      {/* 2nd column */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '3px' }}>
          <input
            type="number"
            value={newPlan.requirements.protein}
            name="protein"
            placeholder="Protein"
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '3px' }}>
          <input
            type="number"
            value={newPlan.requirements.fat}
            name="fat"
            placeholder="Fats"
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '3px' }}>
          <input
            type="number"
            value={newPlan.requirements.carbs}
            name="carbs"
            placeholder="Carbs"
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '3px' }}>
          <input
            type="number"
            value={newPlan.requirements.ccal}
            name="ccal"
            placeholder="Calories"
            onChange={handleChange}
          />
        </div>
      </div>
      {/* 3rd column */}
      <div style={{ flex: 1 }}>
        <input
          type="number"
          value={newPlan.marginOfError}
          name="marginOfError"
          placeholder="Margin of Error"
          onChange={handleChange}
        />
      </div>
    </div>
    <button style={{ margin: "10px" }} /*onClick={handleAddFood}*/>
      Add Plan
    </button>
  </div>
);
};

export default AddPlanUI;