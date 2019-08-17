import React from 'react'
import ReactDOM from 'react-dom'

export default class Languages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      languages: []
    };
  }

  componentDidMount() {
    fetch("json/languages.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            languages: result
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
    const { error, isLoaded, languages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <p className="w3-large">
            <b>
              <i className="fa fa-language fa-fw w3-margin-right w3-text-blue"></i>Languages
            </b>
          </p>
          {languages.map((language, index) => (
            <Language key={index} info={language} />
          ))}
        </div>
      );
    }
  }
}

class Language extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.info.name}</p>
        <div className="w3-light-grey w3-round-xlarge">
          <div className="w3-container w3-center w3-round-xlarge w3-blue" style={{width:`${this.props.info.percentage}%`}}>
            <div className="w3-center" style={{color:"#3c3c3c"}}>{this.props.info.proficiency}</div>
          </div>
        </div>
      </div>
    );
  }
}
