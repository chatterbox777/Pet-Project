import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile/Profile";
import classTags from "../src/App.module.css";
import { connect } from "react-redux";
import { actions } from "../src/store/chat-reducer";

class App extends React.Component {
  // increment = () => {
  //   this.setState({
  //     ...this.state,
  //     count: this.state.count + 1
  //   });
  // };
  // decrement = () => {
  //   this.setState({
  //     ...this.state,
  //     count: this.state.count - 1
  //   });
  // };

  render() {
    return (
      <BrowserRouter>
        <div className={classTags.display}>
          <Navbar />
          <Route path="/Profile" render={() => <Profile />} />
          <Route
            path="/Counter"
            render={() => (
              <Form
                counter={this.props.count}
                increment={this.props.increment}
                decrement={this.props.decrement}
                history={this.props.history}
                onDeleteItem={this.props.onDeleteItem}
              />
            )}
          />
          <Route
            path="/Chat"
            render={() => (
              <Chat
                addMessage={this.props.addMessage}
                messages={this.props.messages}
              />
            )}
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

        <div>History</div>
        <div>
          <ul>
            {this.props.history.map(el => (
              <li key={el.id} onClick={() => this.props.onDeleteItem(el.id)}>
                {el.count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class Chat extends React.Component {
  state = {
    text: "",
    id: ""
  };

  changeInputValue = e => {
    const {
      target: { value }
    } = e;
    this.setState({ text: value, id: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addMessage(this.state);
  };

  render() {
    return (
      <div className={classTags.disp}>
        <div className={classTags.window}>
          <ul>
            {this.props.messages.map(item => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className={classTags.inputText}
            type="text"
            placeholder="Введите сообщение"
            onChange={this.changeInputValue}
          />
          <button>Отправить</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.reducer.count,
    history: state.reducer.history,
    messages: state.chatReducer.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: "INCREMENT", value: 1 }),
    decrement: () => dispatch({ type: "DECREMENT", value: 1 }),
    onDeleteItem: id => dispatch({ type: "DELETE_ITEM", key: id }),
    addMessage: value => dispatch(actions.addMessage(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
