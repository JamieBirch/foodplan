
import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { createPlan } from "./api/PlanAPI.js";
import "./UI.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CcalCalc, { calculateCcal } from "./CcalCalc";
import ServerResponseTable from "./ServerResponseTable";


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
  const [serverResponse, setServerResponse] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    values.requirements.ccal = parseFloat(values.requirements.ccal);
    try {
      const response = await createPlan(values);
      setServerResponse(response);
      resetForm();
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };



  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="form-containerAddPlan">
              <div className="days">
                <Field type="number" name="days" placeholder="Days" required />
              </div>
              <div className="prot">
                <Field type="number" name="requirements.protein" placeholder="Protein" required onChange={(e) => {
                  setFieldValue("requirements.protein", parseInt(e.target.value, 10));
                  setFieldValue("requirements.ccal", calculateCcal(parseInt(e.target.value, 10), values.requirements.fat, values.requirements.carbs));
                }} />

              </div>
              <div className="marg">
                <Field
                  type="number"
                  name="marginOfError"
                  placeholder="Margin of Error"
                  required
                />
              </div>
              <div className="fat">
                <Field type="number" name="requirements.fat" placeholder="Fats" required
                  onChange={(e) => {
                    setFieldValue("requirements.fat", parseInt(e.target.value, 10));
                    setFieldValue("requirements.ccal", calculateCcal(parseInt(e.target.value, 10), values.requirements.protein, values.requirements.carbs));
                  }} />
              </div>
              <div className="carb">
                <Field type="number" name="requirements.carbs" placeholder="Carbs" required
                  onChange={(e) => {
                    setFieldValue("requirements.carbs", parseInt(e.target.value, 10));
                    setFieldValue("requirements.ccal", calculateCcal(parseInt(e.target.value, 10), values.requirements.protein, values.requirements.fat));
                  }} />
              </div>
              <div className="ccal">
                <CcalCalc protein={values.requirements.protein} fat={values.requirements.fat} carbs={values.requirements.carbs} />
                <ErrorMessage name="requirements.ccal" />
              </div>
            </div>
            <button className="planButton" type="submit">
              Add Plan
            </button>
          </Form>
        )}
      </Formik>
      {serverResponse && (
        <div className="plan">
          <h2></h2>
          <ServerResponseTable responseData={serverResponse} className="slide-in-fwd-center" />
        </div>
      )}
    </>
  );
};

export default AddPlanUI;

