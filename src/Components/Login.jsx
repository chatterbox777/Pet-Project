import React from "react";
import { NavLink } from "react-router-dom";
import * as axios from "axios";

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
  render() {
    return (
      <div>
        <NavLink to="/login">
          {!this.props.login ? "Login" : this.props.login}
        </NavLink>
      </div>
    );
  }
}

export default Login;
