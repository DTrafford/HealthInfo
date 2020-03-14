import React, { Component } from "react";
import "./Results.css";
import {connect} from 'react-redux';
import UserStore from "../../store/user/UserStore";
import PaperSheet from "../../components/UI/Paper";
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class PatientList extends Component {
  componentDidMount() {
    // this.props.getPatients();
  }

  render() {
    return (
      <PaperSheet>
        <div className='ViewResultsContainer'>
          <table className="patientTable">
            <tr>
              <td className="patientName_Header">Patient Name</td>
              <td></td>
              <td></td>
            </tr>
            {this.props.patients.map(patient => (
              <tr>
                <td>{patient.firstName} {patient.lastName}</td>
                <td>
                <Link to={{pathname: "/view_results", state: { patientId: patient._id, firstName: patient.firstName, lastName: patient.lastName, }}} className="patientListButton">
                <Button variant="contained" color="primary" className="patientListButton">View Results</Button>
                </Link>
                </td>
                <td>
                <Link to={{pathname: "/add_results", state: { patientId: patient._id, firstName: patient.firstName, lastName: patient.lastName, doctorName: patient.doctorName }}} className="patientListButton">
                <Button variant="contained" color="primary" className="patientListButton">Add Results</Button>
                </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </PaperSheet>
    );
  }
}

const mapStateToProps = state => {
  return {
    patients: state.patientList
    // patients: [
    //   { id: 1, firstName: "David", lastName: "Trafford" },
    //   { id: 2, firstName: "Daniel", lastName: "Stokes" },
    //   { id: 3, firstName: "Devin", lastName: "Young" },
    //   { id: 4, firstName: "James", lastName: "Chli" }
    // ]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPatients: () => {
      dispatch(UserStore.getPatients());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientList);
