import React from "react";
import classTags from "./InBasket.module.css";

class InBasket extends React.Component {
  render() {
    return (
      <div className={classTags.disp}>
        <ul className={classTags.disp}>
          {this.props.items.map((item) =>
            item.clicked ? (
              <li key={item.BasketItemId}>
                <div className={classTags.flex_basis}>
                  <img src={item.imgSrc} alt="товар" />
                  <h3>{item.description}</h3>
                  <button
                    onClick={(e) =>
                      this.props.onButtonBasket(e, item.BasketItemId)
                    }
                  >
                    Удалить из корзины
                  </button>
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    );
  }
}
export default InBasket;
