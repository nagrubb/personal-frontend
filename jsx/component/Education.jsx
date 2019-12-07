import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './LoadingSpinner.jsx'

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      credentials: []
    };
  }

  componentDidMount() {
    fetch("json/education.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            credentials: result
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
    const { error, loaded, credentials } = this.state;

    let renderedEducation;
    if (!loaded) {
      renderedEducation = <LoadingSpinner />;
    } else if (error) {
      renderedEducation = <div>Error: {error}</div>;
    } else {
      renderedEducation = credentials.map((credential, index) => (
        <Credential key={index} info={credential} isLast={index == credentials.length - 1} />
      ))
    }

    return (
      <div className="w3-container w3-card-2 w3-white w3-margin-bottom">
        <h2 className="w3-text-grey w3-padding-16">
          <i className="fa fa-graduation-cap fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Education
        </h2>
        {renderedEducation}
      </div>
    );
  }
}

class Credential extends Component {
  render() {
    return (
      <div className="w3-container">
        <h5 className="w3-opacity"><b>{this.props.info.institution}</b></h5>
        <h6 className="w3-text-grey">
          <i className="w3-text-blue fa fa-calendar-alt fa-fw w3-margin-right"></i>{this.props.info.startDate} - {this.props.info.endDate}
        </h6>
        <p>{this.props.info.degree}</p>
        {this.props.isLast ? (<br/>) : (<hr/>)}
      </div>
    );
  }
}
