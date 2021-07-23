import React, {useState, useEffect } from 'react';
import logo from '../../logo.svg';
import '../../App.css'


function CenterWin() {
    return (
        <div className="App">
            <main className="App-main">
                <img src={logo} className="App-logo" alt="logo" />
                
            </main>
            <a
                className="App-link"
                href="https://cameodud234.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                >
                My website 
                </a>
        </div>
    );
}

export default CenterWin;