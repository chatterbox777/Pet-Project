import React from "react";
import { NavLink } from "react-router-dom";
import * as axios from "axios";
import ava from "../assets/Din.jpg";
import classTags from "./Login.module.css";

class Login extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        debugger;
        if (response.data.resultCode === 0) {
          this.props.auth(response.data.data);
        }
      });
  }
  sendLoginPhoto() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/` + this.props.id
      )
      .then((response) => {
        debugger;
        this.props.loginPhoto(response.data.photos.small);
      });
  }

  render() {
    return (
      <div className={classTags.disp}>
        <NavLink to="/login">
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
      </div>
    );
  }
}

export default Login;
