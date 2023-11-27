


import React from "react";

export const calculateCcal = (protein, fat, carbs) => {
  const proteinValue = parseFloat(protein);
  const fatValue = parseFloat(fat);
  const carbsValue = parseFloat(carbs);

  if (isNaN(proteinValue) || isNaN(fatValue) || isNaN(carbsValue)) {
    return 'Calories';
  }

  return proteinValue * 4 + fatValue * 9 + carbsValue * 4;
};

const CcalCalc = ({ protein, fat, carbs }) => {
  const ccal = calculateCcal(protein, fat, carbs);

  return (
    <input
      type="text"
      value={isNaN(ccal) ? 'Calories' : ccal}
      placeholder="Calories"
      readOnly
    />
  );
};

export default CcalCalc;

