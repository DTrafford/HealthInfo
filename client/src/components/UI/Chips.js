import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit,
    width: 200
  }
});

function Chips(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Chip
        label={props.label}
        onClick={props.click}
        className={classes.chip}
        // variant="outlined"
        color={props.color}
        icon={props.selected}
      />
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chips);
