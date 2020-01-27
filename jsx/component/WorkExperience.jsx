import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
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
    padding: theme.spacing(0, 4, 0, 4),
  },
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
        <Job key={index} job={job} isLast={index == experience.length - 1} />
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
    var logo = "";

    if (this.props.job.current) {
      duration = <span>{this.props.job.startDate} - <span className="w3-tag w3-blue w3-round">Current</span></span>;
    } else {
      duration = `${this.props.job.startDate} - ${this.props.job.endDate}`;
    }

    if (this.props.job.logoIcon) {
      this.props.job.logoIcon += " w3-margin-left";
      logo = <i className={`${this.props.job.logoIcon}`} />;
    } else {
      logo = <img src={`${this.props.job.logo}`} className="w3-margin-left" style={{width:"20px"}} />;
    }

    return (
      <div className="w3-container">
        <h5>
          <div className="w3-hide-small w3-hide-medium">
            <b>{this.props.job.title} / <a href={`${this.props.job.companyWebsite}`}>{this.props.job.company}</a></b>
            {logo}
          </div>
          <div className="w3-hide-large">
            <b>{this.props.job.title}</b>
            <div></div>
            <b><a href={`${this.props.job.companyWebsite}`}>{this.props.job.company}</a></b>
            <div></div>
          </div>
        </h5>
        <h6 className="w3-text-grey w3-hide-small w3-hide-medium">
          <i className="w3-text-blue fa fa-calendar-alt fa-fw w3-margin-right"></i>{duration}
          <i className="w3-right w3-text-blue fa fa-map-marked fa-fw w3-margin-left"></i>
          <span className="w3-right">{this.props.job.location}</span>
        </h6>
        <h6 className="w3-text-grey w3-hide-large">
          <div><i className="w3-text-blue fa fa-map-marked fa-fw w3-margin-right"></i>{this.props.job.location}</div>
          <div><i className="w3-text-blue fa fa-calendar-alt fa-fw w3-margin-right"></i>{duration}</div>
        </h6>
        {this.props.job.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {this.props.isLast ? (<br/>) : (<hr/>)}
      </div>
    )
  }
}

export default withStyles(styles)(WorkExperience);
