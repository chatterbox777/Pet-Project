import React from "react";
import * as axios from "axios";
import preloader from "../../assets/loader.gif";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends React.Component {
  state = {};

  componentDidMount() {
    let userId = this.props.match.params.userId;
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then(response => {
        console.log("запрос пошел");
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    if (!this.props.profile) {
      return (
        <div>
          <img src={preloader} />
        </div>
      );
    }

    return (
      <div>
        <p>{this.props.profile.aboutMe}</p>
        <img src={this.props.profile.photos.large} />
        <p>VK: {this.props.profile.contacts.vk}</p>
        <p>GITHUB: {this.props.profile.contacts.github}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profileReducer.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserProfile: profile =>
      dispatch({ type: "SET_PROFILE", profile: profile })
  };
};

let urlDataContainerComponent = withRouter(Profile);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(urlDataContainerComponent);
