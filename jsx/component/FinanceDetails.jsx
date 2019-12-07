import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './LoadingSpinner.jsx'

export default class FinanceDetails extends Component {
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
        <div key={finance.key}>
          <div className="stock-divider"></div>
          <Quote info={finance} />
        </div>
      ));
    }

    return (
      <div>
        <p className="w3-large">
          <b>
            <i className="fa fa-landmark fa-fw w3-margin-right w3-text-blue"></i>Finance
          </b>
        </p>
        {renderedFinances}
        <div className="stock-divider"></div>
      </div>
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
      return <div>Error: {error.message}</div>;
    } else if (!loaded) {
      if (this.props.info.type == 'stock') {
        return (
          <h6>{this.props.info.ticker}<span id={this.props.ticker} className="w3-right"><i className="fa fa-spinner fa-spin"></i></span></h6>
        );
      } else {
        return (
          <h6>{this.props.info.title}<span id={this.props.info.key} className="w3-right"><i className="fa fa-spinner fa-spin"></i></span></h6>
        );
      }
    } else {
      if (this.props.info.type == 'stock') {
        return (
          <h6>{this.props.info.ticker}<span id={this.props.ticker} className="w3-right">${quote.closing_price}</span></h6>
        );
      } else {
        return (
          <h6>{this.props.info.title}<span id={this.props.info.key} className="w3-right">{this.props.info.displayPrefix}{quote.Rate}{this.props.info.displayPostfix}</span></h6>
        );
      }
    }
  }
}
