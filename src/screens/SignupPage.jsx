import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase} from '../components/firebase';
import * as ROUTES from '../constants/routes';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash  } from "@fortawesome/free-solid-svg-icons";
import '../assets/signup.css';
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

 

 
const SignupPage = () => {
  return(
      <div>
        <SignupForm />
      </div>
  );
}


const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  passwordShownOne:false,
  passwordShownTwo:false,
  error: null,
};
 
class SignupFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE};
  }
 
  onSubmit = event => {
    const { email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        // global.authUser = authUser
        this.props.history.push(ROUTES.LOGIN)
        console.log(authUser);
      })
      .catch(error => {
        console.log(error);
      });
 
    event.preventDefault();
  };

  togglePasswordOneVisiblity = () => {
    const {passwordShownOne} = this.state;

    passwordShownOne ? this.setState({passwordShownOne:false}) 
                     : this.setState({passwordShownOne:true})
    
  };

  togglePasswordTwoVisiblity = () => {
    const {passwordShownTwo} = this.state;

    passwordShownTwo ? this.setState({passwordShownTwo:false}) 
    : this.setState({passwordShownTwo:true})
    
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      passwordShownOne,
      passwordShownTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne === '' ||
      passwordTwo === '' ||
      email === '';

    
      return (
      <form onSubmit={this.onSubmit}>
        <div className="mycard">
            <div className="card _authCard">
                <h5>Signup here</h5>

                {/* Email */}
                <div className="input-field _myInput">
                    <input 
                      id="email" 
                      name="email"
                      type="email" 
                      className="validate" 
                      autoComplete="off"
                      value={email}  
                      onChange={this.onChange}   
                    />
                    <label htmlFor="email">Email</label>
                </div>
         

                {/* Password One*/}
                <div className="input-field _myInput">
                    <input 
                      id ="passwordOne"
                      name="passwordOne" 
                      type={passwordShownOne?"text":"password"} 
                      className="validate" 
                      autoComplete="off"
                      value={passwordOne}
                      onChange={this.onChange}
                    />
                    <label htmlFor="passwordOne">Password </label>
                    <i className="eye" onClick={this.togglePasswordOneVisiblity}>{passwordShownOne?eye:eye_slash}</i>
                </div>

                {/* Password Two*/}
                <div className="input-field _myInput">
                    <input 
                      id ="passwordTwo"
                      name="passwordTwo" 
                      type={passwordShownTwo?"text":"password"} 
                      className="validate" 
                      autoComplete="off"
                      value={passwordTwo}
                      onChange={this.onChange}
                    />
                    <label htmlFor="passwordTwo">Password </label>
                    <i className="eye" onClick={this.togglePasswordTwoVisiblity}>{passwordShownTwo?eye:eye_slash}</i>
                </div>
                
                {/* Submit form  */}
                <button 
                  disabled={isInvalid}
                  type="submit"
                  className="btn waves-effect waves-light black">
                    Signup <i className="material-icons right">login</i>
                </button>
                <p>
                  Already have an account? <Link to={ROUTES.LOGIN}>login</Link>
                </p>
        </div>
          </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignupForm = compose(
  withRouter,
  withFirebase,
)(SignupFormBase);
 
export default SignupPage;
 
export { SignupForm};