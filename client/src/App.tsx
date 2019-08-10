import * as React from 'react';

import Layout from './components/structure/Layout';

import {hideWindow} from './utilities/HideWindow';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', hideWindow);
  }

  render() {
    return (
      <div className='MainWindow'>
        <Layout />
      </div>
    );
  }
}

export default App;
