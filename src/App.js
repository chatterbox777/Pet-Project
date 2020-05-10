import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile/Profile";
import classTags from "../src/App.module.css";
import { connect } from "react-redux";
import Login from "./Components/Login/Login";
import Form from "./Components/Counter/Form";
import Chat from "./Components/Chat/Chat";
import Users from "./Components/Users/Users";
import Youtube from "./Components/Youtube/Youtube";
import Shop from "./Components/Basket/Shop";
import InBasket from "./Components/Basket/InBasket";
import { Weather } from "./Components/Weather/Weather";

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
          <Route path="/Youtube" render={() => <Youtube />} />
          <Route
            path="/Shop"
            render={() => (
              <Shop
                items={this.props.basketItems}
                onButtonBasket={this.props.addItemToBasket}
                sortPriceAsc={this.props.sortPriceAsc}
                sortPriceDesc={this.props.sortPriceDesc}
              />
            )}
          />
          <Route
            path="/InBasket"
            render={() => (
              <InBasket
                items={this.props.basketItems}
                onButtonBasket={this.props.addItemToBasket}
              />
            )}
          />
          <Route path="/Weather" render={() => <Weather />} />

          <Login
            auth={this.props.auth}
            login={this.props.login}
            isAuth={this.props.isAuth}
            id={this.props.id}
            photo={this.props.photo}
            loginPhoto={this.props.loginPhoto}
            isFetchingAuth={this.props.isFetchingAuth}
            fetchAuth={this.props.fetchAuth}
            incorrect={this.props.incorrect}
            checkIncorrect={this.props.checkIncorrect}
          />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.mainReducer.count,
    history: state.mainReducer.history,
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
    id: state.authReducer.id,
    photo: state.authReducer.photo,
    basketItems: state.basketReducer.basketItems,
    isFetchingAuth: state.authReducer.isFetching,
    incorrect: state.authReducer.incorrect,
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
    loginPhoto: (photo) => dispatch({ type: "LOGIN_PHOTO", photo: photo }),
    addItemToBasket: (e, id) =>
      dispatch({ type: "ADD_BASKET", e: e.persist(), id: id }),
    sortPriceAsc: () => dispatch({ type: "SORT_PRICE_ASC" }),
    sortPriceDesc: () => dispatch({ type: "SORT_PRICE_DESC" }),
    fetchAuth: (boolean) => dispatch({ type: "FETCHING_AUTH", fetch: boolean }),
    checkIncorrect: (incorrect) =>
      dispatch({ type: "INCORRECT_PASS_OR_EMAIL", incorrect: incorrect }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
