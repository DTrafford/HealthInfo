import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import UserStore from "../../store/user/UserStore";
import { withStyles } from "@material-ui/core/styles";

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

class ReplyCard extends Component {
  componentDidMount() {
    console.log("REPLIES = ", this.props.post.replies);
  }
  state = {
    post: this.props.post,
    replyMessage: []
  };

  onReplyChange = event => {
    this.setState({
      replyMessage: event.target.value
    });
  };

  onSubmit = () => {
    const newPost = this.state.post;
    console.log(newPost);
    newPost.replies.push(this.state.replyMessage);
    this.props.addReply(newPost, this.props.user);
  };

  addReplyHandler = () => {};
  render() {
    return (
      <Card
        style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "95%" }}
      >
        <CardContent>
          <TextField
            id="outlined-content-flexible"
            label="Post Message"
            multiline
            rowsMax="6"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={e => this.onReplyChange(e)}
          />
        </CardContent>
        <CardActions>
          <Button color="primary" size="small" onClick={this.onSubmit}>
            Submit Reply
          </Button>
          {/* <Button size="small">Cancel</Button> */}
        </CardActions>
      </Card>
    );
  }
}

ReplyCard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addReply: (post, user) => {
      dispatch(UserStore.addReply(post, user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReplyCard));
