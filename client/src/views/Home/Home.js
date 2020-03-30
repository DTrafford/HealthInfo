import React, { Component } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";

class Home extends Component {
  render() {
    return (
      <div className="HomePage">
        <img
          src={require("../../assets/img/red_cross.jpg")}
          alt="red cross"
          className="logoImage"
        />
        <h1 className="App_H1">KOBE CLINIC</h1>
        <h1 className="App_H1">Take Control Of Your Health</h1>
      </div>
    );
  }
}

export default Home;
