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

class EmployeeLanding extends Component {
  state = {
    firstName: "David",
    lastName: "Trafford",
    designation: 'MD',
    title: ''
  };

  componentDidMount = () => {
    this.props.getTips();
  }
  render() {
    return (
      <div className='landingContainer'>
        <h1>
          Welcome - {this.props.user.firstName} {this.props.user.lastName} ({this.props.user.designation})
        </h1>
        <hr/>
        <ul>
          <li>
            <Link to={"/add_tip"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type='button' class='landingLinkButton'>
                ADD HEALTH TIP
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
          <li>
            <Link to={"/patient_list"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type='button' class='landingLinkButton'>
                PATIENT LIST
              </button>
            </Link>
          </li>
          {/* <li>
            <Link to={"/update_patient"} style={{ marginLeft: "auto" }}>
              <button onClick={""} type='button' class='landingLinkButton'>
                UPDATE INFO
              </button>
            </Link>
          </li> */}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    patientList: state.patientList
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
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLanding);
