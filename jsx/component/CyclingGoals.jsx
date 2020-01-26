import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from "@material-ui/core/styles";
import LoadingSpinner from './LoadingSpinner.jsx'

const styles = theme => ({
  headerIcon: {
    color: theme.palette.primary.main,
    fontSize: 18,
    marginRight: theme.spacing(2),
  },
  headerText: {
    color: theme.palette.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  stravaIconLink: {
    marginLeft: theme.spacing(2),
    '&:hover': {
      opacity: 0.6,
    },
  },
  errorBox: {
    padding: theme.spacing(4),
  },
  spinnerBox: {
    padding: theme.spacing(4),
  },
  progressWrapper: {
    position: 'relative',
  },
  progressBarText: {
    color: '#3c3c3c',
    position: 'absolute',
    top: 2,
    right: 0,
    left: 0,
    height: 40,
    textAlign: 'center',
  },
  paceLine: {
    borderRight: '1px solid black',
    position: 'absolute',
    top: -8,
    right: 0,
    left: 0,
    height: 40,
  },
  progressBarRegular: {
    borderRadius: theme.spacing(2),
    height: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  progressBarRegularFill: {
    borderRadius: theme.spacing(2),
    height: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  progressBarInverted: {
    borderRadius: theme.spacing(2),
    height: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  progressBarInvertedFill: {
    borderRadius: theme.spacing(2),
    height: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.main,
  },
});

class CyclingGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      rideData: null,
    };
  }

  componentDidMount() {
    fetch("api/v1/cycle")
      .then(
        (result) => {
          if (result.status != 200) {
            throw result.statusText;
          } else {
            return result.json();
          }
        }
      )
      .then(
        (result) => {
          this.setState({ loaded: true, rideData: result, error: null });
        },
        (error) => {
          this.setState({ loaded: true, error: error });
        }
      )
  }

  render() {
    const { error, loaded, rideData } = this.state;
    var header = (
      <Box>
        <Typography className={this.props.classes.headerText}>
          <FontAwesomeIcon className={this.props.classes.headerIcon} icon={faBicycle} />Cycling Goals
          <Link className={this.props.classes.stravaIconLink} href="https://strava.com/athletes/22005749/badge">
            <img src="images/strava-icon.png" alt="Strava" />
          </Link>
        </Typography>
      </Box>
    );

    if (error) {
      return (
        <Box>
          {header}
          <Box display="flex" justifyContent="center" className={this.props.classes.errorBox}>
            <Typography variant="h5">Error: {error}</Typography>
          </Box>
        </Box>
      );
    } else if (!loaded) {
      return (
        <Box>
          {header}
          <LoadingSpinner />;
        </Box>
      );
    } else {
      function calculateDayOfYear() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
      }

      function calculateDaysInAYear() {
        return new Date().getFullYear() % 4 == 0 ? 366 : 365;
      }

      function invertPercentage(percentage) {
        return (1.0 / (percentage / 100.0) * 100.0);
      }

      var ytd = Math.round(rideData.ytd);
      var goal = rideData.goal;
      var totalPercent = Math.round(ytd / goal * 100);
      var totalBarPercent = totalPercent;
      var ytdGoal = Math.round(goal / calculateDaysInAYear() * calculateDayOfYear());
      var ytdExpectedPacePercentage = Math.round(ytdGoal / goal * 100);
      var onTrackPercent = Math.round(ytd / ytdGoal * 100);
      var paceString = null;
      var goalBarRightColor = 'w3-blue';
      var goalBarLeftColor = 'w3-light-grey';
      var paceBarRightColor = 'w3-blue';
      var paceBarLeftColor = 'w3-light-grey'

      if (ytd < ytdGoal) {
        paceString = `${ytdGoal - ytd} miles behind`;
      } else if (ytd > ytdGoal) {
        paceString = `${ytd - ytdGoal} miles ahead`;
      } else {
        paceString = "on pace";
      }

      var totalProgressStyle = this.props.classes.progressBarRegular;
      var totalProgressFillStyle = this.props.classes.progressBarRegularFill;
      var paceProgressStyle = this.props.classes.progressBarRegular;
      var paceProgressFillStyle = this.props.classes.progressBarRegularFill;

      if (totalBarPercent > 100) {
        totalBarPercent = invertPercentage(totalBarPercent);
        totalProgressStyle = this.props.classes.progressBarInverted;
        totalProgressFillStyle = this.props.classes.progressBarInvertedFill;
      }

      if (onTrackPercent > 100) {
        onTrackPercent = invertPercentage(onTrackPercent);
        paceProgressStyle = this.props.classes.progressBarInverted;
        paceProgressFillStyle = this.props.classes.progressBarInvertedFill;
      }

      return (
        <Box>
          {header}
          <p>Year End Goal ({goal} miles)</p>
          <Box className={totalProgressStyle}>
            <Box className={this.props.classes.progressWrapper}>
              <Box className={totalProgressFillStyle} style={{width: totalPercent + '%'}}></Box>
              <Box className={this.props.classes.paceLine} style={{width: ytdExpectedPacePercentage + '%'}}></Box>
              <Box className={this.props.classes.progressBarText}>{totalPercent}%</Box>
            </Box>
          </Box>
          <p>Pace ({paceString})</p>
          <Box className={paceProgressStyle}>
            <Box className={this.props.classes.progressWrapper}>
              <Box className={paceProgressFillStyle} style={{width: onTrackPercent + '%'}}></Box>
              <Box className={this.props.classes.progressBarText}>{ytd} mi / {ytdGoal} mi</Box>
            </Box>
          </Box>
        </Box>
      );
    }
  }
}

export default withStyles(styles)(CyclingGoals);
