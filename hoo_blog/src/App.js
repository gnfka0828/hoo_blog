import React, { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [host, setHost] = useState("default");
  const [info, setInfo] = useState({});
  const prevInfo = info;
  console.log("info", info);

  const _getHost = async() => {
    const res = await axios.get('/api/host');
    setHost(res.data.host);
  }

  const _getInfo = async() => {
    const res = await axios.get('/api/getInfo');
    
    if ( JSON.stringify(prevInfo) !== JSON.stringify(res.data) ) {
      setInfo(res.data);
    }
  };

  useEffect(() => {
    _getHost();
    _getInfo();
  }, [host, info]);

  //console.log(host, info);

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
          {( info && Object.keys(info).length ) ? info[0].val2 : ''}
        </a>
      </header>
    </div>
  );

  return null;
}

export default App;
