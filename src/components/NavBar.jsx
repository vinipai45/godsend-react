import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import '../assets/navbar.css';
import SignoutButton from './SignoutButton';
import { AuthUserContext } from './session';

const NavBar = () => (
  <>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavBarAuth /> : <NavBarNonAuth />
        }
      </AuthUserContext.Consumer>
  </>
);

const NavBarAuth = () => { 
    return(
        <nav className=" grey darken-3">
        <div className="nav-wrapper">
        <a href="#!" className="brand-logo _logo"><i className="material-icons">cloud</i>GodSend</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <SignoutButton />
            </li>
          </ul>
        </div>
      </nav>
    );
};

const NavBarNonAuth = () => { 
  return(
      <nav className=" grey darken-3">
      <div className="nav-wrapper">
      <a href="#!" className="brand-logo _logo"><i className="material-icons">cloud</i>GodSend</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to={ROUTES.LOGIN}>Login </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;