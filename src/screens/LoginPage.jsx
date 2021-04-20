import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';

import { withFirebase} from '../components/firebase';
import * as ROUTES from '../constants/routes';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash  } from "@fortawesome/free-solid-svg-icons";
import '../assets/signup.css';
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;

 

 
const LoginPage = () => {
  return(
      <div>
        <LoginForm />
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
 
class LoginFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE};
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
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
      passwordShownOne,
      error,
    } = this.state;

    const isInvalid =
      passwordOne === '' ||
      email === '';

    
      return (
      <form onSubmit={this.onSubmit}>
        <div className="mycard">
            <div className="card _authCard">
                <h5>Login here</h5>

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
         

                {/* Password */}
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
                
                {/* Submit form  */}
                <button 
                  disabled={isInvalid}
                  type="submit"
                  className="btn waves-effect waves-light black">
                    Login <i className="material-icons right">login</i>
                </button>
                <p>
                  Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                </p>
        </div>
          </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const LoginForm = withRouter(withFirebase(LoginFormBase));
 
export default LoginPage;
 
export { LoginForm};