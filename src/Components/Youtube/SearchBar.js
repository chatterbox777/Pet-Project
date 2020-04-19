import React from "react";
import { Paper, TextField } from "@material-ui/core";

class SearchBar extends React.Component {
  state = {
    searchTerm: "",
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      ...this.state,
      searchTerm: event.target.value,
    });
  };

  handleSubmit = (e) => {
    const { searchTerm } = this.state;
    const { onFormSubmit } = this.props;
    onFormSubmit(searchTerm);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Paper elevation={6} style={{ padding: "25px" }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              label="Search.."
              onChange={this.handleChange}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

export default SearchBar;
