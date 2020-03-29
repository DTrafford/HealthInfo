import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import ReplyCard from "../UI/ReplyCard";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    textDecoration: "underline"
  }
});

function PostExpansionPanel(props) {
  const { classes } = props;
  const [replyClicked, setReplyClicked] = useState(false);
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {props.post.title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{props.post.content}</Typography>
          {props.img ? <img src={props.img} alt="post img" /> : null}
        </ExpansionPanelDetails>
        {props.post.replies.length >= 1 ? (
          <React.Fragment>
            <ExpansionPanelDetails>
              <Typography
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "black"
                }}
              >
                REPLIES ({props.post.replies.length})
              </Typography>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
              {props.post.replies.map(reply => {
                return <Typography>{reply}</Typography>;
              })}
            </ExpansionPanelDetails>
          </React.Fragment>
        ) : null}
        {replyClicked ? <ReplyCard post={props.post} /> : null}}
        <ExpansionPanelActions>
          <Button
            size="small"
            color="primary"
            onClick={() => setReplyClicked(!replyClicked)}
          >
            {replyClicked ? (
              <span style={{ color: "red" }}>CANCEL</span>
            ) : (
              <span>REPLY</span>
            )}
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

PostExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostExpansionPanel);
