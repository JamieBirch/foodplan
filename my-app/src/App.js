import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import IngredientsGrid from "./IngredientsGrid";
import FoodsGrid from "./FoodsGrid";
import PlanGrid from "./PlanGrid";
import "./App.css";
import Test from "./Test";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Header />
        <NavBar />
        <div>
          <Routes>
            <Route path='/ingredients' element={<IngredientsGrid />} />
            <Route path='/foods' element={<FoodsGrid />} />
            <Route path='/plan' element={<PlanGrid />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;


