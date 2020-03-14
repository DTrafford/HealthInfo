import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";

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

function TipsExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Site: <a href={props.url}>{props.url}</a>
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography>{props.content}</Typography>
          {props.delete ? (
            <DeleteSharpIcon onClick={props.delete} />
          ) : 
          null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

TipsExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TipsExpansionPanel);
