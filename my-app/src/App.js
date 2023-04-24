import React, { useState } from "react";
//import AddFoodUI from "./AddFoodUI";
//import AddPlanUI from "./AddPlanUI";
import FoodsGrid from "./FoodsGrid";
import IngredientsGrid from "./IngredientsGrid";
import PlanGrid from "./PlanGrid";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [showIngredients, setShowIngredients] = useState(true);
  const [showFoods, setShowFoods] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  const handleShowIngredientsClick = () => {
    setShowIngredients(true);
    setShowFoods(false);
    setShowPlan(false);
  };

  const handleShowFoodsClick = () => {
    setShowIngredients(false);
    setShowFoods(true);
    setShowPlan(false);
  };

  const handleShowPlan = () => {
    setShowIngredients(false);
    setShowFoods(false);
    setShowPlan(true);
  };

  return (
    <div className="App">
      <div style={{ margin: "10px" }}>
        <button onClick={handleShowIngredientsClick}>Ingredients</button>
        <button onClick={handleShowFoodsClick}>Foods</button>
        <button onClick={handleShowPlan}>Plan</button>
      </div>
      {showIngredients && <IngredientsGrid />}
      {showFoods && <FoodsGrid />}
      {showPlan && <PlanGrid />}
    </div>
  );
}

export default App;
