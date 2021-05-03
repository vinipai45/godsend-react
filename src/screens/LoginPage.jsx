import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {compose} from 'recompose'
import { withFirebase} from '../components/firebase';
import * as ROUTES from '../constants/routes';
import Swal from 'sweetalert2'
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
  password: '',
  passwordShown:'',
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
      .then((data) => {
        this.setState({ ...INITIAL_STATE });
        
        this.props.history.push(ROUTES.HOME);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "success",
          showConfirmButton: false,
          timer: 1500
        });

        console.log(data);

      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
 
    event.preventDefault();
  };

  togglePasswordVisiblity = () => {
    const {passwordShown} = this.state;

    passwordShown ? this.setState({passwordShown:false}) 
                     : this.setState({passwordShown:true})
    
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      email,
      password,
      passwordShown,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
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
                      id ="password"
                      name="password" 
                      type={passwordShown?"text":"password"} 
                      className="validate" 
                      autoComplete="off"
                      value={password}
                      onChange={this.onChange}
                    />
                    <label htmlFor="password">Password </label>
                    <i className="eye" onClick={this.togglePasswordVisiblity}>{passwordShown?eye:eye_slash}</i>
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
 
const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);
 
export default LoginPage;
 
export { LoginForm};