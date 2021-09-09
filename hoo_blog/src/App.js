import React, { useState, useEffect, useCallback } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import { Route, withRouter } from 'react-router-dom';
import * as actions from './redux/actions';
import { useDispatch } from "react-redux";

function App() {
  const [host, setHost] = useState("default");
  const [info, setInfo] = useState({});
  const prevInfo = info;
  const dispatch = useDispatch();

  console.log("info", info);
  //console.log("sessionStorage : ", window.sessionStorage.getItem('loginUser'), window.sessionStorage.length);

  const _getHost = async() => {
    const res = await axios.get('/api/host');
    setHost(res.data.host);
  }

  const _getInfo = useCallback(async() => {
    const res = await axios.get('/api/getUsers');
    
    if ( JSON.stringify(prevInfo) !== JSON.stringify(res.data) ) {
      setInfo(res.data);
    }
  }, [prevInfo]);

  const _confirmLogin = useCallback(async() => {
    const res = await axios.get('/api/confirmLogin');
    dispatch(actions.updateConfirmLogin(res.data));
  }, [dispatch]);

  useEffect(() => {
    _getHost();
    _getInfo();
    _confirmLogin();
  }, [host, info, _getInfo, _confirmLogin]);

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
