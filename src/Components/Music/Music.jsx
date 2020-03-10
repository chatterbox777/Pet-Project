import React from "react";
import PlayButton from "./PlayButton";
class Music extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        {items.map(item => (
          <li key={item.id}>
            <span>
              {" "}
              #{item.id} {""}
              {item.songName} - {item.artist}{" "}
            </span>
            <PlayButton />
          </li>
        ))}
      </div>
    );
  }
}

export default Music;
