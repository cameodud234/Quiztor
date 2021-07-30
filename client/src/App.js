import logo from './logo.svg';
import './App.css';
// import { Component } from 'react';
//import Loginbar from './components/Loginbar';
import React, {useState, useEffect } from 'react';
import MainWin from './components/MainWin';
import Copyright from './components/Copyright';
// import { Typography } from '@material-ui/core';
// import Link from '@material-ui/core/Link';


function App () {

  const [apiResponse, set_apiResponse] = useState();

  useEffect(() => {
    function callAPI() {
      fetch("http://localhost:9000/reactAPI")
        .then(res => res.text())
          .then(res => { set_apiResponse(res); console.log(res)});
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
      < MainWin notify_count={4} mail_count={9} />
      <footer>
        {apiResponse}
      </footer>
    </div>
  )
}

export default App;