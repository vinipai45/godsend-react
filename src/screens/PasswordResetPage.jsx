import React, { useState } from "react";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);


  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };


  const sendResetEmail = event => {
    event.preventDefault();
  };

  return (
    <form >
    <div className="mycard">
        <div className="card _authCard">
            <h5>Reset your password</h5>

            {/* Email */}
            <div className="input-field _myInput">
                <input 
                  id="email" 
                  name="email"
                  type="email" 
                  className="validate" 
                  autoComplete="off"
                  value={email}  
                  onChange={event => onChangeHandler(event)}   
                />
                <label htmlFor="email">Email</label>
            </div>
     

            {/* Submit form  */}
            <button 
              className="btn waves-effect waves-light black">
                Send reset link <i className="material-icons right">login</i>
            </button>
      </div>
      
    </div>
    {error && <p>{error.message}</p>}
  </form>
  );



}

export default PasswordResetPage