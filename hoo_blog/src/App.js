import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [host, setHost] = useState("default");

  const _getHost = async() => {
    const res = await axios.get('/api/host');
    setHost(res.data.host);
  }

  useEffect(() => {
    _getHost();
  });

  console.log(host);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React with {host}
        </a>
      </header>
    </div>
  );
}

export default App;
