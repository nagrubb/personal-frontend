import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from "@material-ui/core/styles";
import LoadingSpinner from './LoadingSpinner.jsx'

const styles = theme => ({
  header: {
    padding: theme.spacing(1)
  },
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
  errorBox: {
    padding: theme.spacing(4),
  },
  progressBar: {
    height: theme.spacing(3),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  progressBarFill: {
    height: theme.spacing(3),
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  progressBarText: {
    height: theme.spacing(3),
    color: '#3c3c3c',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

class SkillDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      skills: []
    };
  }

  componentDidMount() {
    fetch("json/skills.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            skills: result
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
    const { error, loaded, skills } = this.state;
    let renderedSkills;

    if (!loaded) {
      renderedSkills = <LoadingSpinner />;
    } else if (error) {
      renderedSkills = (
        <Box display="flex" justifyContent="center" className={this.props.classes.errorBox}>
          <Typography variant="h5">Error: {error}</Typography>
        </Box>
      );
    } else {
      renderedSkills = skills.map(skill => (
        <Skill key={skill.name} name={skill.name} fluency={skill.fluency} classes={this.props.classes}/>
      ));
    }

    return (
      <Box>
        <Box className={this.props.classes.header}>
          <Typography className={this.props.classes.headerText}>
            <FontAwesomeIcon className={this.props.classes.headerIcon} icon={faUserSecret} />Skills
          </Typography>
        </Box>
        {renderedSkills}
      </Box>
    );
  }
}

class Skill extends Component {
  render() {
    return (
      <Box>
        <p>{this.props.name}</p>
        <Box className={this.props.classes.progressBar}>
          <Box className={this.props.classes.progressBarFill} style={{width:`${this.props.fluency}%`}}>
            <Box className={this.props.classes.progressBarText}>{this.props.fluency}%</Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(SkillDetails);
