
import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getFoods, deleteFood, addFood } from "./api/FoodsAPI.js";
import { Ingredients, deleteIngredient } from "./api/IngredientsAPI.js";
import "./UI.css";
import { Formik, Form, ErrorMessage } from "formik";
import AddFoodFormik from "./AddFoodFormik.js";
import AddFoodModWind from "./AddFoodModWind";
import CcalCalc, { calculateCcal } from "./CcalCalc";


const AddFoodUI = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    ccal: "",
    protein: "",
    fat: "",
    carbs: "",
    recipe: "",
    ingredients: [],
    selectedOption: ''
  });
  const [foodsData, setFoodsData] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    id: null,
    name: null,
    howMuch: 0,
    uom: "",
  });
  const uoms = [
    { value: "GRAM", label: "g" },
    { value: "UNIT", label: "un" },
    { value: "TBSP", label: "tablespoon" },
    { value: "TSP", label: "teaspoon" },
    { value: "ML", label: "ml" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [modalValues, setModalValues] = useState({});
  const [animationOut, setAnimationOut] = useState(false);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);


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
    if (showModal) {
      const timeout = setTimeout(() => {
        handleCloseModal();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showModal]);

  const fetchFoods = async () => {
    try {
      const foods = await getFoods();
      setFoodsData([...foods]);
      setRowData([...foods].reverse());
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);


  const deleteCellRenderer = (params) => {
    const onClick = async () => {
      try {
        await deleteFood(params.data.id);
        const updatedFoods = foodsData.filter(food => food.id !== params.data.id);
        setFoodsData(updatedFoods);
        setRowData([...updatedFoods].reverse());
      } catch (error) {
        console.error("Error deleting food:", error);
      }
    };


    return (
      <button className="ingrDeleteButton" onClick={onClick}>
        Delete
      </button>
    );
  };
  const columnDefs = [
    { headerName: "Name", field: "name", width: 250 },
    {
      headerName: "P/F/C Ccal",
      valueGetter: function (params) {
        const protein = params.data.protein || 0;
        const fat = params.data.fat || 0;
        const carbs = params.data.carbs || 0;
        const ccal = params.data.ccal || 0;
        return `${protein}/${fat}/${carbs} ${ccal}`;
      },
      width: 150
    },
    {
      headerName: "Delete",
      cellRenderer: deleteCellRenderer,
      width: 100,
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };


  const handleAddFood = async (values) => {
    try {
      const ccalValue = calculateCcal(values.protein, values.fat, values.carbs);
      values.ccal = ccalValue;
      await addFood(values);
      setShowModal(true);
      setModalValues(values);
      fetchFoods();
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };
  const handleCloseModal = () => {
    setAnimationOut(true);

    setTimeout(() => {
      setShowModal(false);
      setModalValues({});
      setAnimationOut(false);
    }, 300);
  };



  const handleAddIngredient = useCallback(() => {
    if (!newIngredient.id || !newIngredient.howMuch || !newIngredient.uom) {
      return;
    }

    const ingredient = {
      id: newIngredient.id,
      name: newIngredient.name,
      howMuch: newIngredient.howMuch,
      uom: newIngredient.uom,
    };

    setNewFood((prevFood) => ({
      ...prevFood,
      ingredients: [...prevFood.ingredients, ingredient],
    }));
    console.log(ingredient);

    setNewIngredient({
      id: null,
      name: null,
      howMuch: "",
      uom: "",
    });
  }, [newIngredient]);


  const handleIngredientChange = useCallback((selectedOption) => {
    const selectedIngredient = ingredients.find(
      (ingredient) => ingredient.id === selectedOption.value
    );

    setNewIngredient((prevIngredient) => ({
      ...prevIngredient,
      id: selectedOption.value,
      name: selectedOption.label,
    }));
  }, [ingredients]);

  const handleHowMuchChange = useCallback(
    (event) => {
      setNewIngredient((prevIngredient) => ({
        ...prevIngredient,
        howMuch: event.target.value,
      }));
    },
    []
  );

  const handleUomChange = useCallback(
    (selectedOption) => {
      setNewIngredient((prevIngredient) => ({
        ...prevIngredient,
        uom: selectedOption ? selectedOption.value : null,
      }));
    },
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };


  const handleProteinChange = useCallback(
    (event) => {
      const proteinValue = parseFloat(event.target.value);
      const ccalValue = calculateCcal(proteinValue, newFood.fat, newFood.carbs);

      setNewFood((prevFood) => ({
        ...prevFood,
        protein: proteinValue,
        ccal: isNaN(ccalValue) ? null : ccalValue,
      }));
    },
    [newFood.fat, newFood.carbs]
  );

  const handleFatChange = useCallback(
    (event) => {
      const fatValue = parseFloat(event.target.value);
      const ccalValue = calculateCcal(newFood.protein, fatValue, newFood.carbs);

      setNewFood((prevFood) => ({
        ...prevFood,
        fat: fatValue,
        ccal: isNaN(ccalValue) ? null : ccalValue,
      }));
    },
    [newFood.protein, newFood.carbs]
  );

  const handleCarbsChange = useCallback((event) => {
    const carbsValue = parseFloat(event.target.value);

    const protein = newFood.protein;
    const fat = newFood.fat;
    const ccalValue = calculateCcal(protein, fat, carbsValue);

    setNewFood((prevFood) => ({
      ...prevFood,
      carbs: isNaN(carbsValue) ? '' : carbsValue,
      ccal: isNaN(carbsValue) ? null : ccalValue,
    }));

  }, [newFood.fat, newFood.protein]);



  return (
    <>
      <AddFoodFormik
        ingredients={ingredients}
        newIngredient={newIngredient}
        handleAddIngredient={handleAddIngredient}
        handleIngredientChange={handleIngredientChange}
        handleHowMuchChange={handleHowMuchChange}
        handleUomChange={handleUomChange}
        handleChange={handleChange}
        handleProteinChange={handleProteinChange}
        handleFatChange={handleFatChange}
        handleCarbsChange={handleCarbsChange}
        handleAddFood={handleAddFood}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalValues={modalValues}
        animationOut={animationOut}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowData={rowData} />

      <AddFoodModWind
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalValues={modalValues}
        animationOut={animationOut}
      />
      <div className="ag-theme-alpine gridContainer" style={{ width: 500 }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
          className="ag-grid-custom-class"
        />
      </div>
    </>
  );


};

export default AddFoodUI;


