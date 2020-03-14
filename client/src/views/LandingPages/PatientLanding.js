import React, { Component } from "react";
import "./Landing.css";
import {connect} from 'react-redux';
import UserStore from "../../store/user/UserStore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class PatientLanding extends Component {
  state = {
    firstName: "David",
    lastName: "Trafford"
  };

  componentDidMount = () => {
    this.props.getTips();
  }

  render() {
    return (
      <div className='landingContainer'>
        <h1>
          Welcome {this.props.user.firstName} {this.props.user.lastName}
          {/* Welcome {this.state.firstName} {this.state.lastName} */}
        </h1>
        <ul>
          <li>
            <Link to={"/symptoms"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type='button' class='landingLinkButton'>
                SYMPTOM CHECKER
              </button>
            </Link>
          </li>
          <li>
            <Link to={"/health_tips"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type='button' class='landingLinkButton'>
                HEALTH TIPS
              </button>
            </Link>
          </li>
          {/* <li>
            <Link to={"/update_info"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type='button' class='landingLinkButton'>
                UPDATE INFO
              </button>
            </Link>
          </li> */}
          <li>
            <a href='mailto:emergencysuppoert@example.com?subject=Please Help&body=I am in need of assistance'>
              <button onClick={""} type='button' class='landingLinkButton'>
                CONTACT EMERGENCY SERVICES
              </button>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    patientLogIn: patient => {
      dispatch(UserStore.patientLogIn(patient));
    },
    getTips: () => {
      dispatch(UserStore.getTips());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientLanding);
