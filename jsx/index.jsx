import React from 'react'
import ReactDOM from 'react-dom'
import QuakeConsole from './component/QuakeConsole.jsx'
import PictureWithName from './component/PictureWithName.jsx'
import ContactDetails from './component/ContactDetails.jsx'
import SkillDetails from './component/SkillDetails.jsx'
import Languages from './component/Languages.jsx'
import FinanceDetails from './component/FinanceDetails.jsx'
import WorkExperience from './component/WorkExperience.jsx'
import Education from './component/Education.jsx'
import Hobbies from './component/Hobbies.jsx'
import CyclingGoals from './component/CyclingGoals.jsx'
import VisitedPlaces from './component/VisitedPlaces.jsx'
import KeyHandler, { KEYPRESS } from 'react-key-handler';

window.onkeydown = function(e) {
  if (globalApp && globalApp.terminalRef) {
    if (e.code == "Backquote") {
      e.preventDefault();
      globalApp.terminalRef.toggleConsole();
    }
  }
}

class ResumePage extends React.Component {
  constructor(props) {
    super(props);
    this.terminalRef = null;
  }

  render() {
    return (
      <div>
        <QuakeConsole ref={(input) => { this.terminalRef = input; }} />
        <div className="w3-content w3-margin-top" style={{"maxWidth": "1400px"}}>
          <div className="w3-row-padding">
            <div className="w3-third">
              <div className="w3-white w3-text-grey w3-card-4" >
                <PictureWithName />
                <div className="w3-container">
                  <ContactDetails />
                  <hr />
                  <SkillDetails />
                  <hr />
                  <Languages />
                  <hr />
                  <FinanceDetails />
                  <CyclingGoals />
                  <hr />
                  <VisitedPlaces />
                </div>
              </div>
            </div>
            <div className="w3-twothird">
              <WorkExperience />
              <Education />
              <Hobbies />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

var globalApp = ReactDOM.render(
  <ResumePage />,
  document.getElementById('root')
);
