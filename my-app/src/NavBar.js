import React from "react";
import classes from './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar(props) {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <nav>
      <ul className="flip-in-hor-top">
        <li className="itemI" onClick={() => handleLinkClick('/ingredients')}>
          <NavLink className={classes.itemI} activeClassName={classes.active} to="/ingredients">Ingredients</NavLink>
        </li>
        <li className="itemF" onClick={() => handleLinkClick('/foods')}>
          <NavLink className={classes.itemF} activeClassName={classes.active} to="/foods">Foods</NavLink>
        </li>
        <li className="itemP" onClick={() => handleLinkClick('/plan')}>
          <NavLink className={classes.itemP} activeClassName={classes.active} to="/plan">Plan</NavLink>
        </li>
      </ul>
    </nav>
  );
}


export default NavBar;

