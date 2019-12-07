import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class ContactDetails extends Component {
  render() {
    return (
      <div>
        <p><i className="fa fa-address-book fa-fw w3-margin-right w3-large w3-text-blue"></i>Nathan Grubb</p>
        <p><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-blue"></i>Software Engineering Manager</p>
        <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-blue"></i>Ho Chi Minh City, Vietnam</p>
        <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-blue"></i><a href="mailto:me@nathangrubb.io">me@nathangrubb.io</a></p>
        <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-blue"></i>(***) ***-****</p>
        <p>
          <a href="https://www.facebook.com/ngrubb2"><i style={{padding: "3px" }} className="fab fa-facebook fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://twitter.com/silent_snowman"><i style={{padding: "3px" }} className="fab fa-twitter fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://www.linkedin.com/in/nathangrubb"><i style={{padding: "3px" }} className="fab fa-linkedin fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://github.com/silent-snowman"><i style={{padding: "3px" }} className="fab fa-github fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://nathancaty.slack.com"><i style={{padding: "3px" }} className="fab fa-slack fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://plus.google.com/u/0/101913867428624409865"><i style={{padding: "3px" }} className="fab fa-google-plus fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://silent-snowman.github.io/"><i style={{padding: "3px" }} className="fa fa-blog fa-2x w3-hover-opacity w3-text-blue"></i></a>
        </p>
      </div>
    )
  }
}
