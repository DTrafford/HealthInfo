import React, { Component } from "react";
import "./Tips.css";
import {connect} from 'react-redux';
import UserStore from "../../store/user/UserStore";
import PaperSheet from "../../components/UI/Paper";
import Button from '@material-ui/core/Button';
import TipsExpansionPanel from "../../components/UI/TipsExpansionPanel";
import { stat } from "fs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class ViewTips extends Component {
  constructor() {
    super()
    this.state = {
      healthTips: null
    }
  }

  deleteTip = (id) => {
    this.props.deleteTip(id);
  }
  render() {
    return (
      <PaperSheet>
        {this.props.userType === "EM" ? 
          <Link to={'/add_tip'} className="addTip_Button"><Button variant="contained" color="primary">Add Tip</Button></Link>
         : null}
        <div className='ViewResultsContainer'>
          {this.props.health_tips ? this.props.health_tips.map(tip => (
            <TipsExpansionPanel title={tip.title} url={tip.url} content={tip.content} delete={this.props.userType === "EM" ? () => this.deleteTip(tip) : null} className="resultPanel" />
          )) : <h2>No Tips Posted Yet!</h2>}
        </div>
      </PaperSheet>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userType,
    health_tips: state.healthTips
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTip: (id) => {
      dispatch(UserStore.deleteTip(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTips);
