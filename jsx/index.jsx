import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import QuakeConsole from './component/QuakeConsole.jsx'
import PictureWithName from './component/PictureWithName.jsx'
import ContactDetails from './component/ContactDetails.jsx'
import SkillDetails from './component/SkillDetails.jsx'
import Languages from './component/Languages.jsx'
import FinanceDetails from './component/FinanceDetails.jsx'
import WorkExperience from './component/WorkExperience.jsx'
import Education from './component/Education.jsx'
import Hobbies from './component/Hobbies.jsx'
import CyclingGoals from './component/CyclingGoals.jsx'
import VisitedPlaces from './component/VisitedPlaces.jsx'

window.onkeydown = function(e) {
  if (globalApp && globalApp.terminalRef) {
    if (e.code == "Backquote") {
      e.preventDefault();
      globalApp.terminalRef.toggleConsole();
    }
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  main: {
    padding: theme.spacing(2),
    background: '#f1f1f1',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

class ResumePage extends Component {
  constructor(props) {
    super(props);
    this.terminalRef = null;
  }

  render() {
    const classes = useStyles();
    return (
      <Container className={classes.main}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <div className="w3-white w3-text-grey w3-card-4" >
                <PictureWithName />
                <div className="w3-container">
                  <ContactDetails />
                  <hr />
                  <SkillDetails />
                  <hr />
                  <Languages />
                  <hr />
                  <FinanceDetails />
                  <CyclingGoals />
                  <hr />
                  <VisitedPlaces />
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <WorkExperience />
              <Education />
              <Hobbies />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

var globalApp = ReactDOM.render(
  <ResumePage />,
  document.getElementById('root')
);
