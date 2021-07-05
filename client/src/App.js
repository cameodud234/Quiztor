import logo from './logo.svg';
import './App.css';
// import { Component } from 'react';
//import Loginbar from './components/Loginbar';
import React, {useState, useEffect } from 'react';
import Loginbar from './components/MenuComps/Loginbar';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://cameodud234.github.io/">
        Quiztor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App (props) {

  const [apiResponse, set_apiResponse] = useState();

  useEffect(() => {
    function callAPI() {
      fetch("http://192.168.1.201:9000/reactAPI")
        .then(res => res.text())
          .then(res => set_apiResponse(res));
    }

    callAPI();

  });

  return (
    <div className="App">
      <header className="App-header">
        < Loginbar notify_count={2} mail_count={15} />
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
          Learn React
        </a>
      </header>
      <footer>
        {apiResponse}
        < Copyright />
      </footer>
    </div>
  )
}

export default App;