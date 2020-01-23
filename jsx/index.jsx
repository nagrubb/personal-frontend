import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
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
import Footer from './component/Footer.jsx'

var terminalRef = null;

const theme = createMuiTheme({
  palette: {
    primary: blue,
    background: {
      default: "#f1f1f1",
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  main: {
    padding: theme.spacing(1),
  },
  profilePicture: {
    padding: '12',
    width: '100%',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.main}>
        <QuakeConsole ref={(input) => { terminalRef = input; }} />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Paper>
              <img className={classes.profilePicture} src="images/profile.jpg" alt="Nathan Grubb" />
              <Container>
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
              </Container>
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
      <Footer />
    </ThemeProvider>
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
