import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class PictureWithName extends Component {
  render() {
    return (
      <div className="w3-display-container">
        <img src="images/profile.jpg" style={{width: '100%'}} alt="Nathan Grubb" />
        <div className="w3-display-bottomleft w3-container w3-text-white">
          <h2>Nathan Grubb</h2>
        </div>
      </div>
    )
  }
}
