import * as React from 'react';

import Layout from './components/structure/Layout';
import Error from './components/pageElements/Error';

import { hideWindow } from './utilities/HideWindow';

import './App.scss';

const { ipcRenderer } = window.require('electron');

interface State {
  databaseAvailable: boolean;
}

class App extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { databaseAvailable: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', hideWindow);

    ipcRenderer.send('databaseAvailable');
    ipcRenderer.once('databaseAvailableReply', (event, args) => {
      this.setState({ databaseAvailable: args });
    });
  }

  render() {
    const { databaseAvailable } = this.state;

    return (
      <div className='MainWindow'>
        {databaseAvailable ? <Layout /> : <Error />}
      </div>
    );
  }
}

export default App;
