import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import UserStore from "../../../store/user/UserStore";
import './Register.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class PatientRegister extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    doctorName: null
  }

  onEmailChange = event => {
    this.setState({
      email: event.target.value,
    });
  };
  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
    });
  };
  onFirstNameChange = event => {
    this.setState({
      firstName: event.target.value,
    });
  };
  onLastNameChange = event => {
    this.setState({
      lastName: event.target.value,
    });
  };
  onDoctorNameChange = event => {
    this.setState({
      doctorName: event.target.value,
    });
  };

  onSubmit = event => {
      const newPatient = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        doctorName: this.state.doctorName,
        userType: 'PT'
      }
      this.props.patientRegister(newPatient);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <h1 className="registerTitle">Patient Registration</h1>
      <hr/>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          fullWidth   
          onChange={(e) => this.onEmailChange(e)}   
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={(e) => this.onPasswordChange(e)}  
        />
         <TextField
          id="outlined-firstName-input"
          label="First Name"
          className={classes.textField}
          type="text"
          name="firstName"
          autoComplete="name"
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={(e) => this.onFirstNameChange(e)}  
        />
         <TextField
          id="outlined-lastName-input"
          label="Last Name"
          className={classes.textField}
          type="text"
          name="lastName"
          autoComplete="name"
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={(e) => this.onLastNameChange(e)}  
        />
         <TextField
          id="outlined-doctorName-input"
          label="Doctor's Name"
          className={classes.textField}
          type="text"
          name="doctorName"
        //   autoComplete="name"
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={(e) => this.onDoctorNameChange(e)}  
        />
        <Link to={'/login'} style={{marginLeft: 'auto'}}>
        <button onClick={this.onSubmit} type="button" class="submitButton">SUBMIT</button>
        </Link>
      </form>
      </div>
    );
  }
}

PatientRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    patientRegister: patient => {
      dispatch(UserStore.patientRegister(patient));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientRegister));