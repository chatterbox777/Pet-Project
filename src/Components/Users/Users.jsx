import React from "react";
import classTags from "../../App.module.css";
import preloader from "../../assets/loader.gif";
import * as axios from "axios";
import Paginator from "../../Components/Paginator";
import { NavLink } from "react-router-dom";

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
        if (response.data.resultCode === 1) {
          this.props.follow(response.data.resultCode);
        }
      });
  };

  render() {
    let defaultImg =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQI2jHcUJxjcFJbmDR2U_MAEcYsgPUmAdk7etV6wSh3P2m39X-c&usqp=CAU";

    return (
      <div>
        {this.props.isFetching ? (
          <img src={preloader} alt={"preloader"} />
        ) : null}
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

export default Users;
