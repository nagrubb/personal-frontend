import React from 'react'
import ReactDOM from 'react-dom'

export default class Hobbies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      hobbies: []
    };
  }

  componentDidMount() {
    fetch("json/hobbies.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            hobbies: result
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
    const { error, isLoaded, hobbies } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="w3-container w3-card-2 w3-white">
          <h2 className="w3-text-grey w3-padding-16">
            <i className="fa fa-gamepad fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>Hobbies
          </h2>
          {hobbies.map((hobby, index) => (
            <Hobby key={index} info={hobby} />
          ))}
        </div>
      );
    }
  }
}

class Hobby extends React.Component {
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
