import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  spinnerBox: {
    padding: theme.spacing(4),
  },
}));

export default function LoadingSpinner() {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" className={classes.spinnerBox}>
      <FontAwesomeIcon icon={faSpinner} size="5x" spin />
    </Box>
  );
}
