import * as React from 'react';
import { readFile } from './Utilities/Database';

import './App.scss';

const { ipcRenderer } = window.require('electron');

declare global {
  interface Window {
    require: any;
  }
}

interface State {
  readFile: string;
}

class App extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { readFile: '' };
  }

  componentDidMount() {
    readFile().then(data => {
      this.setState({ readFile: data.fileContents });
    });

    document.addEventListener('mousedown', this.handleClick);
  }

  render() {
    const { readFile } = this.state;

    return (
      <div id='mainWindow' className='MainWindow'>
        <div>
          File contents of server.js:
          <div>{readFile}</div>
        </div>
        <div>Bottom</div>
      </div>
    );
  }

  handleClick = (event: any) => {
    if (event.toElement.id == 'mainWindow') {
      ipcRenderer.send('hideWindow');
    }
  };
}

export default App;
