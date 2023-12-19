import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
/*import {getFoods, deleteFood} from "./api/FoodsAPI.js";*/
import AddPlanUI from "./AddPlanUI";

const PlanGrid = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    //    const [showAddFoodUI, setShowAddFoodUI] = useState(false);

    /*    const handleAddFood = () => {
            const fetchFoods = async () => {
                const foods = await getFoods();
                setRowData(foods);
            };
    
            fetchFoods();
        };
    
        useEffect(() => {
            const fetchFoods = async () => {
                const foods = await getFoods();
                setRowData(foods);
            };
    
            fetchFoods();
        }, []);*/

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        console.log("Grid is ready");
    };

    //CELL RENDERERS

    /*    const recipeCellRenderer = (params) => {
            return ( <
                div style = {
                    {
                        whiteSpace: "normal"
                    }
                } > {
                    params.value
                } <
                /div>
            );
        };
    
        const ingredientsCellRenderer = (params) => {
            const ingredients = params.value;
            return ( <
                div style = {
                    {
                        whiteSpace: "normal"
                    }
                } > {
                    ingredients.map((ingredient) => ( <
                        div key = {
                            ingredient.id
                        } > {
                            ingredient.ingredient.name
                        } - {
                            ingredient.howMuch
                        } {
                            ingredient.uom
                        } <
                        /div>
                    ))
                } <
                /div>
            );
        };*/

    /*    const deleteCellRenderer = (params) => {
            const onClick = async () => {
                console.log("Delete button clicked");
                if (gridApi !== null) {
                    console.log("Delete functionality used");
                    const updatedFoods = await deleteFood(params.data.id);
                    setRowData(updatedFoods);
                }
            };
    
            return ( <
                button onClick = {
                    onClick
                } >
                Delete <
                /button>
            );
        };*/

    /*    const columnDefs = [{
                headerName: "Id",
                field: "id"
            },
            {
                headerName: "Name",
                field: "name"
            },
            {
                headerName: "Calories",
                field: "ccal"
            },
            {
                headerName: "Protein",
                field: "protein"
            },
            {
                headerName: "Fats",
                field: "fat"
            },
            {
                headerName: "Carbs",
                field: "carbs"
            },
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
        ];*/

    //    window.addEventListener('foodAdded', handleAddFood);

    return (
        <>
            {<AddPlanUI />}
        </>
    );
};

export default PlanGrid;