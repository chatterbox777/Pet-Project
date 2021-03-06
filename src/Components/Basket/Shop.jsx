import React from "react";

import classTags from "./Shop.module.css";
import { BrowserRouter } from "react-router-dom";

class Shop extends React.Component {
  render() {
    debugger;
    return (
      <BrowserRouter>
        <div className={classTags.dis}>
          <button onClick={() => this.props.sortPriceAsc()}>
            отсортировать по возрастанию цены
          </button>
          <button onClick={() => this.props.sortPriceDesc()}>
            отсортировать по убыванию цены
          </button>
          <ul className={classTags.disp}>
            {this.props.items.map((item) => (
              <li key={item.BasketItemId}>
                <div className={classTags.flex_basis}>
                  <img src={item.imgSrc} alt="товар" />
                  <h3>{item.description}</h3>
                  <h2>
                    цена:
                    <span
                      className={`${
                        item.price > 5000 && item.price < 10000
                          ? classTags.mediumPrice
                          : null || item.price < 5000
                          ? classTags.lowPrice
                          : null || item.price > 10000
                          ? classTags.highPrice
                          : null
                      }`}
                    >
                      {item.price}
                    </span>
                  </h2>
                  <button
                    onClick={(e) =>
                      this.props.onButtonBasket(e, item.BasketItemId)
                    }
                  >
                    {item.clicked ? "Товар добавлен" : "Купить"}
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
export default Shop;
