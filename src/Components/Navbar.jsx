import React from "react";
import classTags from "../Components/Navbar.module.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className={classTags.disp}>
      <div>
        <NavLink to="/Profile" activeClassName={classTags.activeLink}>
          Главная
        </NavLink>
      </div>
      <div>
        <NavLink to="/About me" activeClassName={classTags.activeLink}>
          Обо мне
        </NavLink>
      </div>
      <div>
        <NavLink to="/Music" activeClassName={classTags.activeLink}>
          Музыка
        </NavLink>
      </div>
      <div>
        <NavLink to="/Videos" activeClassName={classTags.activeLink}>
          Видео
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
