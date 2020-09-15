import React from "react";
import "./LiveSearch.css";
import * as axios from "axios";
class LiveSearch extends React.Component {
  state = {
    users: [],
    targetValue: "",
  };

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    console.log(e.target.value);
    this.setState(() => {
      return { targetValue: value };
    });

    if (this.state.targetValue.length > 0) {
      this.setState(() => {
        let newUsers = this.state.users.filter((el) => {
          return el.name.match(this.state.targetValue);
        });
        console.log(newUsers);
        return { users: newUsers };
      });
    }
    if (this.state.targetValue === "") {
      axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?count=20`)
        .then((response) => {
          console.log(response);
          this.setState(() => {
            return { users: response.data.items };
          });
        });
    }
    console.log(this.state.users);
  }

  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?count=20`)
      .then((response) => {
        console.log(response);
        this.setState(() => {
          return { users: response.data.items };
        });
      });
  }
  render() {
    return (
      <div className="searcher-container">
        <p>Живой Поиск</p>
        <input
          onChange={(e) => this.handleChange(e)}
          type="text"
          placeholder="Введите значение"
        />
        <div>
          <ul>
            {this.state.users.map((el, index) => {
              return <li key={index}>{el.name}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default LiveSearch;
