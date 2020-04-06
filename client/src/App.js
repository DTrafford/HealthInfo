import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
// TEST COMMENT
import LoginTabs from "./components/Auth/Login/LoginTabs";
import RegisterTabs from "./components/Auth/Register/RegisterTabs";
import Home from "./views/Home/Home";

import EmployeeLanding from "./views/LandingPages/EmployeeLanding";
import PatientLanding from "./views/LandingPages/PatientLanding";
import AddTip from "./views/Tips/AddTip";
import ViewTips from "./views/Tips/ViewTips";
import AddResults from "./views/Results/AddResults";
import ViewResults from "./views/Results/ViewResults";
import PatientList from "./views/Results/PatientList";
import Symptoms from "./views/Symptoms/Symptoms";
import DiscussionBoard from "./views/DiscussionBoard/DiscussionBoard";
import CreatePost from "./views/DiscussionBoard/CreatePost";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginTabs} />
            <Route exact path="/register" component={RegisterTabs} />
            <Route exact path="/employee" component={EmployeeLanding} />
            <Route exact path="/patient" component={PatientLanding} />
            <Route
              exact
              path="/patient/discussion_board"
              component={DiscussionBoard}
            />
            <Route
              exact
              path="/patient/discussion_board/create"
              component={CreatePost}
            />
            <Route exact path="/patient_list" component={PatientList} />
            <Route exact path="/add_tip" component={AddTip} />
            <Route exact path="/health_tips" component={ViewTips} />
            <Route exact path="/add_results" component={AddResults} />
            <Route exact path="/view_results" component={ViewResults} />
            <Route exact path="/symptoms" component={Symptoms} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
