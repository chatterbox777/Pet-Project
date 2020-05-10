import React from "react";
import * as axios from "axios";

export class Weather extends React.Component {
  state = {
    value: "",
    temperature: "",
    place: "",
    pressure: "",
  };

  // получаем значение, введенное юзером в input
  valueTracker(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({
      value: value,
    });
    console.log(this.state);
  }

  getValueFromServer() {
    debugger;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=4a2600a79372ba51d19f02956a80ce0b&units=metric`
      )
      .then((response) => {
        this.setState({
          place: response.data.name,
          temperature: response.data.main.temp + "°С",
          pressure: response.data.main.pressure + "мм рт. ст.",
        });
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <input
          onChange={(e) => this.valueTracker(e)}
          type="text"
          placeholder="введите название города"
        />
        <button onClick={() => this.getValueFromServer()}>
          Получить погоду
        </button>
        <p>Местоположение: {this.state.place}</p>
        <p>Температура: {this.state.temperature} </p>
        <p>Давление: {this.state.pressure} </p>
        <p>Заход солнца: </p>
      </div>
    );
  }
}
