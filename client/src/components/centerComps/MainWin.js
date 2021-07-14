import React, {useState, useEffect } from 'react';
import Loginbar from './components/menuComps/Loginbar';
import Copyright from './components/Copyright';
import logo from './logo.svg';
import './App.css';


function MainWin() {
    return (
        <div className="App">
            <header className="App-header">
                < Loginbar notify_count="2" mail_count="3" />
                <img src={logo} className="App-logo" alt="logo" />
                <a
                className="App-link"
                href="https://cameodud234.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                >
                My website 
                </a>
            </header>
            {/* <footer>
                {apiResponse}
                < Copyright />
            </footer> */}
        </div>
    );
}

export default MainWin;