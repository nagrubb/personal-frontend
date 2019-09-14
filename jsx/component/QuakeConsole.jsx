import React, {Component} from 'react';
import ReactTerminal, { ReactOutputRenderers, ReactThemes } from 'react-terminal-component';
import {
  CommandMapping, OutputFactory, OutputType, EmulatorState,
  defaultCommandMapping
} from 'javascript-terminal';
import {Animated} from "react-animated-css";

export default class QuakeConsole extends Component {
  constructor(props) {
    super(props);
    this.state = { showConsole: false };
    this.toggleConsole = this.toggleConsole.bind(this);
    this.exitConsole = this.exitConsole.bind(this);
    this.customState = EmulatorState.create({
      'commandMapping': CommandMapping.create({
        ...defaultCommandMapping,
        'exit': {
          'function': this.exitConsole,
          'optDef': {}
        }
      })
    });
  }

  render() {
    const { showConsole } = this.state;
    var displayStyle = {
      display: 'block',
      overflow: 'hidden'
    };

    return (
      <div id="console" className="tilda" style={displayStyle}>
        <Animated animationIn="slideInDown" animationOut="slideOutUp" animationInDuration={500} animationOutDuration={500} isVisible={showConsole} animateOnMount={false}>
          <ReactTerminal
            theme={ReactThemes.hacker}
            outputRenderers={{
              ...ReactOutputRenderers
            }}
            emulatorState={this.customState}>
          </ReactTerminal>
        </Animated>
      </div>
    );
  }

  exitConsole(state, opts) {
    this.setState({ showConsole: false });
    return { output: OutputFactory.makeTextOutput("") }
  }

  toggleConsole(event) {
    this.setState({ showConsole: !this.state.showConsole });
  }
}
