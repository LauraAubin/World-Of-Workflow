// import React from 'react';
import * as React from "react";

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
