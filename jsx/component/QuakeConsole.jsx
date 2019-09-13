import React from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import ReactTerminal, { ReactOutputRenderers, ReactThemes } from 'react-terminal-component';
import {
  CommandMapping, OutputFactory, OutputType, EmulatorState,
  defaultCommandMapping
} from 'javascript-terminal';

import {Animated} from "react-animated-css";


export default class QuakeConsole extends React.Component {
  constructor(props) {
    super(props);
    this.terminalRef = React.createRef();
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

  componentDidMount() {
    if (this.terminalRef && this.terminalRef.inputRef) {
      this.terminalRef.inputRef.focus();
    }
  }

  render() {
    const { showConsole } = this.state;
    var displayStyle = {
      display: 'block',
      overflow: 'hidden'
    };

    return (
      <React.Fragment>
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="`"
          onKeyHandle={this.toggleConsole}
        />
        <div id="console" className="tilda" style={displayStyle}>
        <Animated animationIn="slideInDown" animationOut="slideOutUp" animationInDuration={500} animationOutDuration={500} isVisible={showConsole} animateOnMount={false}>
          <ReactTerminal
            ref={this.terminalRef}
            theme={ReactThemes.hacker}
            outputRenderers={{
              ...ReactOutputRenderers
            }}
            emulatorState={this.customState}>
          </ReactTerminal>
        </Animated>
        </div>
      </React.Fragment>
    );
  }

  exitConsole(state, opts) {
    this.setState({ showConsole: false });
    return { output: OutputFactory.makeTextOutput("") }
  }

  toggleConsole(event) {
    event.preventDefault();
    this.setState({ showConsole: !this.state.showConsole });
  }
}
