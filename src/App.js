import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile/Profile";
import classTags from "../src/App.module.css";
import { connect } from "react-redux";
import * as axios from "axios";
import preloader from "./assets/loader.gif";
import Paginator from "./Components/Paginator";
import Login from "./Components/Login";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classTags.display}>
          <Navbar />
          <Route
            path="/profile/:userId"
            render={() => (
              <Profile
                users={this.props.users}
                isFetched={this.props.isFetched}
                isFetching={this.props.isFetching}
                addUser={this.props.addUser}
                getTotalUsersCount={this.props.getTotalUsersCount}
                setUserProfile={this.props.setUserProfile}
                profile={this.props.profile}
              />
            )}
          />
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
              <Users
                addUser={this.props.addUser}
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                addCurrentPage={this.props.addCurrentPage}
                getTotalUsersCount={this.props.getTotalUsersCount}
                isFetched={this.props.isFetched}
                isFetching={this.props.isFetching}
                followed={this.props.followed}
                follow={this.props.follow}
              />
            )}
          />
          <Login
            auth={this.props.auth}
            login={this.props.login}
            isAuth={this.props.isAuth}
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

class Chat extends React.Component {
  state = {
    text: "",
    id: "",
  };

  changeInputValue = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ text: value, id: Date.now().toString() });
  };

  handleSubmit = (e) => {
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
            {this.props.messages.map((item) => (
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
    isloaded: false,
  };

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.isFetched();
      console.log("Запрос еще не пошел");
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
        )
        .then((response) => {
          debugger;
          console.log("запрос пошел");
          this.props.addUser(response.data.items);
          debugger;
          console.log("получили юзеров");
          this.props.getTotalUsersCount(response.data.totalCount);
          console.log("получили тоталКаунт юзеров");
          this.props.isFetched();
        });
    }
  }

  changePage = (page) => {
    this.props.addCurrentPage(page);
    this.props.isFetched();
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`
      )
      .then((response) => {
        debugger;

        this.props.addUser(response.data.items);
        this.props.isFetched();
      });
  };

  followUser = (id) => {
    axios
      .post(
        `https://social-network.samuraijs.com/api/1.0/users/follow/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "API-KEY": "8d9bd45d-58a9-43ac-8b78-2c71c9e79611",
          },
        }
      )
      .then((response) => {
        debugger;
        if (response.data.resultCode == 1) {
          this.props.follow(response.data.resultCode);
        }
      });
  };

  render() {
    let defaultImg =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQI2jHcUJxjcFJbmDR2U_MAEcYsgPUmAdk7etV6wSh3P2m39X-c&usqp=CAU";
    return (
      <div>
        {this.props.isFetching ? <img src={preloader} /> : null}
        <Paginator
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          changePage={this.changePage}
          currentPage={this.props.currentPage}
          addCurrentPage={this.props.addCurrentPage}
          isFetched={this.props.isFetched}
          addUser={this.props.addUser}
          portionSize={10}
        />
        <ul>
          {this.props.users.map((user) => (
            <div>
              <NavLink
                className={classTags.flex_column}
                to={"/profile/" + user.id}
              >
                <li key={user.id}>{user.name}</li>
                <img
                  className={classTags.avatar}
                  src={
                    user.photos.small === null ? defaultImg : user.photos.small
                  }
                  alt="ava"
                />
              </NavLink>
              <button onClick={() => this.followUser(user.id)}>
                {this.props.followed === 1 ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.reducer.count,
    history: state.reducer.history,
    messages: state.chatReducer.messages,
    users: state.usersReducer.users,
    pageSize: state.usersReducer.pageSize,
    totalUsersCount: state.usersReducer.totalUsersCount,
    currentPage: state.usersReducer.currentPage,
    isFetching: state.usersReducer.isFetching,
    profile: state.profileReducer.profile,
    followed: state.usersReducer.followed,
    login: state.authReducer.login,
    isAuth: state.authReducer.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "INCREMENT", value: 1 }),
    decrement: () => dispatch({ type: "DECREMENT", value: 1 }),
    onDeleteItem: (id) => dispatch({ type: "DELETE_ITEM", key: id }),
    addMessage: (value) => dispatch({ type: "ADD_MESSAGE", value: value }),
    deleteMessage: (id) => dispatch({ type: "DELETE_MESSAGE", key: id }),
    deleteHistory: () => dispatch({ type: "DELETE_HISTORY" }),
    addUser: (person) => dispatch({ type: "ADD_USER", person: person }),
    addCurrentPage: (pageNum) =>
      dispatch({ type: "ADD_CURRENT_PAGE", page: pageNum }),
    getTotalUsersCount: (totalCount) =>
      dispatch({ type: "GET_TOTAL_USERS_COUNT", totalCount: totalCount }),
    isFetched: () => dispatch({ type: "FETCHING" }),
    setUserProfile: (profile) =>
      dispatch({ type: "SET_PROFILE", profile: profile }),
    follow: (result) => dispatch({ type: "FOLLOWING", result: result }),
    auth: (data, auth) =>
      dispatch({ type: "AUTHORIZE", data: data, auth: auth }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
