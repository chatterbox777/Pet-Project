import React from "react";
import classTags from "../Music/PlayButton.module.css";
import AudioPlayer from "react-modular-audio-player";
import Uhozu from "./Uhozu.mp3";

let playlist = [
  { src: { Uhozu }, title: "Song", artist: "Singer" },
  { src: { Uhozu }, title: "Another Song", artist: "Another Singer" }
];

class PlayButton extends React.Component {
  state = {};
  render() {
    return <AudioPlayer audioFiles={playlist} />;
  }
}

export default PlayButton;
