import React, { Component } from "react";
import "./DiscussionBoard.css";
import { connect } from "react-redux";
import UserStore from "../../store/user/UserStore";
import PaperSheet from "../../components/UI/Paper";
import Button from "@material-ui/core/Button";
import PostExpansionPanel from "../../components/UI/PostExpansionPanel";
import Cookies from 'universal-cookie';
import history from "../../history";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class DiscussionBoard extends Component {
  constructor() {
    super();
    this.state = {
      posts: null
    };
  }

  componentWillMount() {
    const cookies = new Cookies();
    if (!cookies.get('token')) {
      history.push('/login')
    }
  }

  deletePost = id => {
    this.props.deleteTip(id);
  };
  render() {
    return (
      <PaperSheet>
        {/* TODO: USE THIS FOR REDIRECT ON ALL PAGES IF NOT LOGGED IN */}
        {this.props.userType === "EM" ? (
          <Link to={"/add_tip"} className="addTip_Button">
            <Button variant="contained" color="primary">
              Add Tip
            </Button>
          </Link>
        ) : null}
        <Link
          to={"/patient/discussion_board/create"}
          className="CreatePost_Button"
        >
          <Button variant="contained" color="primary">
            Create New Post
          </Button>
        </Link>
        <div className="PostListContainer">
          {this.props.posts ? (
            this.props.posts.map(post => (
              <PostExpansionPanel
                post={post}
                delete={
                  this.props.userId === post.creatorId
                    ? () => this.deletePost(post)
                    : null
                }
                className="resultPanel"
              />
            ))
          ) : (
              <h2>No Posts Yet!</h2>
            )}
        </div>
      </PaperSheet>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userType,
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTip: id => {
      dispatch(UserStore.deleteTip(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionBoard);
