import React from "react";
import { NavLink, BrowserRouter, Route } from "react-router-dom";
import * as axios from "axios";
import ava from "../../assets/Din.jpg";
import classTags from "./Login.module.css";
import LoginReduxForm from "./LoginForm";
import preloader from "../../assets/loader.gif";

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

  logOut(e) {
    e.preventDefault();
    this.props.fetchAuth(true);
    axios
      .delete(`https://social-network.samuraijs.com/api/1.0/auth/login`, {
        withCredentials: true,
        headers: {
          "API-KEY": "8d9bd45d-58a9-43ac-8b78-2c71c9e79611",
        },
      })
      .then((response) => {
        debugger;
        if (response.data.resultCode === 0) {
          this.props.auth("", false);
        }
        this.props.fetchAuth(false);
        return "";
      });
  }

  render() {
    const onSubmit = (formData) => {
      console.log(formData);
      this.props.fetchAuth(true);
      axios
        .post(
          `https://social-network.samuraijs.com/api/1.0/auth/login`,
          {
            email: formData.login,
            password: formData.password,
          },
          {
            withCredentials: true,
            headers: {
              "API-KEY": "8d9bd45d-58a9-43ac-8b78-2c71c9e79611",
            },
          }
        )
        .then((response) => {
          debugger;
          console.log(response);
          if (response.data.resultCode === 0) {
            debugger;
            axios
              .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true,
                headers: {
                  "API-KEY": "8d9bd45d-58a9-43ac-8b78-2c71c9e79611",
                },
              })
              .then((response) => {
                debugger;
                if (response.data.resultCode === 0) {
                  this.props.auth(response.data.data, true);
                }

                this.props.fetchAuth(false);
              });
          } else if (response.data.resultCode === 10) {
            this.props.checkIncorrect(response.data.messages[0]);
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
            <button onClick={(e) => this.logOut(e)}>
              {this.props.isAuth ? "Log out" : ""}
            </button>
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
                    isFetchingAuth={this.props.isFetchingAuth}
                    incorrect={this.props.incorrect}
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
