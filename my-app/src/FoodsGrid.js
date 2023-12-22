

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddFoodUI from "./AddFoodUI";

const FoodsGrid = (props) => {
    return (
        <>
            <AddFoodUI />
        </>
    )
};

export default FoodsGrid;