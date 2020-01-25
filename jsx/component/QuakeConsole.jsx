import React, {Component} from 'react'
import ReactTerminal, { ReactOutputRenderers, ReactThemes } from 'react-terminal-component';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import {
  CommandMapping,
  OutputFactory,
  OutputType,
  EmulatorState,
  defaultCommandMapping
} from 'javascript-terminal';
import {Animated} from "react-animated-css";

const styles = theme => ({
  tilda: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1100,
    display: 'block',
    overflow: 'hidden',
  },
});

class QuakeConsole extends Component {
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
    return (
      <Box id="console" className={this.props.classes.tilda}>
        <Animated animationIn="slideInDown" animationOut="slideOutUp" animationInDuration={500} animationOutDuration={500} isVisible={showConsole} animateOnMount={false}>
          <ReactTerminal
            theme={{
              background: '#141313',
              promptSymbolColor: '#2196f3',
              commandColor: '#fcfcfc',
              outputColor: '#fcfcfc',
              errorOutputColor: '#fcfcfc',
              fontSize: '0.8rem',
              spacing: '1%',
              fontFamily: 'monospace',
              width: '100%',
              height: '50vh'
            }}
            promptSymbol="ninja />"
            outputRenderers={{
              ...ReactOutputRenderers
            }}
            emulatorState={this.customState}>
          </ReactTerminal>
        </Animated>
      </Box>
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

export default withStyles(styles)(QuakeConsole);
