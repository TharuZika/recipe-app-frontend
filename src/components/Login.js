import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactJsAlert from "reactjs-alert";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', {email, password})
      .then(res => {
        console.log(res);
        if(res.data.flag){
          Cookies.set('authToken', res.data.token, { expires: 7 }); // Token expires in 7 days
          navigate("/");
        }else{
          setStatus(true);
          setType('error');
          setTitle(res.data.msg);
        }
      })
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    Cookies.remove('authToken'); // Remove token from cookies
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
    <div className='d-flex justify-content-center align-items-center flex-grow-1'>
    <div className="container d-flex justify-content-center">
      <div className="col-md-6 container">
        <div className="card container shadow-lg border-0 login-form">
          <div className="card-body px-5">
            <h3 className="card-title">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-100 btn btn-primary fw-semibold">SIGN UP</button>
            </form>
            <div className="mt-3 text-center">
              <p>Didn't have an account? <Link className="text-dark" to="/register">Register now!</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className='container d-flex justify-content-center'>
    <ReactJsAlert
    status={status} // true or false
    type={type} // success, warning, error, info
    title={title}
    Close={() => setStatus(false)}
  />
  </div>
  </>
  );
}

export default Login;