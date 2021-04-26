import React from 'react';
import "../assets/signout.css"; 
import { withFirebase } from './firebase';
 
const SignOutButton = ({ firebase }) => (
  <button 
    type="button"
    onClick={firebase.doSignOut}
    className="btn waves-effect waves-light purple _signoutButton">
    Signout <i className="material-icons right _signoutbuttonicon">login</i>
  </button>

);
 
export default withFirebase(SignOutButton);