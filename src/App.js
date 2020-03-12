import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile/Profile";
import classTags from "../src/App.module.css";
import Music from "./Components/Music/Music";

class App extends React.Component {
  state = {
    items: [
      {
        id: 1,
        songName: "Ухожу",
        artist: "Ани Лорак, Миша Марвин",
        isOn: false
      },
      { id: 2, songName: "Светофоры", artist: "Леша Свик", isOn: false },
      { id: 3, songName: "Da Da Da", artist: "Tanir, Tyomcha", isOn: false },
      { id: 4, songName: "Чужая", artist: "Артур Пирожков", isOn: false }
    ],
    count: 0
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <BrowserRouter>
        <div className={classTags.display}>
          <Navbar />
          <Route path="/Profile" render={() => <Profile />} />
          <Route
            path="/Music"
            render={() => <Music items={this.state.items} />}
          />
          <Form
            counter={this.state.count}
            increment={this.increment}
            decrement={this.decrement}
          />
        </div>
      </BrowserRouter>
    );
  }
}

class Form extends React.Component {
  render() {
    return (
      <div>
        <div className="form">{this.props.counter}</div>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.decrement}>-</button>
      </div>
    );
  }
}

export default App;
