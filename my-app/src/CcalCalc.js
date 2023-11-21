import React from "react";


const CcalCalc = ({ protein, fat, carbs }) => {
  const calculateCcal = (protein, fat, carbs) => {
    if (protein === '' || fat === '' || carbs === '') {
      return 'Calories';
    }
    return protein * 4 + fat * 9 + carbs * 4;
  };

  const ccal = calculateCcal(protein, fat, carbs);

  return (
    <input
      type="text"
      value={ccal}
      placeholder="Calories"
      readOnly
    />
  );
};

export default CcalCalc;
