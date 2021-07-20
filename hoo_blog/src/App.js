import React, { useState, useEffect, useCallback } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import { Route, withRouter } from 'react-router-dom';

function App() {
  const [host, setHost] = useState("default");
  const [info, setInfo] = useState({});
  const prevInfo = info;
  console.log("info", info);

  const _getHost = async() => {
    const res = await axios.get('/api/host');
    setHost(res.data.host);
  }

  const _getInfo = useCallback(async() => {
    const res = await axios.get('/api/getInfo');
    
    if ( JSON.stringify(prevInfo) !== JSON.stringify(res.data) ) {
      setInfo(res.data);
    }
  }, [prevInfo]);

  useEffect(() => {
    _getHost();
    _getInfo();
  }, [host, info, _getInfo]);

  return (
    // <Home />
    <>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Signup" component={Signup}/>
    </>
  );
}

export default App;
