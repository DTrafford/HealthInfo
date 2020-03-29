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
            onChange={e => this.onContentChange(e)}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button color="primary" size="small">
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
    submitReply: (reply, user) => {
      dispatch(UserStore.createPost(reply, user));
    },
    getPosts: () => {
      dispatch(UserStore.getPosts());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReplyCard));
