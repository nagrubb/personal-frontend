import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './LoadingSpinner.jsx'

export default class WorkExperience extends Component {
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

    let renderedExperience
    if (!loaded) {
      renderedExperience = <LoadingSpinner />;
    } else if (error) {
      renderedExperience = <div>Error: {error}</div>;
    } else {
      renderedExperience = experience.map((job, index) => (
        <Job key={index} job={job} isLast={index == experience.length - 1} />
      ));
    }

    return (
      <div className="w3-container w3-card-2 w3-white w3-margin-bottom">
        <h2 className="w3-text-grey w3-padding-16">
          <i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Work Experience
        </h2>
        {renderedExperience}
      </div>
    );
  }
}

class Job extends Component {
  render() {
    var duration = "";

    if (this.props.job.current) {
      duration = <span>{this.props.job.startDate} - <span className="w3-tag w3-blue w3-round">Current</span></span>;
    } else {
      duration = `${this.props.job.startDate} - ${this.props.job.endDate}`;
    }

    return (
      <div className="w3-container">
        <h5 className="w3-opacity">
          <div className="w3-hide-small w3-hide-medium">
            <b>{this.props.job.title} / <a href={`${this.props.job.companyWebsite}`}>{this.props.job.company}</a></b>
            <img src={`${this.props.job.logo}`} className="w3-margin-left" style={{width:"20px"}}/>
          </div>
          <div className="w3-hide-large">
            <b>{this.props.job.title}</b>
            <div></div>
            <b><a href={`${this.props.job.companyWebsite}`}>{this.props.job.company}</a></b>
            <div></div>
          </div>
        </h5>
        <h6 className="w3-text-grey w3-hide-small w3-hide-medium">
          <i className="w3-text-blue fa fa-calendar fa-fw w3-margin-right"></i>{duration}
          <i className="w3-right w3-text-blue fa fa-map fa-fw w3-margin-left"></i>
          <span className="w3-right">{this.props.job.location}</span>
        </h6>
        <h6 className="w3-text-grey w3-hide-large">
          <div><i className="w3-text-blue fa fa-map fa-fw w3-margin-right"></i>{this.props.job.location}</div>
          <div><i className="w3-text-blue fa fa-calendar fa-fw w3-margin-right"></i>{duration}</div>
        </h6>
        {this.props.job.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {this.props.isLast ? (<br/>) : (<hr/>)}
      </div>
    )
  }
}
