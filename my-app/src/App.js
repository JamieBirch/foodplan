import logo from './logo.svg';
import "./App.css";
import React from "react";
import IngredientsGrid from "./IngredientsGrid";
import FoodsGrid from "./FoodsGrid";
import AddFoodUI from "./AddFoodUI";
import { useState } from "react";

function App() {
  const [showIngredients, setShowIngredients] = useState(true);
  const [showFoods, setShowFoods] = useState(false);

  const handleShowIngredients = () => {
    setShowIngredients(true);
    setShowFoods(false);
  };

  const handleShowFoods = () => {
    setShowIngredients(false);
    setShowFoods(true);
  };

  return (
    <div className="App">
      <div style={{ margin: "10px" }}>
        <button onClick={handleShowIngredients}>Ingredients</button>
        <button onClick={handleShowFoods}>Foods</button>
      </div>
      {showIngredients && <IngredientsGrid />}
      {showFoods && <FoodsGrid />}
    </div>
  );
}

export default App;
