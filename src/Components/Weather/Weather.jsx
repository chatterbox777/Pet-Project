import React from "react";
import * as axios from "axios";

export class Weather extends React.Component {
  state = {
    value: "",
    temperature: "",
    place: "",
    pressure: "",
    sunset: "",
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
        debugger;
        var sunset = response.data.sys.sunset;
        console.log(sunset);
        var date = new Date();
        console.log(date);
        // неправильно работает , надо исправить чтобы верно отображало заход солнца
        date.setTime(sunset);
        console.log(date);
        var sunset_date = `${date.getHours()} :  ${date.getMinutes()}: ${date.getSeconds()}`;
        this.setState({
          place: response.data.name,
          temperature: response.data.main.temp + "°С",
          pressure: response.data.main.pressure + "мм рт. ст.",
          sunset: sunset_date,
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
        <p>Заход солнца: {this.state.sunset}</p>
      </div>
    );
  }
}
