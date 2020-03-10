import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile/Profile";
import classTags from "../src/App.module.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className={classTags.display}>
        <Navbar />
        <Route path="/Profile" render={() => <Profile />} />
      </div>
    </BrowserRouter>
  );
};

export default App;
