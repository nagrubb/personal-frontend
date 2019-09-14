import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './LoadingSpinner.jsx'

export default class SkillDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      skills: []
    };
  }

  componentDidMount() {
    fetch("json/skills.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            skills: result
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
    const { error, loaded, skills } = this.state;

    let renderedSkills;
    if (!loaded) {
      renderedSkills = <LoadingSpinner />;
    } else if (error) {
      renderedSkills = <div>Error: {error}</div>;
    } else {
      renderedSkills = skills.map(skill => (
        <Skill key={skill.name} name={skill.name} fluency={skill.fluency}/>
      ));
    }

    return (
      <div>
        <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-blue"></i>Skills</b></p>
        {renderedSkills}
      </div>
    );
  }
}

class Skill extends Component {
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
