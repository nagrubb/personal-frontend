import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import QuakeConsole from './component/QuakeConsole.jsx'
import ContactDetails from './component/ContactDetails.jsx'
import SkillDetails from './component/SkillDetails.jsx'
import Languages from './component/Languages.jsx'
import FinanceDetails from './component/FinanceDetails.jsx'
import WorkExperience from './component/WorkExperience.jsx'
import Education from './component/Education.jsx'
import Hobbies from './component/Hobbies.jsx'
import CyclingGoals from './component/CyclingGoals.jsx'
import VisitedPlaces from './component/VisitedPlaces.jsx'

var terminalRef = null;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  main: {
    padding: theme.spacing(4),
    background: '#f1f1f1',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.main}>
      <QuakeConsole ref={(input) => { terminalRef = input; }} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Paper>
            <img src="images/profile.jpg" style={{width: '100%'}} alt="Nathan Grubb" />
            <div className="w3-container">
              <ContactDetails />
              <Divider />
              <SkillDetails />
              <Divider />
              <Languages />
              <Divider />
              <FinanceDetails />
              <CyclingGoals />
              <Divider />
              <VisitedPlaces />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper>
            <WorkExperience />
            <Education />
            <Hobbies />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

var globalApp = ReactDOM.render(<App />, document.getElementById('root'));

window.onkeydown = function(e) {
  if (terminalRef) {
    if (e.code == "Backquote") {
      e.preventDefault();
      terminalRef.toggleConsole();
    }
  }
}
