import React from "react";
import { NavLink } from 'react-router-dom';
import classes from './NavBar.css';

function NavBar(props) {
  return (
    <nav>
      <ul className="flip-in-hor-top">
        <li className="itemI">
          <NavLink className={navData => navData.isActive ? classes.active : classes.itemI} to="/ingredients">Ingredients</NavLink>
        </li>
        <li className="itemF">
          <NavLink className={navData => navData.isActive ? classes.active : classes.itemF} to="/foods" >Foods</NavLink>
        </li>
        <li className="itemP">
          <NavLink className={navData => navData.isActive ? classes.active : classes.itemP} to="/plan">Plan</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

