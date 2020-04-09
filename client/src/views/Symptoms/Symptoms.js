import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./Symptoms.css";
import { connect } from 'react-redux';
import UserStore from "../../store/user/UserStore";
import Chips from '../../components/UI/Chips';
import PaperSheet from "../../components/UI/Paper";
import DoneIcon from '@material-ui/icons/Done';
import ConditionExpansion from '../../components/UI/ConditionExpansion';
import Cookies from 'universal-cookie';
import history from "../../history";

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

class Symptoms extends React.Component {
  state = {
    headache: false,
    fever: false,
    abdominal: false,
    back: false,
    rash: false,
    cramps: false
  };

  componentWillMount() {
    const cookies = new Cookies();
    if (!cookies.get('token')) {
      history.push('/login')
    }
  }

  componentDidUpdate() {
  }

  handleHeadAche = () => {
    this.setState(prevState => ({ headache: !prevState.headache }));
  }
  handleFever = () => {
    this.setState(prevState => ({ fever: !prevState.fever }));
  }
  handleAbdominal = () => {
    this.setState(prevState => ({ abdominal: !prevState.abdominal }));
  }
  handleBack = () => {
    this.setState(prevState => ({ back: !prevState.back }));
  }
  handleRash = () => {
    this.setState(prevState => ({ rash: !prevState.rash }));
  }
  handleCramps = () => {
    this.setState(prevState => ({ cramps: !prevState.cramps }));
  }

  onSubmit = event => {
    const newCheck = [];
    if (this.state.headache) {
      newCheck.push('headache');
    }
    if (this.state.fever) {
      newCheck.push('fever');
    }
    if (this.state.abdominal) {
      newCheck.push('abdominal');
    }
    if (this.state.back) {
      newCheck.push('back');
    }
    if (this.state.rash) {
      newCheck.push('rash');
    }
    if (this.state.cramps) {
      newCheck.push('cramps');
    }

    this.props.getConditions(newCheck);
  };

  render() {
    const { classes } = this.props;

    return (
      <PaperSheet className='symptomCard'>
        <div className='symptomContainer'>
          <h1 className='symptomTitle'>Symptom Checker</h1>
          <h5>Please select all symptoms that apply</h5>
          <hr />
          <Chips label="Headache" click={() => this.handleHeadAche()} color={this.state.headache ? 'primary' : 'secondary'} selected={this.state.headache ? <DoneIcon /> : null} />
          <Chips label="Fever" click={() => this.handleFever()} color={this.state.fever ? 'primary' : 'secondary'} selected={this.state.fever ? <DoneIcon /> : null} />
          <Chips label="Abdominal Pain" click={() => this.handleAbdominal()} color={this.state.abdominal ? 'primary' : 'secondary'} selected={this.state.abdominal ? <DoneIcon /> : null} />
          <Chips label="Back Pain" click={() => this.handleBack()} color={this.state.back ? 'primary' : 'secondary'} selected={this.state.back ? <DoneIcon /> : null} />
          <Chips label="Rash" click={() => this.handleRash()} color={this.state.rash ? 'primary' : 'secondary'} selected={this.state.rash ? <DoneIcon /> : null} />
          <Chips label="Cramps" click={() => this.handleCramps()} color={this.state.cramps ? 'primary' : 'secondary'} selected={this.state.cramps ? <DoneIcon /> : null} />
          <hr />
          <button onClick={this.onSubmit} type='button' class='submitButton'>
            SUBMIT
            </button>
        </div>
        <div className="conditionsContainer">
          <hr />
          {this.props.conditions ? this.props.conditions.map(condition => (
            <ConditionExpansion name={condition.name} symptoms={condition.symptoms} desc={condition.description} treatment={condition.treatment} />
          )) : null}
        </div>
      </PaperSheet>
    );
  }
}

Symptoms.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    conditions: state.conditions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConditions: (symptoms) => {
      dispatch(UserStore.getConditions(symptoms));
    },
  };
};

// export default withStyles(styles)(PatientLogin);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Symptoms));
