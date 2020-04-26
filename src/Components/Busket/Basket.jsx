import React from "react";

import classTags from "./Basket.module.css";
import { Route, BrowserRouter, NavLink } from "react-router-dom";
import InBasket from "./InBasket";

class Basket extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classTags.dis}>
          <NavLink to="/InBasket">Корзина </NavLink>
          <ul className={classTags.disp}>
            {this.props.items.map((item) => (
              <li key={item.BasketItemId}>
                <div className={classTags.flex_basis}>
                  <img src={item.imgSrc} alt="товар" />
                  <h3>{item.description}</h3>
                  <button
                    onClick={(e) =>
                      this.props.onButtonBasket(e, item.BasketItemId)
                    }
                  >
                    Купить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </BrowserRouter>
    );
  }
}
export default Basket;
