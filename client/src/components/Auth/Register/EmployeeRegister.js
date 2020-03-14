import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../../UI/Buttons/PrimaryButton';
import './Register.css';
import {connect} from 'react-redux';
import UserStore from "../../../store/user/UserStore";
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

const designations = [
  {
    value: 'MD',
    label: "Physician",
  },
  {
    value: 'RPN',
    label: 'Registered Practical Nurse',
  },
  {
    value: 'RN',
    label: 'Registered Nurse',
  },
];

class EmployeeRegister extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    designation: null
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
  onDesignationChange = event => {
    this.setState({
      designation: event.target.value,
    });
  };

  onSubmit = event => {
      const newEmployee = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        designation: this.state.designation,
        userType: 'EM'
      }
      this.props.employeeRegister(newEmployee);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <h1 className="registerTitle">Health Practioner Registration</h1>
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
          id="outlined-select-designation"
          select
          label="Professional Designation"
          className={classes.textField}
          value={this.state.designation}
          onChange={(e) => this.onDesignationChange(e)}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your professional designation"
          margin="normal"
          variant="outlined"
          fullWidth
        >
          {designations.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* <PrimaryButton onClick={this.onSubmit} displayText="Submit"/> */}
        <Link to={'/login'} style={{marginLeft: 'auto'}}>
        <button onClick={this.onSubmit} type="button" class="submitButton">SUBMIT</button>
        </Link>
      </form>
      </div>
    );
  }
}

EmployeeRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    employeeRegister: employee => {
      dispatch(UserStore.employeeRegister(employee));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployeeRegister));