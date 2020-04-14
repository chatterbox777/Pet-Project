import React from "react";
import { NavLink, BrowserRouter, Route } from "react-router-dom";
import * as axios from "axios";
import ava from "../assets/Din.jpg";
import classTags from "./Login.module.css";
import LoginReduxForm from "./LoginForm";

class Login extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        debugger;
        if (response.data.resultCode === 0) {
          this.props.auth(response.data.data, true);
        }
      });
  }
  sendLoginPhoto() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/` + this.props.id
      )
      .then((response) => {
        this.props.loginPhoto(response.data.photos.small);
      });
  }

  render() {
    const onSubmit = (formData) => {
      console.log(formData);
      axios
        .post(`https://social-network.samuraijs.com/api/1.0/auth/login`, {
          email: formData.login,
          password: formData.password,
        })
        .then((response) => {
          debugger;
          console.log(response);
          if (response.data.resultCode === 0) {
            axios
              .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true,
              })
              .then((response) => {
                debugger;
                if (response.data.resultCode === 0) {
                  this.props.auth(response.data.data, true);
                }
              });
          }
          return null;
        });
    };
    debugger;

    return (
      <BrowserRouter>
        <div className={classTags.disp}>
          <NavLink to="/Login">
            {!this.props.login ? "Login" : this.props.login}
          </NavLink>
          {this.props.login ? (
            <button onClick={() => this.sendLoginPhoto()}>Получить фото</button>
          ) : null}

          {this.props.login ? (
            <img
              className={classTags.defaultImg}
              src={!this.props.photo ? ava : this.props.photo}
              alt="avatar"
            />
          ) : null}
          {this.props.login ? (
            <form>
              {" "}
              <button>{this.props.isAuth ? "Log out" : ""}</button>
            </form>
          ) : null}
          <div>
            {!this.props.isAuth ? (
              <Route
                path="/Login"
                render={() => (
                  <LoginReduxForm
                    auth={this.props.auth}
                    login={this.props.login}
                    isAuth={this.props.isAuth}
                    id={this.props.id}
                    photo={this.props.photo}
                    loginPhoto={this.props.loginPhoto}
                    onSubmit={onSubmit}
                  />
                )}
              />
            ) : null}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Login;
