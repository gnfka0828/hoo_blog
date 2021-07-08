import React, { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Home from './component/Home';

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
    //_getInfo();
  }, [host, info]);

  //console.log(host, info);

  return (
    <Home />
  );
}

export default App;
