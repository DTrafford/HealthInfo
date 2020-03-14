import React, { Component } from "react";
import "./Results.css";
import { connect } from "react-redux";
import UserStore from "../../store/user/UserStore";
import PaperSheet from "../../components/UI/Paper";
import SimpleExpansionPanel from "../../components/UI/ExpansionPanel";

class ViewResults extends Component {
  componentWillMount = () => {
    if (this.props.location.state) {
      this.props.getPatient(this.props.location.state.patientId);
    }
  };
  componentDidMount = () => {
    if (this.props.location.state) {
    }
  };
  componentWillUpdate() {
  }
  render() {
    return (
      <PaperSheet>
        {this.props.patient_stats ? (
          <React.Fragment>
            <h3>
              {this.props.location.state.firstName}{" "}
              {this.props.location.state.lastName} Results
            </h3>
            <div className='ViewResultsContainer'>
              {this.props.location.state ? (
                this.props.patient_stats.map(result => (
                  <SimpleExpansionPanel
                    title={result.label}
                    value={result.value}
                    className='resultPanel'
                  />
                ))
              ) : (
                <h2>No Previous Results</h2>
              )}
            </div>
          </React.Fragment>
        ) : null}
      </PaperSheet>
    );
  }
}

const mapStateToProps = state => {
  return {
    patients: state.patientList,
    patient_stats: state.loadedResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPatient: (id, results) => {
      dispatch(UserStore.getPatient(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewResults);
