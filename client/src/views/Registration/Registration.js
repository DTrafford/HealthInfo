import React, { Component } from "react";
import "./Registration.css";
import Header from "../../components/Header/Header";
import RegisterTabs from "../../components/Auth/Register/RegisterTabs";

class Registration extends Component {
  render() {
    return (
      <div className="App">
        <RegisterTabs />
      </div>
    );
  }
}

export default Registration;
