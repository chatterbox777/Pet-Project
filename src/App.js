import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile/Profile";
import classTags from "../src/App.module.css";
import { connect } from "react-redux";
import * as axios from "axios";

class App extends React.Component {
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
                deleteHistory={this.props.deleteHistory}
              />
            )}
          />
          <Route
            path="/Chat"
            render={() => (
              <Chat
                addMessage={this.props.addMessage}
                messages={this.props.messages}
                deleteMessage={this.props.deleteMessage}
              />
            )}
          />
          <Route
            path="/Users"
            render={() => (
              <Users addUser={this.props.addUser} users={this.props.users} />
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
            {this.props.history.map(el => (
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

class Chat extends React.Component {
  state = {
    text: "",
    id: ""
  };

  changeInputValue = e => {
    const {
      target: { value }
    } = e;
    this.setState({ text: value, id: Date.now().toString() });
  };

  handleSubmit = e => {
    console.log(e.target.closest("input"));
    e.preventDefault();
    if (!this.state.text.trim()) {
      return;
    }
    this.props.addMessage(this.state);
  };

  render() {
    return (
      <div className={classTags.disp}>
        <div className={classTags.window}>
          <ul>
            {this.props.messages.map(item => (
              <li key={item.id}>
                {item.text}
                <span onClick={() => this.props.deleteMessage(item.id)}>X</span>
              </li>
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

class Users extends React.Component {
  state = {
    isloaded: false
  };

  componentDidMount() {
    if (this.props.users.length === 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then(response => {
          debugger;

          this.props.addUser(response.data.items);
        });
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.reducer.count,
    history: state.reducer.history,
    messages: state.chatReducer.messages,
    users: state.usersReducer.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: "INCREMENT", value: 1 }),
    decrement: () => dispatch({ type: "DECREMENT", value: 1 }),
    onDeleteItem: id => dispatch({ type: "DELETE_ITEM", key: id }),
    addMessage: value => dispatch({ type: "ADD_MESSAGE", value: value }),
    deleteMessage: id => dispatch({ type: "DELETE_MESSAGE", key: id }),
    deleteHistory: () => dispatch({ type: "DELETE_HISTORY" }),
    addUser: person => dispatch({ type: "ADD_USER", person: person })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
