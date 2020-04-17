import React from "react";
import classTags from "../../App.module.css";

class Form extends React.Component {
  render() {
    return (
      <div>
        <div className="form">{this.props.counter}</div>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.decrement}>-</button>

        <div className={classTags.flex}>
          <h4>History</h4>
          <input
            onClick={() => this.props.deleteHistory()}
            type="submit"
            value="delete history"
          />
        </div>
        <div className={classTags.form}>
          <ul>
            {this.props.history.map((el) => (
              <li key={el.id}>
                {el.count}
                <span
                  onClick={() => this.props.onDeleteItem(el.id)}
                  className={classTags.formSpan}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Form;
