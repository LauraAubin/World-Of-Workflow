import * as React from 'react';
import { fetchRequest } from './Utilities/Fetch';

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
    this.readFile('./server.js');
  }

  render() {
    const { readFile } = this.state;

    return (
      <div>
        File contents of server.js:
        <div>{readFile}</div>
      </div>
    );
  }

  handleClick = (event: any) => {
    if (event.toElement.id == 'mainWindow') {
      ipcRenderer.send('hideWindow');
    }
  };

  readFile = async (file: string) => {
    await fetchRequest('post', 'readFile', { file })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ readFile: data.fileContents });
      });
  };
}

export default App;
