import React from "react";
import * as axios from "axios";
import preloader from "../../assets/loader.gif";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import defImgAvatar from "../../assets/Din.jpg";
import classTags from "./Profile.module.css";

class Profile extends React.Component {
  state = {};

  componentDidMount() {
    let userId = this.props.match.params.userId;
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then((response) => {
        debugger;
        console.log("запрос пошел");
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    if (!this.props.profile) {
      return (
        <div>
          <img src={preloader} alt="preloader" />
        </div>
      );
    }

    return (
      <div>
        <p className={classTags.name}>
          <i>{this.props.profile.fullName}</i>
        </p>
        <p>{this.props.profile.aboutMe}</p>
        <img
          src={
            !this.props.profile.photos.large
              ? defImgAvatar
              : this.props.profile.photos.large
          }
          alt="avatar_large"
        />
        <p>
          VK:{" "}
          {!this.props.profile.contacts.vk
            ? "Отсутствует"
            : this.props.profile.contacts.vk}
        </p>
        <p>
          GITHUB:{" "}
          {!this.props.profile.contacts.github
            ? "Отсутствует"
            : this.props.profile.contacts.github}
        </p>
        <span
          className={
            this.props.profile.lookingForAJob
              ? classTags.lookForJob
              : classTags.notLookForJob
          }
        >
          {this.props.profile.lookingForAJob
            ? "В поисках работы"
            : "Работу не ищет"}{" "}
        </span>
        <p>
          Заметки к поиску работы:{" "}
          {!this.props.profile.lookingForAJobDescription
            ? "---"
            : this.props.profile.lookingForAJobDescription}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserProfile: (profile) =>
      dispatch({ type: "SET_PROFILE", profile: profile }),
  };
};

let urlDataContainerComponent = withRouter(Profile);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(urlDataContainerComponent);
