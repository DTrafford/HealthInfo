import React, { Component } from "react";
import "./Landing.css";
import { connect } from "react-redux";
import UserStore from "../../store/user/UserStore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

class PatientLanding extends Component {
  state = {
    firstName: "David",
    lastName: "Trafford",
  };

  componentDidMount = () => {
    this.props.getTips();
    this.props.getPosts();
  };

  render() {
    return (
      <div className="landingContainer">
        <h1>
          Welcome {this.props.user.firstName} {this.props.user.lastName}
        </h1>
        <ul>
          <li>
            <Link to={"/symptoms"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type="button" className="landingLinkButton">
                SYMPTOM CHECKER
              </button>
            </Link>
          </li>
          <li>
            <Link to={"/health_tips"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type="button" class="landingLinkButton">
                HEALTH TIPS
              </button>
            </Link>
          </li>
          <li>
            <Link
              to={"/patient/discussion_board"}
              style={{ marginLeft: "auto" }}
            >
              <button onClick={""} type="button" class="landingLinkButton">
                DISCUSSION BOARD
              </button>
            </Link>
          </li>
          <li>
            <a href="mailto:emergencysuppoert@example.com?subject=Please Help&body=I am in need of assistance">
              <button onClick={""} type="button" class="landingLinkButton">
                CONTACT EMERGENCY SERVICES
              </button>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    patientLogIn: (patient) => {
      dispatch(UserStore.patientLogIn(patient));
    },
    getTips: () => {
      dispatch(UserStore.getTips());
    },
    getPosts: () => {
      dispatch(UserStore.getPosts());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientLanding);
