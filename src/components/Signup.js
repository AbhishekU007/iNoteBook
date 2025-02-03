import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // New state variable to store server errors

  let history = useHistory();
  const { name, email, password, cpassword } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
 
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Account created Successfully!" , "success");
    }
    else{
      props.showAlert("Email already exists. Please use a different email." , "danger")

    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='container'>
      <div className="main">
      <p className="sign" align="center">Sign Up</p>
      <form onSubmit={handleSubmit}>
          <input type="text" className="un" placeholder='Your name' id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required />
        
          <input type="email" className="un" placeholder='Your email address' id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />

          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="un"
              id="password"
              placeholder='Your password'
              name="password"
              onChange={onChange}
              required
              minLength={5}
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <i class="fa-regular fa-eye"></i> : <i class="fa-regular fa-eye-slash"></i>}
            </span>
          </div>
          <input type="password" className="un" id="cpassword" placeholder='Confirm your password' name="cpassword" onChange={onChange} required minLength={5} />
        

        {error && <div className="alert alert-danger" role="alert">
          {error}
        </div>}

        <button type="submit" className="submit" align="center">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default Signup;
