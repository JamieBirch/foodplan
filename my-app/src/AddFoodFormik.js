
import React from "react";
import Select from "react-select";
import "./UI.css";
import { Formik, Form, ErrorMessage } from "formik";
import CcalCalc, { calculateCcal } from "./CcalCalc";


const AddFoodFormik = ({
  uoms,
  newFood,
  ingredients,
  newIngredient,
  handleAddIngredient,
  handleIngredientChange,
  handleHowMuchChange,
  handleUomChange,
  handleProteinChange,
  handleFatChange,
  handleCarbsChange,
  handleAddFood
}) => {

  return (
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
                required
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
                required
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
                required
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
                required
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
                name="amount"
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
  )
};

export default AddFoodFormik;


