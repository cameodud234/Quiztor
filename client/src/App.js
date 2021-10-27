import logo from './logo.svg';
import './App.css';
// import { Component } from 'react';
//import Loginbar from './components/Loginbar';
import React, {useState, useEffect } from 'react';
import MainWin from './components/MainWin';
import Copyright from './components/Copyright';
import { TrendingUpOutlined } from '@material-ui/icons';
// import { Typography } from '@material-ui/core';
// import Link from '@material-ui/core/Link';


function App () {

  const [apiResponse, set_apiResponse] = useState();
  const [authenticate, setAuthenticate] = useState();

  useEffect(() => {
    function callAPI() {
      fetch("http://localhost:9000/reactAPI")
        .then((res) => {
          setAuthenticate(true);
          res.text();
          }
        )
          .then(res => { set_apiResponse(res); });
    }

    callAPI();

  });

  return (
    <div className="App">
      <header className="App-header">
        
        {/* <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://cameodud234.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          My website 
        </a> */}
      </header>

      {/* This 'authVal' will be used to changed the layout of the 
      view when someone is signed in vs not */}
      < MainWin notify_count={4} mail_count={9} authVal={true} />
      <footer>
        {apiResponse}
      </footer>
    </div>
  )
}

export default App;