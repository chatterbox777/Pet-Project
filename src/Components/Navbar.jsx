import React from "react";
import classTags from "../Components/Navbar.module.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className={classTags.disp}>
      <div>
        <NavLink to="/profile" activeClassName={classTags.activeLink}>
          Главная
        </NavLink>
      </div>
      <div>
        <NavLink to="/Users" activeClassName={classTags.activeLink}>
          Пользователи
        </NavLink>
      </div>
      <div>
        <NavLink to="/Counter" activeClassName={classTags.activeLink}>
          Счетчик
        </NavLink>
      </div>
      <div>
        <NavLink to="/Chat" activeClassName={classTags.activeLink}>
          Чат
        </NavLink>
      </div>
      <div>
        <NavLink to="/Youtube" activeClassName={classTags.activeLink}>
          Youtube
        </NavLink>
      </div>
      <div>
        <NavLink to="/Shop" activeClassName={classTags.activeLink}>
          Shop
        </NavLink>
      </div>
      <div>
        <NavLink to="/InBasket">Корзина </NavLink>
      </div>
      <div>
        <NavLink to="/Weather">Погода</NavLink>
      </div>
      <div>
        <NavLink to="/LiveSearch">Live Поиск</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
