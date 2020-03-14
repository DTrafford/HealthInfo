import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./Results.css";
import {connect} from 'react-redux';
import UserStore from "../../store/user/UserStore";
import PaperSheet from "../../components/UI/Paper";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class AddResults extends React.Component {
  state = {
    id: null,
    firstName: "",
    lastName: "",
    doctorName: null,
    heartRate: "",
    bloodPressure: "",
    bodyWeight: ""
  };

  componentDidMount = () => [
    this.props.location.state ?
    this.setState({
      id: this.props.location.state.patientId,
      firstName: this.props.location.state.firstName,
      lastName: this.props.location.state.lastName,
      doctorName: this.props.location.state.doctorName,
    }) : null
  ]

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  onFirstNameChange = event => {
    this.setState({
      firstName: event.target.value
    });
  };
  onLastNameChange = event => {
    this.setState({
      lastName: event.target.value
    });
  };
  onDoctorNameChange = event => {
    this.setState({
      doctorName: event.target.value
    });
  };
  onHeartRateChange = event => {
    this.setState({
      heartRate: event.target.value
    });
  };
  onBloodPressureChange = event => {
    this.setState({
      bloodPressure: event.target.value
    });
  };
  onBodyWeightChange = event => {
    this.setState({
      bodyWeight: event.target.value
    });
  };

  onSubmit = event => {
    const newResults = [
      {label: "Heart Rate", value: this.state.heartRate},
      {label: "Blood Pressure", value: this.state.bloodPressure},
      {label: "Body Weight", value:this.state.bodyWeight}
    ];
    this.props.addResults(this.state.id, newResults)
  };

  render() {
    const { classes } = this.props;

    return (
      <PaperSheet>
        <div>
          <h1 className='resultsTitle'>Add New Results</h1>
          <hr />
          <form className={classes.container} noValidate autoComplete='off'>
            <TextField
              id='outlined-firstName-input'
              label='First Name'
              className={classes.textField}
              type='text'
              name='firstName'
              autoComplete='name'
              margin='normal'
              variant='outlined'
              fullWidth
              value={this.state.firstName}
              onChange={e => this.onFirstNameChange(e)}
            />
            <TextField
              id='outlined-lastName-input'
              label='Last Name'
              className={classes.textField}
              type='text'
              name='lastName'
              autoComplete='name'
              margin='normal'
              variant='outlined'
              fullWidth
              value={this.state.lastName}
              onChange={e => this.onLastNameChange(e)}
            />
            <TextField
              id='outlined-doctorName-input'
              label="Doctor's Name"
              className={classes.textField}
              type='text'
              name='doctorName'
              autoComplete="name"
              margin='normal'
              variant='outlined'
              fullWidth
              // value={this.state.doctorName}
              onChange={e => this.onDoctorNameChange(e)}
            />
            <TextField
              id='outlined-heartRate-input'
              label='Heart Rate'
              className={classes.textField}
              type='text'
              name='heartRate'
              margin='normal'
              variant='outlined'
              fullWidth
              onChange={e => this.onHeartRateChange(e)}
            />
            <TextField
              id='outlined-bloodPressure-input'
              label='Blood Pressure'
              className={classes.textField}
              type='text'
              name='bloodPressure'
              margin='normal'
              variant='outlined'
              fullWidth
              onChange={e => this.onBloodPressureChange(e)}
            />
            <TextField
              id='outlined-bodyWeight-input'
              label='Body Weights'
              className={classes.textField}
              type='text'
              name='bodyWeight'
              margin='normal'
              variant='outlined'
              fullWidth
              onChange={e => this.onBodyWeightChange(e)}
            />
              <button
                onClick={this.onSubmit}
                type='button'
                class='submitButton'>
                SUBMIT
              </button>
          </form>
        </div>
      </PaperSheet>
    );
  }
}

AddResults.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    userType: state.userType,
    shouldRedirect: state.shouldRedirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addResults: (id, results) => {
      dispatch(UserStore.addResults(id, results));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddResults));
