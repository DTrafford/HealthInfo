import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import UserStore from "../../store/user/UserStore";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Header.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'red'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      userType: ''
    }
  }

  // componentDidUpdate() {
  //   console.log('HEADER STATE', this.props.isAuthenticated);
  // }

  onLogOut = () => {
    this.props.logOut();
  }
  render() {
  const { classes, theme } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to={'/'} style={{width: '40px'}}>
            <img src={require('../../assets/img/red_cross.jpg')} alt="red cross" className="headerLogo"/>
            </Link>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            KOBE CLINIC
          </Typography>
            {!this.props.isAuthenticated ? (<React.Fragment>
            <Link to={'/login'} className="headerLink"><Button color="inherit">Login</Button></Link>
            <Link to={'/register'} className="headerLink"><Button color="inherit">Register</Button></Link>
            </React.Fragment>) : this.props.userType === 'PT' ? (<React.Fragment>
            <Link to={'/symptoms'} className="headerLink"><Button color="inherit">Symptom Checker</Button></Link>
            <Link to={'/health_tips'} className="headerLink"><Button color="inherit">Health Tips</Button></Link>
            <Link to={'/patient/discussion_board'} className="headerLink"><Button color="inherit">Discussion Board</Button></Link>
            <Link to={'/'} className="headerLink"><Button color="inherit" onClick={this.onLogOut}>Log Out</Button></Link>
            </React.Fragment>) : 
            (<React.Fragment>
              <Link to={'/add_tip'} className="headerLink"><Button color="inherit">Add Tip</Button></Link>
              <Link to={'/health_tips'} className="headerLink"><Button color="inherit">Health Tips</Button></Link>
              <Link to={'/patient_list'} className="headerLink"><Button color="inherit">Patient List</Button></Link>
              {/* <Link to={'/update_patient'} className="headerLink"><Button color="inherit">Update Patient</Button></Link> */}
              <Link to={'/'} className="headerLink"><Button color="inherit" onClick={this.onLogOut}>Log Out</Button></Link>
              </React.Fragment>)}
        </Toolbar>
      </AppBar>
    </div>
  )
  };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    userType: state.userType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(UserStore.logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));