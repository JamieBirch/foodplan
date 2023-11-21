
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addFood } from "./api/FoodsAPI.js";
import { Ingredients } from "./api/IngredientsAPI.js";
import "./UI.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CcalCalc from './CcalCalc';


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
  });
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

  const handleAddFood = async (values) => {
    const updatedFoods = await addFood(values);
    setNewFood({
      name: "",
      ccal: "",
      protein: "",
      fat: "",
      carbs: "",
      recipe: "",
      ingredients: [],
    });
    const event = new CustomEvent("foodAdded", {
      value: values,
    });
    window.dispatchEvent(event);
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
    const {
      name,
      value
    } = event.target;
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const recipeCellRenderer = (params) => {
    return (
      <div style={{ whiteSpace: "normal" }} > {params.value} </div>
    )
  }
  const calculateCcal = (protein, fat, carbs) => {
    return protein * 4 + fat * 9 + carbs * 4;
  };

  return (
    <Formik
      initialValues={newFood}
      onSubmit={(values, actions) => {
        handleAddFood(values);
        actions.resetForm();
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form className="formAddFood">
          <div className="form-containerAddFood">
            <div className="form-group">
              <input
                type="text"
                value={values.name}
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={values.protein}
                name="protein"
                placeholder="Protein"
                onChange={handleChange}
              />
              <ErrorMessage name="protein" component="div" />
              <input
                type="number"
                value={values.fat}
                name="fat"
                placeholder="Fats"
                onChange={handleChange}
              />
              <ErrorMessage name="fat" component="div" />
              <input
                type="number"
                value={values.carbs}
                name="carbs"
                placeholder="Carbs"
                onChange={handleChange}
              />
              <ErrorMessage name="carbs" component="div" />
              <CcalCalc
                protein={values.protein}
                fat={values.fat}
                carbs={values.carbs}
                onChange={handleChange}
              />
              <ErrorMessage name="ccal" component="div" />
            </div>
            <div className="form-group">
              <Select
                value={ingredients.filter((option) => option.value === newIngredient.id)}
                onChange={handleIngredientChange}
                options={ingredients}
                placeholder="Select an ingredient"
              />
              <input
                type="number"
                value={newIngredient.howMuch}
                onChange={handleHowMuchChange}
                placeholder="amount"
              />
              <Select
                value={newFood.uom}
                onChange={handleUomChange}
                options={uoms}
                placeholder="Select a unit of measurement"
              />
            </div>
            <div>
              <ul>
                {newFood.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.howMuch} - {ingredient.uom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="button-container">
            <button className="ingrFoodButton" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
          <div className="recipe-group">
            <textarea
              value={values.recipe}
              name="recipe"
              placeholder="Recipe"
              onChange={handleChange}
              rows="4"
              cols="40"
              className="full-width"
            />
            <ErrorMessage name="recipe" component="div" />
            <div className="button-container">
              <button type="submit" className="foodButton">
                Add Food
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );


};

export default AddFoodUI;


