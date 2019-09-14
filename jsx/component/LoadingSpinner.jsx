import React,{Component} from 'react'
import ReactDOM from 'react-dom'

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="w3-center w3-margin-bottom">
        <i className="w3-center w3-text-grey fa fa-spinner fa-spin fa-5x w3-hover-opacity"></i>
      </div>
    );
  }
}
