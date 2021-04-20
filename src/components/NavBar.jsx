import React, { Component } from 'react';
import '../assets/navbar.css';

const NavBar = () => { 
    return(
        <nav className="deep-purple darken-1">
        <div className="nav-wrapper">
        <a href="#!" className="brand-logo _logo"><i className="material-icons">cloud</i>GodSend</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">History</a></li>
            <li><a href="badges.html">About</a></li>
          </ul>
        </div>
      </nav>
    );
};

export default NavBar;