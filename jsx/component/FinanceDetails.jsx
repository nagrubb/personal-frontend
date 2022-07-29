import React, {Component} from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
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
  value: {
    float: 'right'
  },
});

class FinanceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false, error: null, finances: null};
  }

  componentDidMount() {
    fetch("json/finances.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({loaded: true, error: null, finances: result});
        },
        (error) => {
          this.setState({loaded: true, error: error.message, finances: null});
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
          <Quote info={finance} classes={this.props.classes} />
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
    this.state = {loaded: false, error: null, quote: null};

    //Stock quotes have a limit of 5 over 1 minute so make sure our retries
    //cover this time period. Currently this is set to 75 seconds (5 * 15).
    this.retries = 5;
    this.retryDelay = 15000; // 15 seconds

    if (this.props.info.type == 'stock') {
      this.url = `api/v1/stock/${this.props.info.ticker}`;
    } else {
      this.url = `api/v1/currency/${this.props.info.from}/${this.props.info.to}`;
    }
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote() {
    fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((result) => {
        this.setState({loaded: true, quote: result, error: null});
      })
      .catch((error) => {
        console.log(this.url);
        console.log(error);
        this.retries = this.retries - 1;

        if (this.retries > 0) {
          console.log(`Retries remaining: ${this.retries}`);
          setTimeout(() => { this.fetchQuote(); }, this.retryDelay);
        } else {
          console.log('No retries remaining. Giving up!');
          this.setState({loaded: true, quote: null, error: error});
        }
      });
  }

  render() {
    const { error, loaded, quote } = this.state;
    var id = 'Unknown';
    var displayName = 'Unknown';
    var content =  <FontAwesomeIcon icon={faSpinner} spin />;
    var isStock = this.props.info.type == 'stock';

    if (isStock) {
      id = this.props.ticker;
      displayName = this.props.info.ticker;

      if (loaded && !error) {
        content = "$" + quote.closing_price;
      }
    } else {
      id = this.props.info.key;
      displayName = this.props.info.title;

      if (loaded && !error) {
        content = this.props.info.displayPrefix + quote.Rate + this.props.info.displayPostfix;
      }
    }

    if (loaded && error) {
      content = "N/A";
    }

    return (
      <Typography variant="h6">{displayName}<span id={id} className={this.props.classes.value}>{content}</span></Typography>
    );
  }
}

export default withStyles(styles)(FinanceDetails);
