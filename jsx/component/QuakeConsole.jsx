import React, {Component} from 'react'
import ReactTerminal, { ReactOutputRenderers, ReactThemes } from 'react-terminal-component';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from "@material-ui/core/styles";
import {
  CommandMapping,
  OutputFactory,
  OutputType,
  EmulatorState,
  defaultCommandMapping
} from 'javascript-terminal';

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
      <Box className={this.props.classes.tilda}>
        <Collapse in={showConsole}>
          <ReactTerminal
            theme={{
              background: this.props.theme.palette.common.black,
              promptSymbolColor: this.props.theme.palette.primary.main,
              commandColor: this.props.theme.palette.common.white,
              outputColor: this.props.theme.palette.common.white,
              errorOutputColor: this.props.theme.palette.error.main,
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
        </Collapse>
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

export default withStyles(styles, { withTheme: true })(QuakeConsole);
