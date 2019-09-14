import React from 'react'
import ReactDOM from 'react-dom'

export default class ContactDetails extends React.Component {
  render() {
    return (
      <div>
        <p><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-blue"></i>Software Engineering Manager</p>
        <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-blue"></i>Ho Chi Minh City, Vietnam</p>
        <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-blue"></i><a href="mailto:me@nathangrubb.io">me@nathangrubb.io</a></p>
        <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-blue"></i>(***) ***-****</p>
        <p>
          <a href="https://www.facebook.com/ngrubb2"><i className="fa fa-facebook-official fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://twitter.com/silent_snowman"><i className="fa fa-twitter fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://www.linkedin.com/in/nathangrubb"><i className="fa fa-linkedin fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://github.com/silent-snowman"><i className="fa fa-github fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://nathancaty.slack.com"><i className="fa fa-slack fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://plus.google.com/u/0/101913867428624409865"><i className="fa fa-google-plus fa-2x w3-hover-opacity w3-text-blue"></i></a>
          <a href="https://silent-snowman.github.io/"><i className="fa fa-comments fa-2x w3-hover-opacity w3-text-blue"></i></a>
        </p>
      </div>
    )
  }
}
