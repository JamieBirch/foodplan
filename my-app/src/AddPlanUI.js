
import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { createPlan } from "./api/PlanAPI.js";
import "./UI.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CcalCalc from './CcalCalc';


const AddPlanUI = () => {
  const initialValues = {
    days: '',
    marginOfError: '',
    requirements: {
      protein: '',
      fat: '',
      carbs: '',
      ccal: ''
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    values.requirements.ccal = parseFloat(values.requirements.ccal);
    try {
      console.log('Отправка данных на сервер:', values);
      const response = await createPlan(values);
      console.log('Ответ от сервера:', response);
      resetForm();
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  const calculateCcal = (protein, fat, carbs) => {
    return protein * 4 + fat * 9 + carbs * 4;
  };



  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="form-containerAddPlan">
            <div className="days">
              <Field type="number" name="days" placeholder="Days" />
            </div>
            <div className="prot">
              <Field type="number" name="requirements.protein" placeholder="Protein" required
                onChange={(e) => {
                  setFieldValue("requirements.protein", e.target.value);
                  setFieldValue("requirements.ccal", calculateCcal(parseFloat(e.target.value), values.requirements.fat, values.requirements.carbs));
                }} />
            </div>
            <div className="marg">
              <Field
                type="number"
                name="marginOfError"
                placeholder="Margin of Error"
              />
            </div>
            <div className="fat">
              <Field type="number" name="requirements.fat" placeholder="Fats" required
                onChange={(e) => {
                  setFieldValue("requirements.fat", e.target.value);
                  setFieldValue("requirements.ccal", calculateCcal(values.requirements.protein, parseFloat(e.target.value), values.requirements.carbs));
                }} />
            </div>
            <div className="carb">
              <Field type="number" name="requirements.carbs" placeholder="Carbs" required onChange={(e) => {
                setFieldValue("requirements.carbs", e.target.value);
                setFieldValue("requirements.ccal", calculateCcal(values.requirements.protein, values.requirements.fat, parseFloat(e.target.value)));
              }} />
            </div>
            <div className="ccal">
              <CcalCalc
                protein={values.requirements.protein}
                fat={values.requirements.fat}
                carbs={values.requirements.carbs}
              />
              <ErrorMessage name="requirements.ccal" />
            </div>
          </div>
          <button className="planButton" type="submit">
            Add Plan
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPlanUI;