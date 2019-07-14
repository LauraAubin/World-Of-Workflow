import * as React from 'react';

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

  fetchRequest = async (type: string, path: string, body: any) => {
    return await fetch(path, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      method: type.toUpperCase()
    });
  };

  readFile = async (file: string) => {
    await this.fetchRequest('post', 'readFile', { file })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ readFile: data.fileContents });
      });
  };
}

export default App;
