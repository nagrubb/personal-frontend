import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from "@material-ui/core/styles";
import LoadingSpinner from './LoadingSpinner.jsx'

const styles = theme => ({
  container: {
    padding: theme.spacing(2, 0, 2, 0),
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

class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      languages: []
    };
  }

  componentDidMount() {
    fetch("json/languages.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            languages: result
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
    const { error, loaded, languages } = this.state;
    let renderedLanguages;

    if (!loaded) {
      renderedLanguages = <LoadingSpinner />;
    } else if (error) {
      renderedLanguages = (
        <Box display="flex" justifyContent="center" className={this.props.classes.errorBox}>
          <Typography variant="h5">Error: {error}</Typography>
        </Box>
      );
    } else {
      renderedLanguages = languages.map((language, index) => (
        <Language key={index} info={language} classes={this.props.classes} />
      ));
    }

    return (
      <Box className={this.props.classes.container}>
        <Box>
          <Typography className={this.props.classes.headerText}>
            <FontAwesomeIcon className={this.props.classes.headerIcon} icon={faLanguage} />Languages
          </Typography>
        </Box>
        {renderedLanguages}
      </Box>
    );
  }
}

class Language extends Component {
  render() {
    return (
      <Box>
        <p>{this.props.info.name}</p>
        <Box className={this.props.classes.progressBar}>
          <Box className={this.props.classes.progressBarFill} style={{width:`${this.props.info.percentage}%`}}>
            <Box className={this.props.classes.progressBarText}>{this.props.info.proficiency}</Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(Languages);
