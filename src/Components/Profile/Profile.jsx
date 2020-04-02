import React from "react";
import * as axios from "axios";
class Profile extends React.Component {
  state = {};

  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then(response => {
        debugger;
        console.log("запрос пошел");
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    return (
      <div>
        <p>{this.props.profile.aboutMe}</p>
      </div>
    );
  }
}

export default Profile;
