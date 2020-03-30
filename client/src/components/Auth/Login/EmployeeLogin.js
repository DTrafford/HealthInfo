import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import "./Login.css";
import PaperSheet from "../../UI/Paper";
import { connect } from "react-redux";
import UserStore from "../../../store/user/UserStore";

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

class EmployeeLogin extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  onPasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  onSubmit = event => {
    const employee = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.employeeLogIn(employee);
  };

  render() {
    const { classes } = this.props;

    return (
      <PaperSheet className="logInFormCard">
        <div className="loginContainer">
          <h1 className="loginTitle">Employee Log In</h1>
          <hr />
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
              onChange={e => this.onEmailChange(e)}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={e => this.onPasswordChange(e)}
            />
            <button onClick={this.onSubmit} type="button" class="submitButton">
              SUBMIT
            </button>
          </form>
        </div>
      </PaperSheet>
    );
  }
}

EmployeeLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    employeeLogIn: employee => {
      dispatch(UserStore.employeeLogIn(employee));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EmployeeLogin));
