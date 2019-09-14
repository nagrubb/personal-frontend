import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './LoadingSpinner.jsx'

export default class Hobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      hobbies: []
    };
  }

  componentDidMount() {
    fetch("json/hobbies.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            hobbies: result
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
    const { error, loaded, hobbies } = this.state;

    let renderedHobbies;
    if (!loaded) {
      renderedHobbies = <LoadingSpinner />;
    } else if (error) {
      renderedHobbies = <div>Error: {error}</div>;
    } else {
      renderedHobbies = hobbies.map((hobby, index) => (
        <Hobby key={index} info={hobby} />
      ));
    }

    return (
      <div className="w3-container w3-card-2 w3-white">
        <h2 className="w3-text-grey w3-padding-16">
          <i className="fa fa-gamepad fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Hobbies
        </h2>
        {renderedHobbies}
      </div>
    );
  }
}

class Hobby extends Component {
  render() {
    var classes = "w3-col w3-center l4 m6 s12";

    if (this.props.info.hideMedium) {
      classes += " w3-hide-medium";
    }

    return (
      <div className={classes}>
        <h6 className="w3-opacity">
          <i className={`fa ${this.props.info.icon} fa-fw w3-margin-right`}></i>
          <b>{this.props.info.name}</b>
          <i className={`fa ${this.props.info.icon} fa-fw w3-margin-left`}></i>
        </h6>
      </div>
    );
  }
}
