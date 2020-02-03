import React, {Fragment, Component} from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMoon,
  faSnowboarding,
  faMotorcycle,
  faWater,
  faTruckMonster,
  faBicycle,
  faPaperPlane,
  faRobot,
  faPepperHot,
} from '@fortawesome/free-solid-svg-icons';
import { faPlaystation } from '@fortawesome/free-brands-svg-icons'
import { withStyles } from "@material-ui/core/styles";

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
  hobby: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  iconLeft: {
    marginLeft: theme.spacing(2),
  },
  iconRight: {
    marginRight: theme.spacing(2),
  },
});

class Hobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      hobbies: []
    };
  }

  render() {
    return (
      <Box className={this.props.classes.container}>
        <Box className={this.props.classes.header}>
          <Typography className={this.props.classes.headerText}>
            <FontAwesomeIcon className={this.props.classes.headerIcon} icon={faMoon} />Hobbies
          </Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faSnowboarding} />
              Snowboarding
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faSnowboarding} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faMotorcycle} />
              Motorcycling
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faMotorcycle} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faWater} />
              Kayaking
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faWater} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faTruckMonster} />
              Off-Roading
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faTruckMonster} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faBicycle} />
              Cycling
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faBicycle} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faPlaystation} />
              Gaming
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faPlaystation} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faPaperPlane} />
              Paragliding
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faPaperPlane} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faRobot} />
              Robotics
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faRobot} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={this.props.classes.hobby}>
            <Typography variant="h6">
              <FontAwesomeIcon className={this.props.classes.iconRight} icon={faPepperHot} />
              Cooking
              <FontAwesomeIcon className={this.props.classes.iconLeft} icon={faPepperHot} />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(Hobbies);
