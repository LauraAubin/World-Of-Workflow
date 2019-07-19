import * as React from 'react';

import './App.scss';

const { ipcRenderer } = window.require('electron');

declare global {
  interface Window {
    require: any;
  }
}

class App extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  render() {
    return (
      <div id='mainWindow' className='MainWindow'>
        hi
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
