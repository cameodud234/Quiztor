import React, {useState, useEffect } from 'react';
import logo from '../../logo.svg';
// import '../../App.css';


function CenterWin() {
    return (
        <React.Fragment>
            <header className="App-header">
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
        </React.Fragment>
    );
}

export default CenterWin;