import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2, 0, 0, 0),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.footer} />
  );
}
