import React from 'react'
import ReactDOM from 'react-dom'

export default class SkillDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      skills: []
    };
  }

  componentDidMount() {
    fetch("json/skills.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            skills: result
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
    const { error, isLoaded, skills } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-blue"></i>Skills</b></p>
          {skills.map(skill => (
            <Skill key={skill.name} name={skill.name} fluency={skill.fluency}/>
          ))}
        </div>
      );
    }
  }
}

class Skill extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <div className="w3-light-grey w3-round-xlarge">
          <div className="w3-container w3-center w3-round-xlarge w3-blue" style={{width: this.props.fluency + '%'}}>
            <div className="w3-center" style={{color: '#3c3c3c'}}>{this.props.fluency}%</div>
          </div>
        </div>
      </div>
    )
  }
}
