import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function PrimaryButton(props) {
  const { classes } = props;
  return (
    <div>
      <Button color="primary" className={classes.button}>
        {props.displayText}
      </Button>
      {/* <Button color="secondary" className={classes.button}>
        Secondary
      </Button> */}
    </div>
  );
}

PrimaryButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryButton);