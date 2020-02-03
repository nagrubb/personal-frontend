import React, {Component, Fragment} from 'react'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCalendarAlt, faMapMarked } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from "@material-ui/core/styles";
import LoadingSpinner from './LoadingSpinner.jsx'

const styles = theme => ({
  container: {
    padding: theme.spacing(2, 0, 2, 0),
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
    marginBottom: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
  },
  headerIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(3),
    fontSize: 36,
  },
  headerText: {
    color: theme.palette.text.primary,
    fontSize: 30,
  },
  content: {
    padding: theme.spacing(2, 5, 0, 5),
  },
  companyIcon: {
    height: 16,
    marginLeft: theme.spacing(2),
  },
  dateIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  dateRange: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  jobDivider: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  locationIcon: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
  },
  current: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    display: 'inline-block',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  }
});

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      experience: []
    };
  }

  componentDidMount() {
    fetch("json/experience.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            experience: result
          });
        },
        (error) => {
          this.setState({
            loaded: true,
            error: error.message
          });
        }
      )
  }

  render() {
    const { error, loaded, experience } = this.state;
    var renderedExperience = <LoadingSpinner />;

    if (error) {
      renderedExperience = <Box>Error: {error}</Box>;
    } else if (loaded) {
      renderedExperience = experience.map((job, index) => (
        <Job key={index} job={job} isLast={index == experience.length - 1} classes={this.props.classes} />
      ));
    }

    return (
      <Box className={this.props.classes.container}>
        <Box className={this.props.classes.header}>
          <Typography className={this.props.classes.headerText}>
            <FontAwesomeIcon className={this.props.classes.headerIcon} icon={faBuilding} />Work Experience
          </Typography>
        </Box>
        <Box className={this.props.classes.content}>
          {renderedExperience}
        </Box>
      </Box>
    );
  }
}

class Job extends Component {
  render() {
    var duration = "";

    if (this.props.job.current) {
      duration = <span>{this.props.job.startDate} - <span className={this.props.classes.current}>Current</span></span>;
    } else {
      duration = `${this.props.job.startDate} - ${this.props.job.endDate}`;
    }

    return (
      <Box>
        <Typography variant="h5">
          {this.props.job.title} / {this.props.job.company}
          <img src={this.props.job.logo} className={this.props.classes.companyIcon} />
        </Typography>
        <Typography variant="body1" className={this.props.classes.dateRange}>
          <FontAwesomeIcon className={this.props.classes.dateIcon} icon={faCalendarAlt} />{duration}
          <span style={{float: 'right'}}>{this.props.job.location}
            <FontAwesomeIcon className={this.props.classes.locationIcon} icon={faMapMarked} />
          </span>
        </Typography>
        {this.props.job.description.map((paragraph, index) => (
          <Box component="p">
            <Typography variant="body2" key={index}>{paragraph}</Typography>
          </Box>
        ))}
        {!this.props.isLast ? <Divider className={this.props.classes.jobDivider} /> : <Fragment />}
      </Box>
    );
  }
}

export default withStyles(styles)(WorkExperience);
