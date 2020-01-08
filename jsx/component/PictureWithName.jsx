import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class PictureWithName extends Component {
  render() {
    return (
      <div className="w3-display-container">
        <img src="images/profile.jpg" style={{width: '100%'}} alt="Nathan Grubb" />
      </div>
    )
  }
}
