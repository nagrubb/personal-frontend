import React from 'react'
import ReactDOM from 'react-dom'

export default class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      credentials: []
    };
  }

  componentDidMount() {
    fetch("json/education.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            credentials: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, credentials } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="w3-container w3-card-2 w3-white w3-margin-bottom">
          <h2 className="w3-text-grey w3-padding-16">
            <i className="fa fa-graduation-cap fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Education
          </h2>
          {credentials.map((credential, index) => (
            <Credential key={index} info={credential} isLast={index == credentials.length - 1} />
          ))}
        </div>
      );
    }
  }
}

class Credential extends React.Component {
  render() {
    return (
      <div className="w3-container">
        <h5 className="w3-opacity"><b>{this.props.info.institution}</b></h5>
        <h6 className="w3-text-grey">
          <i className="w3-text-blue fa fa-calendar fa-fw w3-margin-right"></i>{this.props.info.startDate} - {this.props.info.endDate}
        </h6>
        <p>{this.props.info.degree}</p>
        {this.props.isLast ? (<br/>) : (<hr/>)}
      </div>
    );
  }
}
