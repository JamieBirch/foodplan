
import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addFood } from "./api/FoodsAPI.js";
import { Ingredients } from "./api/IngredientsAPI.js";
import "./UI.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  const [showModal, setShowModal] = useState(false);
  const [modalValues, setModalValues] = useState({});
  const [animationOut, setAnimationOut] = useState(false);



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
      }, 3000); // 3 секунды

      return () => clearTimeout(timeout);
    }
  }, [showModal]);

  const handleAddFood = async (values) => {
    const ccalValue = calculateCcal(values.protein, values.fat, values.carbs);
    values.ccal = ccalValue;
    const updatedFood = {
      ...newFood,
      ccal: ccalValue,
      name: values.name,
      recipe: values.recipe
    };
    await addFood(updatedFood);
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
    setShowModal(true);
    setModalValues(values);
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

  const recipeCellRenderer = (params) => {
    return (
      <div style={{ whiteSpace: "normal" }} > {params.value} </div>
    )
  }


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
      <Formik
        initialValues={newFood}
        onSubmit={(values, actions) => {
          handleAddFood(values);
          actions.resetForm();
          console.log("New Food is added", values)
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
                <input className="foodName"
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
                  onChange={(e) => {
                    handleChange(e);
                    handleProteinChange(e);
                  }}
                />
                <input
                  type="number"
                  value={values.fat}
                  name="fat"
                  placeholder="Fats"
                  onChange={(e) => {
                    handleChange(e);
                    handleFatChange(e);
                  }}
                />
                <input
                  type="number"
                  value={values.carbs}
                  name="carbs"
                  placeholder="Carbs"
                  onChange={(e) => {
                    handleChange(e);
                    handleCarbsChange(e);
                  }}
                />
                <CcalCalc
                  protein={Number(values.protein)}
                  fat={Number(values.fat)}
                  carbs={Number(values.carbs)}
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
              <button className="ingrFoodButton" onClick={handleAddIngredient} type="button">
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
      <Modal show={showModal} onHide={handleCloseModal} className={animationOut ? 'scale-out-center' : ''}>
        <Modal.Header closeButton>
          <Modal.Title>The food was added successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(modalValues).length !== 0 && (
            <>
              <h3>{modalValues.name}</h3>
              <p>Protein: {modalValues.protein}</p>
              <p>Fats: {modalValues.fat}</p>
              <p>Carbs: {modalValues.carbs}</p>
              <p>Ccal: {modalValues.ccal}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );


};

export default AddFoodUI;


