import React from "react";
import classTags from "./Youtube.module.css";
import { Grid } from "@material-ui/core";
import youtube from "../../api/youtube";
import { SearchBar, VideoDetail, VideoList } from "./export";

class Youtube extends React.Component {
  state = {
    videos: [],
    selectedVideo: "",
  };
  componentDidMount() {
    this.handleSubmit("JavaScript");
  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyDHFe4cXT7psm-CE0GPwB7Ey3hdjuEaQWk",
        q: searchTerm,
      },
    });
    console.log(response.data.items);
    console.log(response.data.items[0]);
    this.setState({
      ...this.state,
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({
      ...this.state,
      selectedVideo: video,
    });
  };

  render() {
    const { selectedVideo, videos } = this.state;
    return (
      <div className={classTags.disp}>
        <Grid justify="center" container spacing={10}>
          <Grid item xs={11}>
            <Grid container spacing={10}>
              <Grid item xs={12}>
                <SearchBar onFormSubmit={this.handleSubmit} />
              </Grid>
              <Grid item xs={8}>
                <VideoDetail video={selectedVideo} />
              </Grid>
              <Grid item xs={4}>
                <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Youtube;
