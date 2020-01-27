import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from "@material-ui/core/styles";
import LoadingSpinner from './LoadingSpinner.jsx'

const styles = theme => ({
  container: {
    padding: theme.spacing(2, 0, 2, 0),
  },
  header: {
    padding: theme.spacing(0, 0, 1, 0),
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
  divider: {
    display: 'block',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderStyle: 'inset',
    borderWidth: '0.5px',
  },
});

class FinanceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      finances: []
    };
  }

  componentDidMount() {
    fetch("json/finances.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            finances: result
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
    const { error, loaded, finances } = this.state;

    let renderedFinances;
    if (!loaded) {
      renderedFinances = <LoadingSpinner />;
    } else if (error) {
      renderedFinances = <div>Error: {error}</div>;
    } else {
      renderedFinances = finances.map(finance => (
        <Box key={finance.key}>
          <Box className={this.props.classes.divider}></Box>
          <Quote info={finance} />
        </Box>
      ));
    }

    return (
      <Box className={this.props.classes.container}>
        <Box className={this.props.classes.header}>
          <Typography className={this.props.classes.headerText}>
            <FontAwesomeIcon className={this.props.classes.headerIcon} icon={faLandmark} />Finance
          </Typography>
        </Box>
        {renderedFinances}
        <Box className={this.props.classes.divider}></Box>
      </Box>
    );
  }
}

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      quote: null
    };
    if (this.props.info.type == 'stock') {
      this.url = `api/v1/stock/${this.props.info.ticker}`;
    } else {
      this.url = `api/v1/currency/${this.props.info.from}/${this.props.info.to}`;
    }
  }

  componentDidMount() {
    fetch(this.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            quote: result
          });
        },
        (error) => {
          this.setState({
            loaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, loaded, quote } = this.state;
    if (error) {
      return <Box>Error: {error.message}</Box>;
    } else {;
      var id = 'Unknown';
      var displayName = 'Unknown';
      var content = <i className="fa fa-spinner fa-spin"></i>;

      if (this.props.info.type == 'stock') {
        id = this.props.ticker;
        displayName = this.props.info.ticker;

        if (loaded) {
          content = "$" + quote.closing_price;
        }
      } else {
        id = this.props.info.key;
        displayName = this.props.info.title;

        if (loaded) {
          content = this.props.info.displayPrefix + quote.Rate + this.props.info.displayPostfix;
        }
      }

      return (
        <h6>{displayName}<span id={id} className="w3-right">{content}</span></h6>
      );
    }
  }
}

export default withStyles(styles)(FinanceDetails);
