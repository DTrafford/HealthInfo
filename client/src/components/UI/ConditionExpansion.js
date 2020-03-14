import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
});

function ConditionExpansion(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{props.name}</Typography>
        </ExpansionPanelSummary>
        {/* <ExpansionPanelDetails>
          <Typography>
            <u>Symptoms:</u> {props.symptoms}
          </Typography>
        </ExpansionPanelDetails> */}
        <ExpansionPanelDetails>
          <Typography>
            <b>Desctiption:</b> {props.desc}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography>
            <b>Treatmeant:</b> {props.treatment}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

ConditionExpansion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConditionExpansion);